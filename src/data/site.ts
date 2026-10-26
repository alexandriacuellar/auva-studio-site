// All site copy that repeats across pages lives here, so prices and
// package details change in one place. [Brackets] mark details to confirm.

export const site = {
  name: 'Auva Studio',
  tagline: 'Helping businesses and teams make technology work for them.',
  email: 'hello@auvastudio.com',
  url: 'https://auvastudio.com',
  location: 'Mid-Hudson Valley, NY',
  // Used in search data so local searches can find the studio.
  areaServed: ['Hudson Valley, NY', 'Westchester County, NY', 'Rockland County, NY', 'Dutchess County, NY', 'Orange County, NY', 'Putnam County, NY', 'Sullivan County, NY', 'Ulster County, NY', 'Albany County, NY', 'Columbia County, NY', 'Greene County, NY', 'Rensselaer County, NY', 'New York, NY', 'United States'],
  // Footer service area, grouped by region.
  regions: [
    ['Lower Hudson Valley', 'Westchester, Rockland'],
    ['Mid-Hudson Valley', 'Dutchess, Orange, Putnam, Sullivan, Ulster'],
    ['Upper Hudson Valley', 'Albany, Columbia, Greene, Rensselaer'],
  ],
  // Get a free access key at web3forms.com (sent to the email that should receive messages).
  web3formsKey: 'ba9485ce-3d10-468e-943f-00ffc9224cd4',
  booking: 'https://calendly.com/alexandria-cuellar-ny/30min',
  // Google Ads conversion tracking. Loads only for visitors who arrive from an ad
  // (and on their later visits within 90 days). Leave id empty to turn it off.
  googleAds: { id: 'AW-18520886996', formLabel: 'G0RYCIDY8qEdENSduf9E', bookingLabel: 'Vu4oCMik8KEdENSduf9E' },
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
  { href: '/technology-consulting/', label: 'Consulting' },
  { href: '/ai-emerging-tech/', label: 'AI & Emerging Tech' },
  { href: '/#about', label: 'About' },
];

// Three service categories, so visitors are not faced with a long list.
export const categories = [
  {
    icon: 'globe',
    title: 'Website Services',
    text: 'Websites that help customers find you, trust you, and reach out.',
    items: ['Website Diagnostic and Google Business Profile setup', 'Website packages from $1,500', 'Content editing, stores, and integrations', 'Help after launch: updates, fixes, and new pages'],
    href: '/websites/',
    cta: 'Explore website services',
  },
  {
    icon: 'bulb',
    title: 'Consulting & Project Support',
    text: 'Choose the right tools, fix how work gets done, and keep projects on track.',
    items: ['Technology planning', 'Workflow and process reviews', 'Project management', 'Fractional project leadership'],
    href: '/technology-consulting/',
    cta: 'Explore consulting',
  },
  {
    icon: 'bolt',
    title: 'AI & Emerging Tech',
    text: 'Explore AI, XR, and interactive ideas with small, low-risk steps.',
    items: ['AI Readiness Plan', 'Team AI Workshop', 'Feasibility reviews and prototypes', 'Production support'],
    href: '/ai-emerging-tech/',
    cta: 'Explore AI & emerging tech',
  },
];

export const consulting = [
  { id: 'planning', price: 'Technology Assessment $650, sessions $65/hr', icon: 'compass', title: 'Technology Planning', text: 'The big picture. I look at all the tools you use, find the gaps, and give you a plan for what to fix, replace, or add first.', items: ['Technology assessments and audits', 'Roadmaps and priorities', 'Platform and tool recommendations'] },
  { id: 'analysis', price: 'From $1,000', icon: 'chart', title: 'Business Analysis & Process Review', text: "One process, in depth. I map how a task gets done today, find what's slowing your team down, and spell out what a fix needs before you build or buy. Available on its own, with no obligation to hire me for the next step.", items: ['Workflow and process mapping', 'Requirements and specifications', 'Solution options compared'] },
  { id: 'delivery', price: '$65/hr, or monthly from $650', icon: 'check', title: 'Project Management', text: 'Someone to plan, organize, and keep your technology project on track, without hiring a full-time manager.', items: ['Technical project management', 'Vendor and stakeholder coordination', 'Risk, timeline, and delivery management', 'Fractional project leadership'] },
  { id: 'ai', price: 'From $500', icon: 'bolt', title: 'AI & Emerging Tech', text: 'Find practical ways to use AI, XR, and interactive technology, and test ideas before you invest.', items: ['Getting your team started with AI tools', 'Planning XR and immersive experiences', 'Checking whether an interactive or game idea is doable', 'Production support for XR and game teams'] },
];

export const whyAuva = [
  { title: 'Technical depth', text: 'Recommendations reflect how systems actually work, connect, and get maintained.' },
  { title: 'Business-minded guidance', text: 'Your goals, budget, team, and customers come before any new platform.' },
  { title: 'Strategy through delivery', text: 'One partner from assessment and planning through implementation.' },
  { title: 'Broad experience', text: 'Websites, APIs, digital products, project management, games, XR, and interactive experiences.' },
];

// How every engagement runs, from a small website to a complex project.
export const journey = [
  { title: 'Talk it through', text: "A free 30-minute call about your goals, your current setup, and what's getting in the way." },
  { title: 'Get a clear plan', text: 'A written scope and price before any work begins, with no surprises.' },
  { title: 'Get it done, and keep it', text: 'I do the work with you, then hand over documentation and training so your team can carry on.' },
];

// Sample sites on the Websites page, one per package. Fictional businesses, hosted at /samples/<slug>/ (noindex).
export const samples = [
  { package: 'Essential Presence', slug: 'skytop-floor-co', name: 'Skytop Floor Co.', text: 'A one-page site for a wood flooring company, with services, before-and-after photos, and a free estimate form.', goodFor: 'Good for trades and home services, like contractors, cleaners, landscapers, and repair shops.' },
  { package: 'Expanded Presence', slug: 'enea-hudson-cattle-farm', name: 'Enea Hudson Cattle Farm', text: 'A 10-page site for a family cattle farm, with animals for sale, a buying guide, and an inquiry form.', goodFor: 'Good for farms, inns, wineries, and businesses with several services or experiences to show.' },
  { package: 'Complete Presence', slug: 'rondout-mercantile', name: 'Rondout Mercantile', text: 'A larger site for a Kingston mercantile, with a Content Editing Dashboard, workshops, fitting booking (shown as an add-on), and a hold list for new arrivals.', goodFor: 'Good for shops, studios, and organizations that post new products, events, or news often.' },
];

export const packages = [
  {
    eyebrow: 'Get online',
    name: 'Essential Presence',
    price: '$1,500',
    blurb: 'A professional web presence that helps customers find, trust, and contact you.',
    groups: [
      { label: 'Planning and content', items: ['A planning call and content plan', "I polish your copy and fill in what's missing"] },
      { label: 'Design and build', items: ["One scrolling page or up to 5 pages, whichever suits your business. I'll help you choose.", '2 page designs: one for your home page, one for the rest', 'Custom design made for your business, built for phones first', 'A contact form and a map to find you', '2 revision rounds'] },
      { label: 'Found online', items: ['Set up for Google and AI search: page titles, business details, and a sitemap', 'Google Business Profile guidance, where applicable', 'Simple visitor stats'] },
    ],
    timeline: '2–3 weeks',
  },
  {
    eyebrow: 'Grow',
    name: 'Expanded Presence',
    price: '$2,950',
    featured: true,
    blurb: 'Room for every service you offer, so customers and Google can find each one.',
    includes: 'Everything in Essential, plus:',
    groups: [
      { label: 'Design and build', items: ['Up to 10 pages', 'Up to 3 page designs', '3 revision rounds'] },
      { label: 'Found online', items: ['Visitor stats that show which pages bring in calls and messages'] },
    ],
    extra: 'Add a Content Editing Dashboard from $1,750',
    timeline: '3–5 weeks',
  },
  {
    eyebrow: 'Go further',
    name: 'Complete Presence',
    price: '$5,500',
    blurb: 'For growing businesses that want to update their site themselves.',
    includes: 'Everything in Expanded, plus:',
    groups: [
      { label: 'Design and build', items: ['Up to 20 pages', 'Up to 6 page designs', '4 revision rounds'] },
      { label: 'Update it yourself', items: ['A Content Editing Dashboard to update text, photos, news, or events yourself'] },
      { label: 'Found online', items: ['A search checkup 30 days after launch'] },
    ],
    timeline: '6+ weeks',
  },
];

export const comparison = {
  benefits: [
    { icon: 'bolt', title: 'Loads almost instantly', text: "Your pages open in a blink on any phone, so visitors don't give up and leave. I'll show you your current site's Google speed score, and your new one at launch." },
    { icon: 'search', title: 'Built to be found, from day one', text: 'Speed, clear page structure, and the details Google and AI search tools look for are part of every build, not an extra you pay for after launch.' },
    { icon: 'cloud', title: 'Free or low-cost hosting', text: 'Hosts like Cloudflare and Netlify serve pages like these for free, or for a few dollars a month on a busier site. Your domain is about $20 a year.' },
    { icon: 'check', title: 'Easy for everyone to use', text: 'Every site gets an accessibility test before launch, so it works for people using screen readers, keyboards, or larger text.' },
    { icon: 'key', title: 'Yours to keep', text: "Your code, content, domain, and hosting account are all in your name. No lock-in, and no platform you can't leave." },
  ],
};

export const addons = [
  { icon: 'gear', title: 'Content Editing Dashboard', text: 'Update your page text, photos, news, and events yourself.', price: 'From $1,750' },
  { icon: 'layers', title: 'Online stores and buy buttons', text: "From a few buy buttons on a small site to a full online store. Tell me what you'd like to sell, and I'll quote it for you.", price: 'Quoted for your project' },
  { icon: 'clock', title: 'Booking, donations, and other tools', text: "Add the booking, donation, or forum tools you already use, or I'll help you set up new ones.", price: 'Quoted based on the tools you use' },
];

export const brandEssentials = [
  ['Custom logo or wordmark', 'Two concepts, then two revision rounds on your pick.'],
  ['Logo variations', 'Primary, light, and monochrome versions.'],
  ['Custom favicon', 'A simple brand mark for your browser tab.'],
  ['Brand color palette', 'Five coordinated colors for a consistent style.'],
  ['Brand typography', 'Heading and body fonts that fit your business.'],
  ['Brand reference sheet', 'One page showing your logo, colors (web and print codes), and type.'],
  ['Web and print logo files', 'Final logo files in SVG, PNG, and print-ready PDF.'],
];

export const process = [
  { title: 'Discovery', text: 'I learn about your business and confirm your goals and site map.', you: 'Share your goals and assets.', terms: ['50% deposit to start.', 'Every account stays in your name. If I need access, you add me as a user and remove me when the work is done.'] },
  { title: 'Content & Review', text: 'Share what you have. I polish it, draft anything missing, and walk you through the page structure.', you: 'Approve your copy and give feedback within 2 business days.', terms: ['You approve the page plan.'] },
  { title: 'Build & Preview', text: 'I build your site and share a live preview you can open on your phone, then refine it with your feedback.', you: 'Send each round of changes together, within 2 business days.', terms: ['A revision round is one set of changes, sent together.', 'You approve the final site before anything goes live.'] },
  { title: 'Launch', text: 'I test, connect your tools, train you, and publish your site.', you: 'Approve your site to go live.', terms: ['Balance due at launch. Then everything is yours.', 'A walkthrough, a how-to guide, and 30 days of fixes and small tweaks.'] },
];

// Help After Launch (no monthly plan). A small update is about 30 minutes of work.
export const care = [
  { name: 'Updates and fixes', price: '$50 each, or a pack of 5 for $200', text: 'Each update is up to about 30 minutes of edits, sent together in one request. Done within 2 business days. A pack of 5 is used within 12 months.' },
  { name: 'New pages and features', price: '$125/hr, quoted first', text: 'New pages, new features, or more collections for your Content Editing Dashboard.' },
];


export const testimonials = [
  { quote: 'She expertly managed our Agile workflow, tracked deliverables, and ensured our team stayed focused, aligned, and on schedule.', name: 'Juliann Stainbrook', role: 'CEO, hyLite Studios' },
  { quote: 'Alexandria has a gift for balancing structure with flexibility. She communicates clearly, anticipates challenges, follows through on commitments, and creates accountability without adding unnecessary bureaucracy.', name: 'Aaron Sorrels', role: 'CEO, The Soapstone Comedy Club (a VR comedy experience)' },
  { quote: 'She was always super organized, dependable, and really good at keeping everything moving in the right direction.', name: 'Matthew Udy', role: 'CEO, Flip Key Studios' },
];

// AI & Emerging Tech offers (AI page, search data, llms.txt).
// Grouped by buyer: AI for everyday teams, XR and interactive for studios and cultural organizations.
export const aiOffers = [
  { id: 'workshop', group: 'ai', icon: 'chat', title: 'Team AI Workshop', price: 'From $500', text: 'A 2-hour hands-on session for up to 10 people. Your team practices AI tools on real work and leaves with a one-page guide.' },
  { id: 'readiness', group: 'ai', icon: 'compass', title: 'AI Readiness Plan', price: '$650', text: 'Where AI can save your team time in the work you already do, which tools fit, and how to use them safely. Three one-hour sessions and a written plan.' },
  { id: 'ai-sprint', group: 'ai', icon: 'bolt', title: 'AI Prototype Sprint', price: 'From $2,500', text: 'A small, working test of an AI tool for your business, like a chatbot that answers customer questions or a workflow that drafts routine emails. Then a walkthrough of what we learned, all in 2–3 weeks.' },
  { id: 'review', group: 'xr', icon: 'search', title: 'Concept & Feasibility Review', price: '$650', text: "Have an XR, game, or interactive idea? Find out if it's doable, which technology fits, a rough budget, and the team it would take. About 2 weeks." },
  { id: 'xr-sprint', group: 'xr', icon: 'layers', title: 'XR Prototype Sprint', price: 'From $7,500', text: 'A small, working test of your XR or interactive idea, built with a developer partner, then a walkthrough of what we learned. 4–6 weeks.' },
  { id: 'production', group: 'xr', icon: 'star', title: 'Production Support', price: '$65/hr, or monthly from $650', text: 'Producer and project management help for XR, game, and immersive teams: plans, schedules, documents, and keeping everyone aligned.' },
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
