import fs from 'fs';
import path from 'path';
import { PurgeCSS } from 'purgecss';
import purgeCssConfig, { HOME_CSS_FILES } from '../purgecss.config.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const sourceFiles = HOME_CSS_FILES.map((file) => path.resolve(ROOT, file));
const writeSource = process.argv.includes('--write');
const printRejected = process.argv.includes('--rejected');

function countLines(content) {
  return content.trimEnd().split('\n').length;
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

const beforeCss = sourceFiles.map((file) => fs.readFileSync(file, 'utf8'));
const results = await new PurgeCSS().purge(purgeCssConfig);

if (results.length !== sourceFiles.length || results.some((result) => !result?.css)) {
  throw new Error('PurgeCSS did not return CSS for every landing section stylesheet');
}

const purgedFiles = results.map((result, index) => ({
  sourceFile: sourceFiles[index],
  beforeCss: beforeCss[index],
  purgedCss: result.css.trimEnd().concat('\n'),
  rejectedSelectors: result.rejected ?? [],
}));

if (writeSource) {
  for (const file of purgedFiles) {
    fs.writeFileSync(file.sourceFile, file.purgedCss, 'utf8');
  }
}

const beforeLines = purgedFiles.reduce((total, file) => total + countLines(file.beforeCss), 0);
const afterLines = purgedFiles.reduce((total, file) => total + countLines(file.purgedCss), 0);
const beforeBytes = purgedFiles.reduce((total, file) => total + Buffer.byteLength(file.beforeCss), 0);
const afterBytes = purgedFiles.reduce((total, file) => total + Buffer.byteLength(file.purgedCss), 0);
const removedLines = beforeLines - afterLines;
const removedBytes = beforeBytes - afterBytes;
const rejectedSelectors = purgedFiles.flatMap((file) => file.rejectedSelectors);

console.log(`PurgeCSS content: ${purgeCssConfig.content.join(', ')}`);
console.log(`CSS sources: ${HOME_CSS_FILES.join(', ')}`);
console.log(
  writeSource
    ? `Wrote: ${HOME_CSS_FILES.join(', ')}`
    : 'No stylesheet written. Review the rejected selectors, then rerun with --write to apply.'
);
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
