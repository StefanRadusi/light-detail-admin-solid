<div align="center">
	<img src="public/logoNoText.svg" alt="Light Detail" height="90" />
	<h1>Light Detail Website</h1>
	<p>Interior design & visualization studio site built with SolidStart (SolidJS + Vite + SSR)</p>
</div>

## Stack Overview

- Framework: [SolidStart / SolidJS]
- Build tooling: Vite (SSR enabled)
- Routing: File system routes under `src/routes`
- Styling: TailwindCSS + custom CSS (`app.css`)
- Email: Resend (server action) – sends internal notification + user confirmation
- Maps: Google Maps JS API Loader

## Quick Start

```bash
npm install   # install dependencies
npm run dev   # start dev server (SSR)
```

Production build & start:

```bash
npm run build
npm start
```

> Requires Node 18+ (current code uses deps that warn on older Node). Upgrade if you see engine warnings.

## Project Structure

```
src/
	app.tsx               # Root app shell (header, footer, menus, routing)
	api/                  # Server actions (Resend email)
	components/           # Reusable UI + layout
	routes/               # File-based routes (SSR)
		index.tsx           # Home
		about.tsx
		services.tsx
		contact.tsx
		interior-design/    # Listing + dynamic project pages
		visualization/      # Listing + dynamic project pages
		privacy-policy.tsx
		terms-of-service.tsx
	resources/            # Data (projects, staff, etc.)
	utils/                # Utility helpers (viewport detection, etc.)
public/                 # Static assets (images, svg, favicons)
vite.config.ts          # SolidStart/Vite configuration (SSR + prerender crawl)
vercel.json             # Deployment config (Vercel, version 2)
```

## Routing

Dynamic project pages use `[id].tsx` inside `interior-design/` and `visualization/` for detail views. The 404 catch-all is `[...404].tsx`.

## Email Flow

File: `src/api/index.ts`

`sendEmail(payload: { name, email, subject, content })` performs:

1. Renders an internal HTML email with escaped user input.
2. Sends to all addresses in `CONTACT_TO` (comma / semicolon separated).
3. Sends a styled confirmation email back to the user (if email looks valid).
4. Returns `{ msg: string }` status; errors are logged server-side.

HTML & plaintext parts are both included to improve deliverability & accessibility.

## Environment Variables

Create a `.env` file (do **not** commit). Only variables without `VITE_` stay server-only.

Server-side:

| Variable         | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY` | Resend API key (required to send emails).                      |
| `CONTACT_TO`     | Comma or semicolon separated internal notification recipients. |

Client-side (must be prefixed with `VITE_`):

| Variable                   | Purpose                         |
| -------------------------- | ------------------------------- |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key. |

If `CONTACT_TO` is absent falls back to a default in the code. Example:

```
CONTACT_TO=camel ia.popa@lightdetail.eu,bianca.cimpean@lightdetail.eu
```

## Forms

`ContactForm.tsx` uses a custom form signal system and server action `sendEmail`. Validation rules in `components/form/validations.ts` (e.g., `isRequired`, `isEmail`).

## Styling

Tailwind is configured in `tailwind.config.cjs`. Global styles & custom classes (e.g., `.page-banner`) live in `src/app.css`.

## Deployment

Deployed on Vercel (see `vercel.json`). The build output is produced by `vinxi build` and started via `node ./.output/server/index.mjs`.

Set the required environment variables in Vercel Project Settings > Environment Variables.

## Scripts

| Command         | Action                           |
| --------------- | -------------------------------- |
| `npm run dev`   | Start dev server (SSR with HMR). |
| `npm run build` | Build for production.            |
| `npm start`     | Run the built server.            |

## Future Enhancements (Ideas)

- Add tests for `sendEmail` (mock Resend)
- Image optimization / responsive sources
- Sitemap generation from prerender crawl
- Accessibility pass (aria landmarks, contrast checks)
- Replace inline email HTML with a templating approach (e.g., MJML or a TSX renderer)

## License

Private / Proprietary (update if you intend to open-source).

---

Questions or updates needed? Open an issue or adjust this README accordingly.
