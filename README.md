# Revest Loans Website

A responsive React and Vite marketing site for Revest Loans. The repository is a self-contained export of the current website, including local brand assets, team portraits, background imagery, fonts, configuration, and the dependency lockfile.

## Technology

- React 19 with TypeScript
- Vite 7
- Tailwind CSS 4
- Wouter for client-side routes
- Express static server for hosts that run a Node process

## Routes

| Route | Page |
| --- | --- |
| `/` | Revest Loans home page |
| `/bridge-loans` | Bridge Loans |
| `/loan-programs` | Loan Programs |
| `/beat-the-rate` | Beat the Rate calculator and rate-alert form |
| `/partners/culbertson-gray` | Culbertson & Gray partner page |

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer

Core web fonts and images are committed under `client/public/fonts` and `client/public/assets`. No Manus storage service or account is required to run this export.

## Install and run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Vite starts on `http://localhost:3000` by default. To test the production build locally:

```bash
pnpm build
pnpm start
```

The Node server listens on port `3000` by default. Set `PORT` only when a host assigns a different port:

```bash
PORT=8080 pnpm start
```

## Quality checks

```bash
pnpm check
pnpm build
```

`pnpm check` runs TypeScript without emitting files. `pnpm build` creates the deployable static bundle in `dist/public` and bundles the optional Express server in `dist/index.js`.

## Deploying

### Static hosting: Vercel, Netlify, Cloudflare Pages, or similar

Use these settings:

| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Publish directory | `dist/public` |
| Node version | `20` or newer |

This repository includes `vercel.json` and `netlify.toml` so those providers preserve client-side routing. On another static provider, configure a rewrite from all unmatched paths to `/index.html`.

### Node-capable hosting: Render, Railway, Fly.io, or similar

Use:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

The included Express server serves the generated site and returns `index.html` for client-side routes.

## Environment variables

No environment variables are required. `.env.example` documents this deliberately. Do not commit live API keys, analytics credentials, form-provider tokens, or passwords.

## Form behavior

The site is a static frontend export. Contact and lead forms retain their interface but are not connected to a CRM or data store. Before using forms in production, wire the form submission points to an approved CRM, form service, or backend endpoint and store any required credentials only in the host's secret manager.

## Assets and attribution

- Brand assets, team portraits, property imagery, and local web fonts are stored under `client/public`.
- `ASSET_SOURCES.md` records the origin of externally sourced market and partner images.
- These assets are included for operating this Revest Loans website. Confirm usage rights before reusing them in another product or campaign.

## Repository hygiene

- `.gitignore` excludes dependencies, build outputs, logs, local environment files, and platform metadata.
- `pnpm-lock.yaml` is committed for reproducible installs.
- Do not commit `.env`, `.env.local`, passwords, API keys, tokens, or generated build output.
