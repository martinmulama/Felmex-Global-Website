import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PurgeCSS } from 'purgecss';
import purgeCssConfig, { RESET_LANDING_CSS } from './purgecss.config.js';

function purgeResetLandingCss() {
  return {
    name: 'purge-reset-landing-css',
    apply: 'build',
    async transform(code, id) {
      if (!id.endsWith(RESET_LANDING_CSS)) return null;

      const [result] = await new PurgeCSS().purge({
        ...purgeCssConfig,
        css: [{ raw: code }],
        rejected: false,
        rejectedCss: false,
      });

      return {
        code: result?.css ?? code,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), purgeResetLandingCss()],
  preview: {
    allowedHosts: [
      'hurtless-carleen-bionomically.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
  },
});
