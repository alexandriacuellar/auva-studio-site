// A plain-text summary for AI tools (llms.txt), built from the same data as the pages so prices stay in sync.
import { site, consulting, packages, aiOffers, addons, care } from '../data/site';

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a digital technology and solutions studio in the ${site.location} for small businesses, startups, nonprofits, and growing teams. It helps clients build fast websites they own, choose the right tools, plan and deliver projects, and explore AI and emerging technology. Founded by Alexandria Cuellar. Remote nationwide; in person from New York City and Westchester up to Albany.`,
    '',
    'Every engagement starts with a free 30-minute call, and all work is scoped and priced in writing before it begins.',
    '',
    '## Pages',
    `- [Website Services](${site.url}/websites/): website packages built with Astro, free or low-cost hosting, updates from $50 each with no monthly plan`,
    `- [Consulting & Project Support](${site.url}/technology-consulting/): technology planning, business analysis and process review, project management, fractional project leadership`,
    `- [AI & Emerging Technology](${site.url}/ai-emerging-tech/): AI readiness, team workshops, concept and feasibility reviews, prototypes, XR and game production support`,
    `- [Contact](${site.url}/contact/): start a project or book a call`,
    '',
    '## Website Services',
    '- Website Diagnostic ($199, credited toward a new website): a review of an existing site for usability, mobile, search, and performance.',
    ...packages.map((p) => `- ${p.name} (${p.price}): ${p.blurb}`),
    ...addons.map((a) => `- ${a.title} (${a.price}): ${a.text}`),
    ...care.map((c) => `- Website Care, ${c.name} (${c.price}): ${c.text}`),
    '',
    '## Consulting & Project Support',
    ...consulting.filter((c) => c.id !== 'ai').map((c) => `- ${c.title}: ${c.text} ${c.price}`),
    '',
    '## AI & Emerging Technology',
    ...aiOffers.map((o) => `- ${o.title} (${o.price}): ${o.text}`),
    '',
    '## Contact',
    `- Book a free 30-minute call: ${site.booking}`,
    `- Contact page: ${site.url}/contact/`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
