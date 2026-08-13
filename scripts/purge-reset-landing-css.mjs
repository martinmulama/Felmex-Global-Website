import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CSS_FILE = path.join(ROOT, 'src/pages/home/styles/11-reset-landing.css');
const OUTPUT_FILE = process.argv.includes('--write')
  ? CSS_FILE
  : path.join(ROOT, 'src/pages/home/styles/11-reset-landing.purged.css');

const SOURCE_FILES = [
  'src/pages/HomePage.jsx',
  'src/pages/home/data.js',
  'src/components/WhyChooseFelmex.jsx',
  'src/components/footer/SiteFooter.jsx',
];

const STATIC_USED = new Set([
  'is-active', 'is-visible', 'is-title-dropped', 'has-solution-copy', 'is-overview-copy',
  'is-carousel-running', 'is-sky', 'is-amber', 'is-sage',
  'rising-group', 'scroll-wrapper', 'feature-section', 'final-section-canvas', 'banner-card',
  'left-panel', 'right-panel', 'right-panel-inner', 'container', 'hero', 'hero--why-choose',
  'split-scroll-container', 'split-scroll-statement', 'split-scroll-statement-frame',
  'split-scroll-bg-stack', 'split-scroll-bg-layer', 'split-scroll-bg-layer--vision',
  'split-scroll-bg-layer--mission', 'split-scroll-bg-layer--about', 'split-scroll-bg-layer--idd',
  'landing-overview--split', 'landing-title-line--accent', 'landing-title-line--desktop',
  'landing-title-line--mobile', 'landing-project-preview-nav--down',
  'landing-project-preview-ornament--left', 'landing-project-preview-ornament--right',
  'landing-project-preview-process--handoff',
  'landing-service-entry--air', 'landing-service-entry--ship', 'landing-service-entry--road',
  'landing-service-entry--rail', 'landing-service-entry--warehouse', 'landing-service-entry--parcel',
  'landing-overview-statement--vision', 'landing-overview-statement--mission',
  'landing-overview-statement--about', 'landing-overview-statement--idd',
  'landing-overview-mobile-button--about', 'landing-overview-mobile-button--mission',
  'landing-overview-mobile-button--vision', 'landing-overview-mobile-button--idd',
  'landing-service-mobile-icon--1', 'landing-service-mobile-icon--2', 'landing-service-mobile-icon--3',
]);

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function collectUsedClasses() {
  const used = new Set(STATIC_USED);

  for (const rel of SOURCE_FILES) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) continue;
    const content = read(rel);

    for (const match of content.matchAll(/className="([^"]+)"/g)) {
      for (const cls of match[1].split(/\s+/)) {
        if (cls) used.add(cls);
      }
    }

    for (const match of content.matchAll(/className=\{`([^`]+)`\}/g)) {
      for (const token of match[1].split(/\s+/)) {
        const base = token.replace(/\$\{[^}]+\}/g, '').replace(/--$/, '').trim();
        if (base) used.add(base);
      }
    }

    for (const match of content.matchAll(/\btone:\s*'([^']+)'/g)) used.add(match[1]);
    for (const match of content.matchAll(/mediaTone:\s*'([^']+)'/g)) {
      used.add(`landing-service-entry--${match[1]}`);
    }
    for (const match of content.matchAll(/panelTone:\s*'([^']+)'/g)) {
      used.add(`landing-overview-mobile-button--${match[1]}`);
    }
  }

  return used;
}

function extractSelectorClasses(selector) {
  const classes = [];
  for (const match of selector.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g)) {
    classes.push(match[1]);
  }
  return classes;
}

const DYNAMIC_BEM = {
  'landing-service-entry': ['air', 'ship', 'road', 'rail', 'warehouse', 'parcel'],
  'landing-overview-statement': ['vision', 'mission', 'about', 'idd'],
  'landing-overview-mobile-button': ['about', 'mission', 'vision', 'idd'],
  'landing-overview-mobile-switcher': ['vision', 'mission', 'about', 'idd'],
  'split-scroll-bg-layer': ['vision', 'mission', 'about', 'idd'],
  'landing-service-mobile-icon': ['1', '2', '3'],
  'landing-project-preview-ornament': ['left', 'right'],
};

function isClassUsed(cls, used) {
  if (used.has(cls)) return true;

  const modMatch = cls.match(/^(.+)--([a-zA-Z0-9_-]+)$/);
  if (!modMatch) return false;

  const [, base, modifier] = modMatch;
  const allowed = DYNAMIC_BEM[base];
  return Boolean(allowed?.includes(modifier));
}

function isSelectorUsed(selector, used) {
  const classes = extractSelectorClasses(selector);
  if (classes.length === 0) return true;
  return classes.every((cls) => isClassUsed(cls, used));
}

function parseSelectors(prelude) {
  return prelude
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitTopLevelBlocks(css) {
  const blocks = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < css.length; i += 1) {
    const char = css[i];
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        blocks.push(css.slice(start, i + 1));
        start = i + 1;
      }
    }
  }

  if (start < css.length) {
    const tail = css.slice(start).trim();
    if (tail) blocks.push(tail);
  }

  return blocks;
}

function collectAnimations(body, keptAnimations) {
  for (const match of body.matchAll(/animation(?:-name)?:\s*([^;{}]+)/g)) {
    for (const part of match[1].split(',')) {
      const anim = part.trim().split(/\s+/)[0];
      if (anim && /^[a-zA-Z]/.test(anim)) keptAnimations.add(anim);
    }
  }
}

function purgeRuleBlock(prelude, body, used) {
  const keptSelectors = parseSelectors(prelude).filter((selector) => isSelectorUsed(selector, used));
  if (keptSelectors.length === 0) return '';
  return `${keptSelectors.join(',\n')}${body}`;
}

function purgeBlock(block, used, keptAnimations) {
  const trimmed = block.trim();
  if (!trimmed) return '';

  const atMatch = trimmed.match(/^@(media|supports|layer|container)\b[^{]*/);
  if (atMatch) {
    const header = atMatch[0];
    const inner = trimmed.slice(header.length).trim();
    if (!inner.startsWith('{') || !inner.endsWith('}')) return trimmed;

    const body = inner.slice(1, -1);
    const innerBlocks = splitTopLevelBlocks(body);
    const purgedInner = innerBlocks
      .map((child) => purgeBlock(child, used, keptAnimations))
      .filter(Boolean)
      .join('\n\n');

    if (!purgedInner.trim()) return '';
    return `${header}{\n${purgedInner}\n}`;
  }

  if (trimmed.startsWith('@keyframes')) {
    const nameMatch = trimmed.match(/^@keyframes\s+([a-zA-Z0-9_-]+)/);
    const name = nameMatch?.[1];
    if (name && keptAnimations.has(name)) return trimmed;
    return '';
  }

  if (trimmed.startsWith('@')) return trimmed;

  const braceIndex = trimmed.indexOf('{');
  if (braceIndex === -1) return trimmed;

  const prelude = trimmed.slice(0, braceIndex).trim();
  const body = trimmed.slice(braceIndex);
  const purged = purgeRuleBlock(prelude, body, used);
  if (!purged) return '';

  collectAnimations(body, keptAnimations);
  return purged;
}

function cleanupCss(css) {
  return css.replace(/\n{3,}/g, '\n\n').replace(/^\s+$/gm, '').trim().concat('\n');
}

function purgeCss(css, used) {
  const keptAnimations = new Set();
  const blocks = splitTopLevelBlocks(css);

  let purged = blocks
    .map((block) => purgeBlock(block, used, keptAnimations))
    .filter(Boolean)
    .join('\n\n');

  const secondPassAnimations = new Set(keptAnimations);
  purged = blocks
    .map((block) => purgeBlock(block, used, secondPassAnimations))
    .filter(Boolean)
    .join('\n\n');

  return cleanupCss(purged);
}

const used = collectUsedClasses();
const css = read('src/pages/home/styles/11-reset-landing.css');
const purged = purgeCss(css, used);

const beforeLines = css.split('\n').length;
const afterLines = purged.split('\n').length;

console.log(`Used classes tracked: ${used.size}`);
console.log(`Before: ${beforeLines} lines`);
console.log(`After: ${afterLines} lines`);
console.log(`Removed: ${beforeLines - afterLines} lines (${(((beforeLines - afterLines) / beforeLines) * 100).toFixed(1)}%)`);

fs.writeFileSync(OUTPUT_FILE, purged, 'utf8');
console.log(`Wrote ${OUTPUT_FILE}`);
