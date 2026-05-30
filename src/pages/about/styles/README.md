# AboutPage Styles

This directory splits `src/pages/AboutPage.css` into concern-focused files.

## File map

- `00-tokens.css`: page tokens, shared section heading styles, buttons, and reveal states
- `01-hero.css`: hero section and stat strip
- `02-overview.css`: overview cards, operating model, and workflow sections
- `03-team.css`: team grid and profile cards
- `04-final-cta.css`: closing call-to-action section
- `06-responsive.css`: responsive breakpoints and reduced-motion rules

## Editing guideline

Keep base styles in earlier files and overrides in later files. Maintain import order in `AboutPage.css` to avoid regressions.
