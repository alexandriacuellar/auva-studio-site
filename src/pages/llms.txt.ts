// A plain-text summary for AI tools (llms.txt), built from the same data as the pages so prices stay in sync.
import { site, consulting, packages, aiOffers, addons, care } from '../data/site';

const items = (p: (typeof packages)[number]) => p.groups.flatMap((g) => g.items).map((i) => i.replace(/ I'll help you choose\.$/, '').replace(/\.$/, '')).join('; ');

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a digital technology and solutions studio in the ${site.location} for small businesses, startups, nonprofits, and growing teams. It helps clients build fast websites they own, choose the right tools, plan and deliver projects, and explore AI & Emerging Tech. Founded by Alexandria Cuellar, a digital technology and solutions consultant with 20+ years in technology, nearly 20 years building websites and digital products for newspaper companies, and 14+ VR experiences and mobile games produced for indie game studios.`,
    '',
    `Service area: in person across the Hudson Valley (${site.regions.map(([r, c]) => `${r}: ${c} counties`).join('; ')}) and New York City; remote anywhere in the US. Contact: ${site.email}.`,
    '',
    'Every engagement starts with a free 30-minute call, and all work is scoped and priced in writing before it begins. Clients keep ownership of their website, content, domain, and accounts.',
    '',
    '## Pages',
    `- [Website Services](${site.url}/websites/): website packages built with Astro, free or low-cost hosting, updates $50 each with no monthly plan`,
    `- [Consulting & Project Support](${site.url}/technology-consulting/): technology planning, business analysis and process review, project management, fractional project leadership`,
    `- [AI & Emerging Tech](${site.url}/ai-emerging-tech/): AI readiness, team workshops, concept and feasibility reviews, prototypes, XR and game production support`,
    `- [Contact](${site.url}/contact/): start a project or book a call`,
    '',
    '## Website Services',
    `- [Website Diagnostic](${site.url}/websites/diagnostic/) ($199, credited toward a new website): a review of an existing site for usability, mobile, search, and performance.`,
    `- [Google Business Profile Setup](${site.url}/websites/google-business-profile/) ($500, one-time): create or claim the profile, add business details, categories, services, hours, and photos, and help with verification. $150 credited toward a website within 6 months.`,
    `- [Google Business Profile Optimization](${site.url}/websites/google-business-profile/) ($500, one-time): review an existing profile and improve its categories, description, services, attributes, photos, and website links. $150 credited toward a website within 6 months.`,
    ...packages.map((p) => `- ${p.name} (${p.price}, one-time; ${p.timeline} once content is ready): ${p.blurb} ${p.includes ?? 'Includes:'} ${items(p)}.${p.extra ? ` ${p.extra}.` : ''}`),
    '- Website terms: 50% deposit to start, balance at launch; 30 days of fixes and small tweaks after launch; upgrade to a bigger package any time and pay only the difference. Websites are built with Astro, with free or low-cost hosting and no plugins to maintain.',
    '- Founding client offer: 10% off any website package for the first 10 clients, in exchange for a short review. Registered nonprofits can ask about a nonprofit discount (the two do not combine).',
    ...addons.map((a) => `- ${a.title} (${a.price}): ${a.text}`),
    `- [Brand Essentials](${site.url}/websites/brand-essentials/) ($1,000, on its own or with any website): logo or wordmark, variations, favicon, color palette, typography, and a brand reference sheet, designed with a professional designer partner.`,
    `- Free website check (${site.url}/website-check/): 10 quick questions with an instant score and what to fix first.`,
    `- Free Google profile check (${site.url}/google-profile-check/): quick questions about a Google Business Profile with setup steps or what to fix first.`,
    ...care.map((c) => `- [Help After Launch](${site.url}/websites/help-after-launch/), ${c.name} (${c.price}): ${c.text}`),
    '- Help After Launch is pay as you go, with no monthly plan, for websites Auva Studio built.',
    '',
    '## Consulting & Project Support',
    ...consulting.filter((c) => c.id !== 'ai').map((c) => `- ${c.title}: ${c.text} ${c.price}`),
    '- Fractional project leadership and monthly Production Support: 10 hrs $650, 20 hrs $1,200, 40 hrs $2,200, with a 3-month minimum.',
    '',
    '## AI & Emerging Tech',
    ...aiOffers.map((o) => `- ${o.title} (${o.price}): ${o.text}`),
    '',
    '## Contact',
    `- Book a free 30-minute call: ${site.booking}`,
    `- Contact page: ${site.url}/contact/`,
    `- Email: ${site.email} (replies within 24–48 hours)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
