# ServicePage Styles

This directory splits `src/pages/ServicePage.css` into concern-based modules.

## File map

- `00-tokens.css`: page tokens, container, shared labels and button primitives
- `01-hero.css`: hero section styles
- `02-main-services.css`: services grid and service cards
- `03-service-strip.css`: operating principles marquee
- `04-reveal.css`: reveal-state animation hooks
- `05-deep-dive.css`: service detail layout and content blocks
- `06-final-cta.css`: final CTA block
- `08-responsive.css`: responsive breakpoints

## Editing guideline

Keep rules in their matching concern file. Preserve import order in `ServicePage.css` because later files intentionally override earlier rules.
