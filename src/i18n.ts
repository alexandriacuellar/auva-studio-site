// English and Spanish. Spanish pages live under /es/ with the same addresses as the English ones,
// so the language switch only adds or removes the /es prefix.
export type Lang = 'en' | 'es';

// English addresses of every page that has a Spanish version. Add new pages here (and to the sitemap).
export const translatedPages = ['/', '/websites/', '/websites/diagnostic/', '/websites/google-business-profile/', '/websites/help-after-launch/', '/websites/brand-essentials/', '/website-check/', '/google-profile-check/', '/technology-consulting/', '/ai-emerging-tech/', '/contact/', '/privacy/'];

export const langFromPath = (path: string): Lang => (path === '/es' || path.startsWith('/es/') ? 'es' : 'en');

// The English address of any page, with or without the /es prefix.
export const basePath = (path: string) => (langFromPath(path) === 'es' ? path.slice(3) || '/' : path);

// The same page in the other language, or that language's home page when there is no translation.
export function switchPath(path: string, to: Lang) {
  const base = basePath(path);
  if (to === 'en') return base;
  return translatedPages.includes(base) ? `/es${base}` : '/es/';
}

// Points an internal link at the visitor's language. Pages without a Spanish version, like the samples, stay in English.
export function localize(href: string, lang: Lang) {
  if (lang === 'en' || !href.startsWith('/') || href.startsWith('/es/')) return href;
  const page = href.match(/^[^?#]*/)![0];
  return translatedPages.includes(page) ? `/es${href}` : href;
}
