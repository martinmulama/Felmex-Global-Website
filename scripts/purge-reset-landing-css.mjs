import fs from 'fs';
import path from 'path';
import { PurgeCSS } from 'purgecss';
import purgeCssConfig, { RESET_LANDING_CSS } from '../purgecss.config.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const sourceFile = path.resolve(ROOT, RESET_LANDING_CSS);
const writeSource = process.argv.includes('--write');
const printRejected = process.argv.includes('--rejected');
const outputFile = writeSource
  ? sourceFile
  : sourceFile.replace(/\.css$/u, '.purged.css');

function countLines(content) {
  return content.trimEnd().split('\n').length;
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

const beforeCss = fs.readFileSync(sourceFile, 'utf8');
const [result] = await new PurgeCSS().purge(purgeCssConfig);

if (!result?.css) {
  throw new Error(`PurgeCSS did not return CSS for ${RESET_LANDING_CSS}`);
}

const purgedCss = result.css.trimEnd().concat('\n');
fs.writeFileSync(outputFile, purgedCss, 'utf8');

const beforeLines = countLines(beforeCss);
const afterLines = countLines(purgedCss);
const beforeBytes = Buffer.byteLength(beforeCss);
const afterBytes = Buffer.byteLength(purgedCss);
const removedLines = beforeLines - afterLines;
const removedBytes = beforeBytes - afterBytes;
const rejectedSelectors = result.rejected ?? [];

console.log(`PurgeCSS content: ${purgeCssConfig.content.join(', ')}`);
console.log(`CSS source: ${RESET_LANDING_CSS}`);
console.log(`Wrote: ${path.relative(ROOT, outputFile)}`);
console.log(`Rejected selectors: ${rejectedSelectors.length}`);
console.log(`Lines: ${beforeLines} -> ${afterLines} (${removedLines} removed)`);
console.log(
  `Size: ${beforeBytes} -> ${afterBytes} bytes (${removedBytes} removed, ${formatPercent(
    (removedBytes / beforeBytes) * 100
  )})`
);

if (printRejected && rejectedSelectors.length > 0) {
  console.log('\nRejected selectors:');
  for (const selector of rejectedSelectors) {
    console.log(selector);
  }
}
