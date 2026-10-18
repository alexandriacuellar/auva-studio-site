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

## Run
```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static site in dist/
```
Deploy `dist/` to any static host (Cloudflare Pages, Netlify, or Vercel free tiers).
