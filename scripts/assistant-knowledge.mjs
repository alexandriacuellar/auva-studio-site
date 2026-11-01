// Builds what the site's chat assistant knows, from the finished site itself, so its answers always match the pages.
// Runs after `astro build`. It reads dist/llms.txt (services, prices, terms) and every FAQ on the English and Spanish
// pages (from each page's FAQ data), and writes dist/assistant/knowledge.json for the chat function to load.
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const skip = ['samples', 'card', 'assistant'];

async function pages(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === dist && skip.includes(entry.name)) continue;
      out.push(...(await pages(full)));
    } else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const faqs = { en: [], es: [] };
const seen = new Set();

for (const file of (await pages(dist)).sort()) {
  const path = '/' + relative(dist, file).split(sep).slice(0, -1).join('/') + '/';
  const url = path === '//' ? '/' : path;
  const lang = url.startsWith('/es/') ? 'es' : 'en';
  const html = await readFile(file, 'utf8');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? url).replace(/ \| Auva Studio$/, '');
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(json); } catch { continue; }
    if (data['@type'] !== 'FAQPage') continue;
    const items = data.mainEntity
      .filter((q) => !seen.has(lang + q.name))
      .map((q) => (seen.add(lang + q.name), `Q: ${q.name}\nA: ${q.acceptedAnswer.text}`));
    if (items.length) faqs[lang].push(`### ${title} (https://auvastudio.com${url})\n\n${items.join('\n\n')}`);
  }
}

const llms = await readFile(join(dist, 'llms.txt'), 'utf8');
const knowledge = {
  en: `${llms.trim()}\n\n## Frequently asked questions\n\n${faqs.en.join('\n\n')}`,
  es: `${llms.trim()}\n\n## Preguntas frecuentes (sitio en español)\n\n${faqs.es.join('\n\n')}`,
};
await mkdir(join(dist, 'assistant'), { recursive: true });
await writeFile(join(dist, 'assistant', 'knowledge.json'), JSON.stringify(knowledge));
console.log(`assistant knowledge: ${faqs.en.length} English and ${faqs.es.length} Spanish FAQ pages, ${Math.round(JSON.stringify(knowledge).length / 1024)} KB`);
