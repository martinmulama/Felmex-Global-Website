# About Page Styles

`AboutPage.css` is the page-level import index. It loads the shared page shell first, section styles second, then desktop, mobile, and tablet overrides in their existing cascade order.

```text
styles/
├── page.css
├── sections/
│   ├── hero.css
│   ├── curtain.css
│   ├── story.css
│   ├── values.css
│   ├── partners.css
│   └── final-cta.css
└── responsive/
    ├── desktop.css
    ├── mobile.css
    └── tablet.css
```

Add a base rule to its owning section. Add a breakpoint-specific override to `responsive/` and retain the import order in `AboutPage.css`.
