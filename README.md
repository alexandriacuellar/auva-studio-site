# Auva Studio website

Astro site for auvastudio.com, with copy drawn from the general slides of the canvas proposal template.

## Pages
- `/` Home: services, why we build differently, packages, process, about, contact prompt
- `/websites/` Packages, comparison table, discoverability, growth path, add-ons, Brand Essentials, terms and Website Care
- `/consulting/` Website Diagnostic, Technology Consulting, Project Delivery, Digital Solutions
- `/contact/` Contact form

## Editing
- Prices, packages, process steps, terms and nav live in `src/data/site.ts` (one place for every page).
- Brand colors and fonts are CSS variables at the top of `src/styles/global.css`.
- `[Brackets]` mark details still to confirm: email, founder bio, Diagnostic scope, form endpoint (`src/pages/contact.astro`).

## Spanish version
- Every page except the samples has a Spanish twin under `src/pages/es/`, served at `/es/` with the same address after the prefix (for example `/es/websites/`).
- When you change English copy, change the Spanish page too. Shared copy and prices live in `src/data/site.ts` and its Spanish copy `src/data/site.es.ts`; components hold their own wording for both languages.
- Page styles live in `src/styles/pages/` so both languages share them.
- A new page with a Spanish version goes in `translatedPages` (`src/i18n.ts`) and in the sitemap list. The header switch, hreflang tags and sitemap alternates follow from that list.

## Run
```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static site in dist/
```
Deploy `dist/` to any static host (Cloudflare Pages, Netlify, or Vercel free tiers).
