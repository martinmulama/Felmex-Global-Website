import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PurgeCSS } from 'purgecss';
import purgeCssConfig, { HOME_CSS_INDEX } from './purgecss.config.js';

function purgeHomeCss() {
  return {
    name: 'purge-home-css',
    apply: 'build',
    async transform(code, id) {
      if (!id.endsWith(HOME_CSS_INDEX)) return null;

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
  plugins: [react(), purgeHomeCss()],
});
