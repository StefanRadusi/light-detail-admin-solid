# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (vinxi dev, SSR with HMR)
- **Production build:** `npm run build` (vinxi build)
- **Run production:** `npm start` (node ./.output/server/index.mjs)
- No test framework is configured.
- No linter is configured.

## Architecture

This is the **Light Detail** website — a marketing site for an interior design & visualization studio. Built with **SolidStart** (SolidJS + Vinxi + SSR), styled with **TailwindCSS**, deployed on **Vercel**.

### Key patterns

- **File-based routing** in `src/routes/`. Dynamic project pages use `[id].tsx` (e.g., `interior-design/[id].tsx`). Catch-all 404 is `[...404].tsx`.
- **Path alias:** `~/*` maps to `./src/*` (configured in `tsconfig.json`).
- **Data fetching:** Routes use SolidJS `cache()` + `createAsync()` for SSR data loading. Route modules export a `route` object with a `load` function for preloading.
- **External API:** Project and staff data come from an AWS API Gateway endpoint (`src/resources/server.ts` creates an axios instance). Resource functions in `src/resources/` wrap API calls with `cache()`.
- **Server action:** `src/api/index.ts` is a `"use server"` module using Resend to send contact form emails (internal notification + user confirmation).
- **Custom form system:** `src/components/form/signals.ts` exports `useForm()` — a reactive form hook with field registration, validation, and submit handling built on SolidJS signals/stores.
- **Navigation config:** All routes (paths, banner images, titles) are defined in `src/components/navigation/routes.ts`. The `excludeFromNav` flag hides legal pages from the menu.
- **Responsive layout:** `app.tsx` conditionally renders `DesktopMenu` or `MobileMenu` based on `useIsMobile()` from `src/utils/viewport.ts`.

### Environment variables

Server-only: `RESEND_API_KEY`, `CONTACT_TO` (comma/semicolon-separated recipients).
Client-side (VITE_ prefix): `VITE_GOOGLE_MAPS_API_KEY`.

### Styling

TailwindCSS with a custom brand color `brandYellow: #f1b434` and font family `Futura, Hind, Arial, sans-serif` (see `tailwind.config.cjs`). Global/custom CSS in `src/app.css`.

### Node version

`.nvmrc` specifies Node 22. `package.json` requires `>=20`.
