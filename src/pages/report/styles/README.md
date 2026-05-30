# ReportPage Styles

This directory splits `src/pages/ReportPage.css` into concern-based modules.

## File map

- `00-tokens.css`: page tokens and base page shell
- `01-hero.css`: header hero block and meta styles
- `02-feature-grid.css`: feature image, highlights, and stat cards
- `03-rail.css`: body grid and sticky navigation rail
- `04-article.css`: article sections, sources, and end actions
- `05-not-found.css`: fallback/not-found card styles
- `07-reduced-motion.css`: motion reduction media query
- `08-responsive.css`: responsive breakpoints

## Editing guideline

Keep imports in `ReportPage.css` in this order so late files can intentionally override earlier rules.
