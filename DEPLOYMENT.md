# Deployment

This project is configured for Render as a static Vite site.

## Render Blueprint

Use the root `render.yaml` when creating the service from a Render Blueprint. It configures:

- Runtime: Static Site
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node version: `22.22.1`
- SPA rewrite: `/*` to `/index.html`

## Manual Render Setup

If you create the site manually in the Render dashboard, use these settings:

- Service type: Static Site
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variables:
  - `NODE_VERSION=22.22.1`
  - `SKIP_INSTALL_DEPS=true`
- Redirect/rewrite rule:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: Rewrite
