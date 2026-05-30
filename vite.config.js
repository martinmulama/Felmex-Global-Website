import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'hurtless-carleen-bionomically.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
  },
});
