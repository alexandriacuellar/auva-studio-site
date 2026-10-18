// All site copy that repeats across pages lives here, so prices and
// package details change in one place. [Brackets] mark details to confirm.

export const site = {
  name: 'Auva Studio',
  tagline: 'Helping businesses and teams make technology work for them.',
  email: 'hello@auvastudio.com',
  url: 'https://auvastudio.com',
  location: 'Mid-Hudson Valley, NY',
  // Used in search data so local searches can find the studio.
  areaServed: ['Ulster County, NY', 'Dutchess County, NY', 'Orange County, NY', 'Mid-Hudson Valley, NY', 'Westchester County, NY', 'New York, NY', 'Albany, NY', 'United States'],
  // Get a free access key at web3forms.com (sent to the email that should receive messages).
  web3formsKey: 'ba9485ce-3d10-468e-943f-00ffc9224cd4',
  booking: 'https://calendly.com/alexandria-cuellar-ny/30min',
  // Google Ads conversion tracking. Loads only for visitors who arrive from an ad
  // (and on their later visits within 90 days). Leave id empty to turn it off.
  googleAds: { id: 'AW-TEST123', formLabel: 'FORMLBL', bookingLabel: '' },
  social: [
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/auvastudiony/' },
    { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/auvastudiony' },
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/auva-studio/' },
    // Listed in search data only; add to the footer once there are posts.
    { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@auvastudiony', footer: false },
    { name: 'Threads', icon: 'threads', href: 'https://www.threads.com/@auvastudiony', footer: false },
    { name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@auvastudiony', footer: false },
  ],
};

export const nav = [
  { href: '/websites/', label: 'Websites' },
  { href: '/consulting/', label: 'Consulting' },
  { href: '/ai/', label: 'AI & Emerging Tech' },
  { href: '/#about', label: 'About' },
];

// Three service categories, so visitors are not faced with a long list.
export const categories = [
  {
    icon: 'globe',
    title: 'Website Services',
    text: 'Websites that help customers find you, trust you, and reach out.',
    items: ['Website Diagnostic', 'Website packages from $1,500', 'Content editing, stores, and integrations', 'Website Care and on-demand support'],
    href: '/websites/',
    cta: 'Explore website services',
  },
  {
    icon: 'bulb',
    title: 'Consulting & Project Support',
    text: 'Choose the right tools, fix how work gets done, and keep projects on track.',
    items: ['Technology planning', 'Workflow and process reviews', 'Project management', 'Part-time project leadership'],
    href: '/consulting/',
    cta: 'Explore consulting',
  },
  {
    icon: 'bolt',
    title: 'AI & Emerging Technology',
    text: 'Explore AI, XR, and interactive ideas with small, low-risk steps.',
    items: ['AI Readiness Plan', 'Team AI Workshop', 'Feasibility reviews and prototypes', 'Production support'],
    href: '/ai/',
    cta: 'Explore AI & emerging tech',
  },
];

export const consulting = [
  { id: 'advisory', price: 'Technology Assessment $650 · Sessions $65/hr', icon: 'compass', title: 'Technology Planning', text: 'The big picture. I look at all the tools you use, find the gaps, and give you a plan for what to fix, replace, or add first.', items: ['Technology assessments and audits', 'Roadmaps and priorities', 'Platform and tool recommendations'] },
  { id: 'analysis', price: 'From $1,000', icon: 'chart', title: 'Business Analysis & Process Review', text: "One process, in depth. I map how a task gets done today, find what's slowing your team down, and spell out what a fix needs before you build or buy. Available on its own, with no obligation to hire me for the next step.", items: ['Workflow and process mapping', 'Requirements and specifications', 'Solution options compared'] },
  { id: 'delivery', price: '$65/hr · Monthly from $650', icon: 'check', title: 'Project Management', text: 'Someone to plan, organize, and keep your technology project on track, without hiring a full-time manager.', items: ['Technical project management', 'Vendor and stakeholder coordination', 'Risk, timeline, and delivery management', 'Monthly project support'] },
  { id: 'ai', price: 'From $500', icon: 'bolt', title: 'AI & Emerging Technology', text: 'Find practical ways to use AI, XR, and interactive technology, and test ideas before you invest.', items: ['Getting your team started with AI tools', 'Planning XR and immersive experiences', 'Checking whether an interactive or game idea is doable', 'Production support for XR and game teams'] },
];

export const whyAuva = [
  { title: 'Technical depth', text: 'Recommendations reflect how systems actually work, connect, and get maintained.' },
  { title: 'Business-minded guidance', text: 'Your goals, budget, team, and customers come before any new platform.' },
  { title: 'Strategy through delivery', text: 'One partner from assessment and planning through implementation.' },
  { title: 'Broad platform experience', text: 'Websites, APIs, digital products, project management, games, XR, and interactive experiences.' },
];

// How every engagement runs, from a small website to a complex project.
export const journey = [
  { title: 'Talk it through', text: "A free 30-minute call about your goals, your current setup, and what's getting in the way." },
  { title: 'Get a clear plan', text: 'A written scope and price before any work begins, with no surprises.' },
  { title: 'Get it done, and keep it', text: 'I do the work with you, then hand over documentation and training so your team can carry on.' },
];

export const packages = [
  {
    eyebrow: 'Get online',
    name: 'Essential Presence',
    price: '$1,500',
    blurb: 'A professional web presence that helps customers find, trust, and contact you.',
    features: [
      'A planning call and content plan',
      'One scrolling page or up to 3 pages',
      'Mobile-friendly design',
      'A contact form so customers can reach you',
      'Set up for Google and AI search: page titles, business details, and a sitemap',
      'Simple visitor stats',
      'Advice on your Google Business Profile',
      '2 revision rounds',
    ],
    timeline: '2–3 weeks',
  },
  {
    eyebrow: 'Recommended',
    name: 'Expanded Presence',
    price: '$2,950',
    featured: true,
    blurb: 'Room for every service you offer, so customers and Google can find each one.',
    features: [
      'Everything in Essential',
      'A page for each service you offer (up to 10), so each one can show up on Google',
      'Up to 3 page designs',
      'Visitor stats that show which pages bring in calls and messages',
      '3 revision rounds',
    ],
    extra: 'Add a Content Editing Dashboard from $1,750',
    timeline: '3–5 weeks',
  },
  {
    eyebrow: 'Go further',
    name: 'Complete Presence',
    price: '$5,500+',
    blurb: 'For growing businesses that want to update their site and sell online themselves.',
    features: [
      'Everything in Expanded',
      'A Content Editing Dashboard to update text, photos, news, or events yourself',
      'Up to 6 page designs',
      'An online store you manage yourself',
      'Booking, email sign-up, or other tools built into your pages',
      'A search checkup 30 days after launch',
      '4 revision rounds',
    ],
    timeline: '6+ weeks',
  },
];

export const comparison = {
  benefits: [
    { icon: 'bolt', title: 'Loads almost instantly', text: "Ready-made pages appear right away on any phone. I'll show you your current site's Google speed score, and your new one at launch." },
    { icon: 'cloud', title: 'Free or low-cost hosting', text: 'Hosts like Cloudflare and Netlify serve pages like these for free, or for a few dollars a month on a busier site. Your domain is about $20 a year.' },
    { icon: 'key', title: 'Yours to keep', text: 'You own the code and the content, and you can move hosts anytime.' },
  ],
};

export const discovery = [
  { icon: 'search', title: 'Easy to find on Google', text: 'Clear page titles, organized content, and the setup search engines need to list your site.' },
  { icon: 'data', title: 'Your details, straight to search', text: 'Your hours, services, and location are labeled so Google can show them right in the results.' },
  { icon: 'bolt', title: 'Ready for AI search', text: "Structured so tools like ChatGPT and Google's AI answers can read your site and describe your business accurately." },
  { icon: 'pulse', title: 'Fast, with simple insights', text: 'Quick on any phone, with simple analytics that show how visitors find you.' },
];

export const addons = [
  { icon: 'gear', title: 'Content Editing Dashboard', text: 'Update your page text, photos, news, and events yourself.', price: 'From $1,750' },
  { icon: 'clock', title: 'Buy buttons, booking, and integrations', text: 'Add a checkout button, scheduling, or other tools you already use.', price: 'Quoted by platform' },
];

export const brandEssentials = [
  ['Custom logo or wordmark', 'Two concepts, then two revision rounds on your pick.'],
  ['Logo variations', 'Primary, light, and monochrome versions.'],
  ['Custom favicon', 'A simple brand mark for your browser tab.'],
  ['Brand color palette', 'Five coordinated colors for a consistent style.'],
  ['Brand typography', 'Heading and body fonts that fit your business.'],
  ['Brand reference sheet', 'One page showing your logo, colors, and type.'],
  ['Digital brand assets', 'Final logo files in SVG and PNG.'],
];

export const process = [
  { when: 'Week 1', title: 'Discovery', text: 'I learn about your business and confirm your goals and site map.', you: 'Share your goals and assets.' },
  { when: 'Week 2', title: 'Content & Review', text: 'Share what you have. I polish it, draft anything missing, and walk you through the page structure.', you: 'Approve your copy and give feedback within 2 business days.' },
  { when: 'Weeks 3–4', title: 'Build', text: 'I design the site and set up its foundation.', you: 'Answer quick questions.' },
  { when: 'Week 5', title: 'Launch', text: 'I test, connect your tools, train you, and publish your site.', you: 'Approve your site to go live.' },
];

export const terms = [
  { title: 'Clear payment', text: '50% deposit to start, balance due at launch.' },
  { title: 'You own it', text: 'Once paid in full, your website, content, domain, and accounts are yours.' },
  { title: 'Low ongoing costs', text: 'Your domain (about $20 a year) stays in your name. Hosting is free or low cost.' },
  { title: 'No passwords needed', text: 'You keep full control of your accounts. I never need your logins.' },
  { title: 'Feedback and sign-off', text: 'You approve the page plan, design, and final site before anything goes live. A revision round is one set of changes, sent together.' },
  { title: 'Launch and support', text: 'A walkthrough, a how-to guide, and 30 days of fixes after launch.' },
];

// Website Care (no monthly plan). A small update is about 30 minutes of work.
export const care = [
  { name: 'Updates and fixes', price: '$50 per update, or 5 for $200', text: 'Text, photos, hours, contact details, and fixes to things like forms or checkout links.' },
  { name: 'Room to grow', price: '$125/hr, quoted first', text: 'New pages, new features, or more collections for your Content Editing Dashboard.' },
];


export const testimonials = [
  { quote: 'She expertly managed our Agile workflow, tracked deliverables, and ensured our team stayed focused, aligned, and on schedule.', name: 'Juliann Stainbrook', role: 'CEO, hyLite Studios' },
  { quote: 'Alexandria has a gift for balancing structure with flexibility. She communicates clearly, anticipates challenges, follows through on commitments, and creates accountability without adding unnecessary bureaucracy.', name: 'Aaron Sorrels', role: 'CEO, The Soapstone Comedy Club (a VR comedy experience)' },
  { quote: 'She was always super organized, dependable, and really good at keeping everything moving in the right direction.', name: 'Matthew Udy', role: 'CEO, Flip Key Studios' },
];

// AI & Emerging Technology offers (AI page, search data, llms.txt).
// Grouped by buyer: AI for everyday teams, XR and interactive for studios and cultural organizations.
export const aiOffers = [
  { id: 'workshop', group: 'ai', icon: 'chat', title: 'Team AI Workshop', price: 'From $500', text: 'A 2-hour hands-on session for up to 10 people. Your team practices AI tools on real work and leaves with a one-page guide.' },
  { id: 'readiness', group: 'ai', icon: 'compass', title: 'AI Readiness Plan', price: '$650', text: 'Where AI can save your team time in the work you already do, which tools fit, and how to use them safely. Three one-hour sessions and a written plan.' },
  { id: 'ai-sprint', group: 'ai', icon: 'bolt', title: 'AI Prototype Sprint', price: 'From $2,500', text: 'A small, working test of an AI tool for your business, like a chatbot that answers customer questions or a workflow that drafts routine emails. Then a walkthrough of what we learned. 2–3 weeks.' },
  { id: 'review', group: 'xr', icon: 'search', title: 'Concept & Feasibility Review', price: '$650', text: "Have an XR, game, or interactive idea? Find out if it's doable, which technology fits, a rough budget, and the team it would take." },
  { id: 'xr-sprint', group: 'xr', icon: 'layers', title: 'XR Prototype Sprint', price: 'From $7,500', text: 'A small, working test of your XR or interactive idea, built with a developer partner, then a walkthrough of what we learned. 4–6 weeks.' },
  { id: 'advisory', group: 'xr', icon: 'star', title: 'Production Support', price: '$65/hr · Monthly from $650', text: 'Producer and project management help for XR, game, and immersive teams: plans, schedules, documents, and keeping everyone aligned.' },
];

// Search data for a list of services on one page. Prices stay as written; "From" or "+" becomes a minimum price.
export function serviceSchema(items: { name: string; description: string; price: string }[], pagePath: string) {
  return items.map((s) => {
    const amount = s.price.match(/\$([\d,]+)/)?.[1]?.replace(/,/g, '');
    const isMinimum = /from|\+/i.test(s.price);
    return {
      '@type': 'Service',
      name: s.name,
      description: s.description,
      url: `${site.url}${pagePath}`,
      provider: { '@id': `${site.url}/#org` },
      areaServed: site.areaServed,
      ...(amount && {
        offers: {
          '@type': 'Offer',
          description: s.price,
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', [isMinimum ? 'minPrice' : 'price']: Number(amount) },
        },
      }),
    };
  });
}
