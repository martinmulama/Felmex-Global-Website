export const RESET_LANDING_CSS = 'src/pages/home/styles/11-reset-landing.css';
export const RESET_LANDING_CSS_FILES = [
  'src/pages/home/styles/02-foundations.css',
  'src/pages/home/styles/03-overview.css',
  'src/pages/home/styles/04-services.css',
  'src/pages/home/styles/05-testimonials.css',
  'src/pages/home/styles/06-project-preview.css',
  'src/pages/home/styles/07-project-preview-desktop.css',
  'src/pages/home/styles/08-overview-desktop.css',
  'src/pages/home/styles/09-mobile-solutions.css',
  'src/pages/home/styles/10-project-mobile.css',
  'src/pages/home/styles/11-mobile-final.css',
];
export const PURGECSS_CONTENT = ['index.html', 'src/**/*.{js,jsx,ts,tsx}'];

const dynamicRuntimeClasses = [
  'is-sky',
  'is-amber',
  'is-sage',
  /^landing-service-entry--(air|ship|road|rail|warehouse|parcel)$/u,
  /^landing-service-mobile-icon--[12]$/u,
  /^landing-overview-mobile-switcher--(about|mission|vision|idd)$/u,
  /^landing-overview-mobile-button--(about|mission|vision|idd)$/u,
];

export default {
  content: PURGECSS_CONTENT,
  css: RESET_LANDING_CSS_FILES,
  defaultExtractor: (content) => content.match(/[A-Za-z0-9_-]+/gu) ?? [],
  keyframes: true,
  rejected: true,
  rejectedCss: true,
  safelist: {
    standard: dynamicRuntimeClasses,
  },
};
