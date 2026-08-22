# Home Page Styles Architecture

`HomePage.css` and `11-reset-landing.css` are import indexes. Landing styles are split by section and loaded in a fixed cascade order.

## File Order

1. `00-tokens.css` - shared variables and theme tokens
2. `01-hero.css` - hero section
3. `02-foundations.css` - shared landing primitives and section foundations
4. `03-overview.css` and `08-overview-desktop.css` - company overview layouts
5. `04-services.css` - service catalog
6. `05-testimonials.css` - client testimonials
7. `06-project-preview.css`, `07-project-preview-desktop.css`, and `10-project-mobile.css` - project preview variants
8. `09-mobile-solutions.css` and `11-mobile-final.css` - mobile solutions and final CTA
9. `11-reset-landing.css` - import order only; do not add style rules here

## Editing Rule

- Keep rules with their owning section file. Preserve the import order in `11-reset-landing.css` when a later file intentionally overrides an earlier one.
- Keep hero-specific rules in `01-hero.css`.
- Keep shared tokens in `00-tokens.css`.

## PurgeCSS Safety

- `npm run purge:reset-landing` is report-only and prints selectors proposed for removal.
- `npm run purge:reset-landing:write` updates the active stylesheet; use it only after reviewing the report and visual regression checks.
- Runtime classes and generated modifiers must be added to `purgecss.config.js` before applying a purge.
