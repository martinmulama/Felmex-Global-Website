# Home Page Styles Architecture

`HomePage.css` is now an import index only. Section styles are split by concern and loaded in a fixed order.

## File Order

1. `00-tokens.css` - shared variables and theme tokens
2. `01-hero.css` - hero section
3. `08-footer.css` - footer and related animations
4. `11-reset-landing.css` - active landing sections, responsive rules, and final polish

## Editing Rule

- Keep section, responsive, and reduced-motion rules for the current landing page in `11-reset-landing.css`.
- Keep hero-specific rules in `01-hero.css`.
- Keep shared tokens in `00-tokens.css`.
