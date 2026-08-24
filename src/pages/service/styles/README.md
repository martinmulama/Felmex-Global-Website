# Service Page Styles

`ServicePage.css` is the sole import index for the live service-page CSS. Every section has an owning file under `sections/`; device-specific treatments are kept in `responsive/`.

```text
styles/
├── page-and-hero.css
├── sections/
│   ├── category-browser.css
│   ├── process.css
│   ├── promise.css
│   ├── promise-and-faq.css
│   ├── service-canvas.css
│   ├── service-detail.css
│   ├── faq.css
│   └── final-cta.css
└── responsive/
    ├── desktop.css
    └── tablet.css
```

The current import order preserves the existing visual cascade. Add new default rules to their section file and add new viewport-specific rules to `responsive/`.
