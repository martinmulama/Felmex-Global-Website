export const HOME_CSS_INDEX = 'src/pages/home/styles/index.css';
export const HOME_CSS_FILES = [
  'src/pages/home/styles/sections/shared.css',
  'src/pages/home/styles/sections/overview.css',
  'src/pages/home/styles/sections/services.css',
  'src/pages/home/styles/sections/testimonials.css',
  'src/pages/home/styles/sections/project-preview.css',
  'src/pages/home/styles/responsive/desktop/project-preview.css',
  'src/pages/home/styles/responsive/desktop/overview.css',
  'src/pages/home/styles/responsive/mobile/overview.css',
  'src/pages/home/styles/responsive/mobile/project-preview.css',
  'src/pages/home/styles/responsive/mobile/final-cta.css',
  'src/pages/home/styles/responsive/mobile/testimonials.css',
  'src/pages/home/styles/responsive/mobile/solutions-spotlight.css',
  'src/pages/home/styles/responsive/tablet/overview.css',
  'src/pages/home/styles/responsive/tablet/services.css',
  'src/pages/home/styles/responsive/tablet/testimonials.css',
  'src/pages/home/styles/responsive/tablet/project-preview.css',
  'src/pages/home/styles/responsive/tablet/final-cta.css',
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
  css: HOME_CSS_FILES,
  defaultExtractor: (content) => content.match(/[A-Za-z0-9_-]+/gu) ?? [],
  keyframes: true,
  rejected: true,
  rejectedCss: true,
  safelist: {
    standard: dynamicRuntimeClasses,
  },
};
