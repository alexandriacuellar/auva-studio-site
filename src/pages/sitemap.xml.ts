// Lists every public page for search engines. Add new pages here.
import { site } from '../data/site';

const pages = ['/', '/websites/', '/websites/diagnostic/', '/websites/google-business-profile/', '/websites/help-after-launch/', '/websites/brand-essentials/', '/websites/get-ready/', '/website-check/', '/google-profile-check/', '/technology-consulting/', '/ai-emerging-tech/', '/contact/', '/privacy/'];

export function GET() {
  const urls = pages.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
