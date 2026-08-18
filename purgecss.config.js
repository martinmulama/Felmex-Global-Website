export const RESET_LANDING_CSS = 'src/pages/home/styles/11-reset-landing.css';
export const PURGECSS_CONTENT = ['src/**/*.{jsx,tsx}'];

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
  css: [RESET_LANDING_CSS],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9_-]+/gu) ?? [],
  keyframes: true,
  rejected: true,
  rejectedCss: true,
  safelist: {
    standard: dynamicRuntimeClasses,
  },
};
