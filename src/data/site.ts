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
  // Auva's own Google Business Profile (search data only).
  googleProfile: 'https://maps.app.goo.gl/ihg5tLDqC4zx5dfP6',
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
  {
    href: '/websites/', label: 'Websites', menuLabel: 'Website pages',
    children: [
      { href: '/websites/', label: 'Website packages' },
      { href: '/websites/diagnostic/', label: 'Website Diagnostic' },
      { href: '/websites/google-business-profile/', label: 'Google Business Profile' },
      { href: '/websites/help-after-launch/', label: 'Help After Launch' },
      { href: '/websites/brand-essentials/', label: 'Brand Essentials' },
    ],
  },
  { href: '/technology-consulting/', label: 'Tech, Automation & AI' },
  { href: '/production-emerging-tech/', label: 'Production & Emerging Tech' },
  { href: '/about/', label: 'About' },
];

// Three service categories, so visitors are not faced with a long list.
export const categories = [
  {
    icon: 'globe',
    title: 'Website Services',
    text: 'Websites that help customers find you, trust you, and reach out.',
    offers: [['Website packages', 'From $1,500'], ['Website Diagnostic', '$199'], ['Google Business Profile setup', '$500'], ['Help after launch', 'From $59']],
    note: 'Plus content editing, stores, and integrations.',
    href: '/websites/',
    cta: 'Explore website services',
  },
  {
    icon: 'bulb',
    title: 'Tech, Automation & AI',
    text: 'Get the right tools set up, automate the busywork, put AI to work, and keep projects on track.',
    offers: [['Tech Review', '$250'], ['Automation setup', 'From $500'], ['Project workspace setup', 'From $1,500'], ['Team AI workshop', '$750'], ['Project management', '$65/hr']],
    href: '/technology-consulting/',
    cta: 'Explore Tech, Automation & AI',
  },
  {
    icon: 'bolt',
    title: 'Production & Emerging Tech',
    text: 'A producer for game, XR, and interactive projects, plus AR and VR projects for businesses.',
    offers: [['Production support for game and XR teams', '$65/hr'], ['Production Plan Review', '$650'], ['AR Starter Project', 'From $1,500']],
    note: 'AR and VR for phones, Meta Quest, and Meta glasses.',
    href: '/production-emerging-tech/',
    cta: 'Explore Production & Emerging Tech',
  },
];

export const consulting = [
  { id: 'planning', price: '$250, credited toward a setup within 90 days', icon: 'search', title: 'Tech Review', text: 'A 60-minute call about your tools and how work gets done, then a written report within 5 business days with your top fixes in order, rough costs, and where automation or AI would help.', items: ['Tools and subscriptions review', 'Workflow review', 'Prioritized written report'] },
  { id: 'automation', price: 'From $500', icon: 'gear', title: 'Automation setup', text: 'I connect the tools you already use so routine work happens on its own, like follow-up emails, new-client onboarding, and monthly reports. One workflow, set up in your own accounts, with a short how-to guide.', items: ['Workflow automation', 'Connecting the apps you already use', 'How-to guide for your team'] },
  { id: 'workspace', price: 'From $1,500', icon: 'layers', title: 'Project workspace setup', text: 'I set up the tool your team plans work in, like Asana, ClickUp, Jira, monday.com, Notion, or Trello, with boards, templates, and clear ownership, then train your team to use it.', items: ['Workspace and template setup', 'Team training', '30 days of questions after setup'] },
  { id: 'delivery', price: '$65/hr, or monthly from $650', icon: 'check', title: 'Project Management', text: 'Someone to plan, organize, and keep your technology project on track, without hiring a full-time manager.', items: ['Technical project management', 'Vendor and stakeholder coordination', 'Risk, timeline, and delivery management', 'Monthly project management'] },
];


// How every engagement runs, from a small website to a complex project.

// Sample sites on the Websites page, one per package. Fictional businesses, hosted at /samples/<slug>/ (noindex).
export const samples = [
  { package: 'Essential Presence', slug: 'skytop-floor-co', name: 'Skytop Floor Co.', text: 'A one-page site for a wood flooring company, with services, before-and-after photos, and a free estimate form.', goodFor: 'Good for trades and home services, like contractors, cleaners, landscapers, and repair shops.' },
  { package: 'Expanded Presence', slug: 'enea-hudson-cattle-farm', name: 'Enea Hudson Cattle Farm', text: 'A 10-page site for a family cattle farm, with animals for sale, a buying guide, and an inquiry form.', goodFor: 'Good for farms, inns, wineries, and businesses with several services or experiences to show.' },
  { package: 'Complete Presence', slug: 'rondout-mercantile', name: 'Rondout Mercantile', text: 'A larger site for a Kingston mercantile, with a CMS, workshops, fitting booking (shown as an add-on), and a hold list for new arrivals.', goodFor: 'Good for shops, studios, and organizations that post new products, events, or news often.' },
];

// Shared by every package; shown once above the package cards.
export const packageBasics = [
  'A planning call and content plan',
  "I polish your copy and fill in what's missing",
  'Custom design made for your business, built for phones first',
  'A contact form and a map to find you',
  'Set up for Google and AI search: page titles, business details, and a sitemap',
  'Google Business Profile guidance, where applicable',
];

export const packages = [
  {
    id: 'essential',
    short: 'Essential',
    eyebrow: 'Get online',
    name: 'Essential Presence',
    price: '$1,500',
    blurb: 'A professional web presence that helps customers find, trust, and contact you.',
    specs: [['Pages', '1 to 5'], ['Page designs', '2'], ['Revision rounds', '2'], ['Visitor stats', 'Basic'], ['CMS', 'From $1,750'], ['30-day search checkup', null]],
    timeline: '2–3 weeks',
  },
  {
    id: 'expanded',
    short: 'Expanded',
    eyebrow: 'Grow',
    name: 'Expanded Presence',
    price: '$2,950',
    featured: true,
    blurb: 'Room for every service you offer, so customers and Google can find each one.',
    specs: [['Pages', 'Up to 10'], ['Page designs', 'Up to 3'], ['Revision rounds', '3'], ['Visitor stats', 'Calls by page'], ['CMS', 'From $1,750'], ['30-day search checkup', null]],
    timeline: '3–5 weeks',
  },
  {
    id: 'complete',
    short: 'Complete',
    eyebrow: 'Go further',
    name: 'Complete Presence',
    price: '$5,500',
    blurb: 'For growing businesses that want to update their site themselves.',
    specs: [['Pages', 'Up to 20'], ['Page designs', 'Up to 6'], ['Revision rounds', '4'], ['Visitor stats', 'Calls by page'], ['CMS', 'Included'], ['30-day search checkup', 'Included']],
    timeline: '6+ weeks',
  },
];

export const comparison = {
  benefits: [
    { icon: 'bolt', title: 'Loads almost instantly', text: "Pages open in a blink on any phone, so visitors stay. I'll show you your Google speed score before and after." },
    { icon: 'search', title: 'Built to be found, from day one', text: 'The details Google and AI search tools look for, built in. Not an extra you pay for later.' },
    { icon: 'cloud', title: 'Free or low-cost hosting', text: 'Free, or a few dollars a month on a busier site. Your domain is about $20 a year.' },
    { icon: 'check', title: 'Easy for everyone to use', text: 'An accessibility test before every launch, for screen readers, keyboards, and larger text.' },
    { icon: 'key', title: 'Yours to keep', text: 'Code, content, domain, and hosting in your name. No lock-in.' },
  ],
};

export const addons = [
  { icon: 'gear', title: 'CMS (content management system)', text: 'A simple dashboard to update your page text, photos, news, and events yourself. No code needed.', price: 'From $1,750' },
  { icon: 'layers', title: 'Online stores and buy buttons', text: "From a few buy buttons on a small site to a full online store. Tell me what you'd like to sell, and I'll quote it for you.", price: 'Quoted for your project' },
  { icon: 'clock', title: 'Booking, donations, and other tools', text: "Add the booking, donation, or forum tools you already use, or I'll help you set up new ones.", price: 'Quoted based on the tools you use' },
  { icon: 'chat', title: 'AI chatbots and web apps', text: 'A chat assistant that answers visitor questions from your own FAQs, services, and prices, or a custom tool like a client portal or booking app.', price: 'Quoted for your project' },
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
  { title: 'Discovery', text: 'I learn about your business and confirm your goals and site map.', you: 'Share your goals and assets.', link: { href: '/websites/get-ready/', text: 'How to get ready' }, terms: ['50% deposit to start.', 'Every account stays in your name. If I need access, you add me as a user and remove me when the work is done.'] },
  { title: 'Content & Review', text: 'Share what you have. I polish it, draft anything missing, and walk you through the page structure.', you: 'Approve your copy and give feedback within 2 business days.', terms: ['You approve the page plan.'] },
  { title: 'Build & Preview', text: 'I build your site and share a live preview you can open on your phone, then refine it with your feedback.', you: 'Send each round of changes together, within 2 business days.', terms: ['A revision round is one set of changes, sent together.', 'You approve the final site before anything goes live.'] },
  { title: 'Launch', text: 'I test, connect your tools, train you, and publish your site.', you: 'Approve your site to go live.', terms: ['Balance due at launch. Then everything is yours.', 'A walkthrough, a how-to guide, and 30 days of fixes and small tweaks.'] },
];

// Help After Launch: pay as you go, or one monthly plan sized on a call. A small update is about 30 minutes of work.
export const care = [
  { name: 'Updates and fixes', price: '$59 each', text: 'Each update is up to about 30 minutes of edits, sent together in one request. Done within 2 business days.' },
  { name: 'New pages and features', price: '$125/hr, quoted first', text: 'New pages, new features, or more collections for your CMS.' },
];

// The only monthly offer: a block of web producer hours. Sold on outcomes; hours set the price.
// Monthly update plans (2026-11-01): sized by how often a client needs help. Optional, start or switch any time.
export const plans = [
  { name: 'Monthly updates', price: '$99 a month', hours: '1 hour', text: '1 hour of updates a month, about 2 updates, plus a monthly check that your forms, links, and buttons work. Done within 2 business days.' },
  { name: 'Monthly updates plus', price: '$179 a month', hours: '2 hours', text: '2 hours a month for updates, CMS changes, or a simple new page in an existing page design, a monthly check, and a search review every 3 months. Done within 1 business day.' },
];

export const monthly = {
  name: 'Monthly web producer',
  price: 'From $650 a month for 5 hours',
  text: 'Your own web producer, without hiring one. Working with a marketer or SEO person? They set the direction, and I make it happen on your site.',
  outcomes: ['Stays fast, secure, and working', 'Gets new pages for your campaigns, events, and products', 'Keeps up with what people are searching for', 'Comes with a short report on what changed, what it did, and what\'s next'],
};


export const testimonials = [
  { quote: 'She expertly managed our Agile workflow, tracked deliverables, and ensured our team stayed focused, aligned, and on schedule.', name: 'Juliann Stainbrook', role: 'CEO, hyLite Studios' },
  { quote: 'Alexandria has a gift for balancing structure with flexibility. She communicates clearly, anticipates challenges, follows through on commitments, and creates accountability without adding unnecessary bureaucracy.', name: 'Aaron Sorrels', role: 'CEO, The Soapstone Comedy Club (a VR comedy experience)' },
  { quote: 'She was always super organized, dependable, and really good at keeping everything moving in the right direction.', name: 'Matthew Udy', role: 'CEO, Flip Key Studios' },
];

// AI and production offers. group 'consulting' lives on the Tech, Automation & AI page;
// 'prototype' (first steps) and 'production' live on the Production & Emerging Tech page.
export const aiOffers = [
  { id: 'workshop', group: 'consulting', icon: 'chat', title: 'Team AI Workshop', price: '$750', text: 'A 90-minute hands-on session for up to 10 people. Your team practices ChatGPT, Claude, or Gemini on real work and leaves with a one-page guide.' },
  { id: 'review', group: 'prototype', icon: 'search', title: 'Production Plan Review', price: '$650', text: 'For game, XR, and interactive projects. I review your scope, milestones, and risks, and give you a plan your team can follow, with your project tools set up if you need them. About 2 weeks.' },
  { id: 'ar-starter', group: 'prototype', icon: 'star', title: 'AR Starter Project', price: 'From $1,500', text: "A small AR piece that opens in a phone's browser, with no app needed: a business card, flyer, poster, or product that comes to life. Built with a developer partner when needed. 2–4 weeks." },
  { id: 'production', group: 'production', icon: 'star', title: 'Production Support', price: '$65/hr, or monthly from $650', text: 'Producer and project management help for game, XR, and immersive teams: plans, schedules, design documents, playtests, and keeping everyone aligned.' },
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
