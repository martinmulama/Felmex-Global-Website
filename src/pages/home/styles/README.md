# Home Page Styles

`HomePage.css` imports `styles/index.css`, which is the only cascade entry point for this page.

```text
styles/
├── tokens.css
├── sections/                 # one file per page section
│   ├── hero.css
│   ├── overview.css
│   ├── services.css
│   ├── testimonials.css
│   └── project-preview.css
└── responsive/
    ├── desktop/
    ├── tablet/
    └── mobile/
```

Keep default section styles in `sections/`; put viewport-only adjustments in the matching `responsive/<viewport>/` directory. `index.css` preserves the required cascade order, so new files must be added there deliberately.

Use `npm run purge:home` only as a report. Review every proposed removal before applying `npm run purge:home:write`, because responsive and runtime modifier classes require manual review.
