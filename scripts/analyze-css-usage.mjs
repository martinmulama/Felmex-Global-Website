import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CSS_FILES = [
  'src/pages/home/styles/sections/shared.css',
  'src/pages/home/styles/sections/overview.css',
  'src/pages/home/styles/sections/services.css',
  'src/pages/home/styles/sections/testimonials.css',
  'src/pages/home/styles/sections/project-preview.css',
];

const SOURCE_FILES = [
  'src/pages/HomePage.jsx',
  'src/components/why-choose/WhyChooseFelmex.jsx',
  'src/components/footer/SiteFooter.jsx',
];

function collectUsedClasses(content) {
  const used = new Set();

  for (const match of content.matchAll(/className="([^"]+)"/g)) {
    for (const cls of match[1].split(/\s+/)) {
      if (cls && !cls.includes('${')) used.add(cls);
    }
  }

  for (const match of content.matchAll(/className=\{`([^`]+)`\}/g)) {
    for (const token of match[1].split(/\s+/)) {
      const stripped = token.replace(/\$\{[^}]+\}/g, '').trim();
      if (stripped) used.add(stripped);
      const modMatch = token.match(/^([a-zA-Z0-9_-]+)--/);
      if (modMatch) used.add(modMatch[1]);
    }
  }

  for (const match of content.matchAll(/(?:querySelector(?:All)?|closest|matches)\(['"]\.([^'"]+)['"]\)/g)) {
    used.add(match[1]);
  }

  for (const match of content.matchAll(/\b(landing-[a-zA-Z0-9_-]+|is-[a-zA-Z0-9_-]+|split-[a-zA-Z0-9_-]+)\b/g)) {
    used.add(match[1]);
  }

  return used;
}

function collectCssClasses(css) {
  const classes = new Set();
  for (const match of css.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g)) {
    classes.add(match[1]);
  }
  return classes;
}

function isClassUsed(cls, used) {
  if (used.has(cls)) return true;

  for (const u of used) {
    if (u.startsWith(`${cls}--`)) return true;
    if (cls.startsWith(`${u}--`)) return true;
  }

  // BEM element suffixes: landing-overview-statement used => landing-overview-statement--vision may be dynamic
  const base = cls.replace(/--[a-zA-Z0-9_-]+$/, '');
  if (base !== cls && used.has(base)) return true;

  for (const u of used) {
    const uBase = u.replace(/--[a-zA-Z0-9_-]+$/, '');
    if (uBase === base) return true;
  }

  return false;
}

function groupByPrefix(classes) {
  const groups = new Map();
  for (const cls of classes) {
    const parts = cls.split('-');
    const prefix = parts.length >= 2 ? `${parts[0]}-${parts[1]}` : cls;
    if (!groups.has(prefix)) groups.set(prefix, []);
    groups.get(prefix).push(cls);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

const used = new Set();
for (const rel of SOURCE_FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  for (const cls of collectUsedClasses(fs.readFileSync(file, 'utf8'))) used.add(cls);
}

const css = CSS_FILES.map((file) => fs.readFileSync(path.join(ROOT, file), 'utf8')).join('\n');
const cssClasses = collectCssClasses(css);
const landingCss = [...cssClasses].filter((c) => c.startsWith('landing-') || c.startsWith('is-') || c.startsWith('split-'));

const unused = landingCss.filter((c) => !isClassUsed(c, used));
const usedInCss = landingCss.filter((c) => isClassUsed(c, used));

console.log('=== CSS Usage Analysis: home page section styles ===\n');
console.log(`Total lines: ${css.split('\n').length}`);
console.log(`Total CSS classes: ${cssClasses.size}`);
console.log(`Landing-related CSS classes: ${landingCss.length}`);
console.log(`Used (direct or variant): ${usedInCss.length}`);
console.log(`Potentially unused: ${unused.length}\n`);

console.log('--- Unused by prefix group ---');
for (const [prefix, classes] of groupByPrefix(unused)) {
  console.log(`\n${prefix} (${classes.length}):`);
  for (const cls of classes.slice(0, 15)) console.log(`  ${cls}`);
  if (classes.length > 15) console.log(`  ... and ${classes.length - 15} more`);
}

console.log('\n--- Used class prefixes (top 20) ---');
const usedPrefixes = groupByPrefix(usedInCss).slice(0, 20);
for (const [prefix, classes] of usedPrefixes) {
  console.log(`${prefix}: ${classes.length}`);
}
