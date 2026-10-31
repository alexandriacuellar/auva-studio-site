// Lists every public page for search engines, with its Spanish version. Add new pages here.
import { site } from '../data/site';
import { translatedPages } from '../i18n';

const pages = ['/', '/websites/', '/websites/diagnostic/', '/websites/google-business-profile/', '/websites/help-after-launch/', '/websites/brand-essentials/', '/websites/get-ready/', '/website-check/', '/google-profile-check/', '/technology-consulting/', '/ai-emerging-tech/', '/development-partnerships/', '/about/', '/contact/', '/privacy/'];

export function GET() {
  // Each English page and its Spanish twin point to each other, so search engines show the right language.
  const entry = (loc: string, base: string) => {
    if (!translatedPages.includes(base)) return `  <url><loc>${site.url}${loc}</loc></url>`;
    const alt = (lang: string, p: string) => `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${site.url}${p}"/>`;
    return `  <url><loc>${site.url}${loc}</loc>${alt('en', base)}${alt('es', `/es${base}`)}${alt('x-default', base)}\n  </url>`;
  };
  const urls = [
    ...pages.map((p) => entry(p, p)),
    ...pages.filter((p) => translatedPages.includes(p)).map((p) => entry(`/es${p}`, p)),
  ].join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
