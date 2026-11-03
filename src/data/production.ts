// AR, VR & Production: main page + AR Packages and Game & XR Production sub pages (alexandria 2026-11-03).
// Spanish copy is in production.es.ts. Package prices live in aiOffers in site.ts.
export const base = '/ar-vr-production';

export const t = {
  title: 'AR, VR & Production',
  seo: 'AR Packages & Game and XR Producer | Auva Studio',
  desc: 'AR packages from $750 for businesses, architects, museums, and brands, opening on any phone with no app, plus a game and XR producer for studios.',
  heroH: 'AR and VR people remember, <em>and a producer to get it built.</em>',
  heroL: 'AR that brings your products, menus, and places to life on any phone, and production support for game and XR teams.',
  book: 'Book a free 30-minute call', seeHow: 'See how I help',
  facts: ['<b>20+</b> years in web development', '<b>14+</b> projects managed', '<b>Mixed Reality (XR)</b> Certificate'],
  whoH: 'Who I <em>work with.</em>', elseH: 'Something else?', elseP: "Tell me what you have in mind, and I'll suggest where to start.", talk: 'Talk it through',
  twoH: 'Two ways <em>I help.</em>', twoL: 'Fixed prices for AR, written up front. Producer help for studios by the hour or month.',
  nextTag: 'Coming in 2027', nextH: "Next up: Meta's new VR glasses",
  nextP: "I've built in Meta Horizon Worlds for years and I'm part of Meta Horizon Start and the Meta Horizon Creator Program. Meta's new VR glasses arrive in 2027, and I'm getting ready to build for them: hands-free guides and tours, and step-by-step help for staff. Have an idea? Tell me now and you'll be first in line.",
  nextA: 'Share your idea',
  howH: 'How it <em>works.</em>', howL: 'Simple to start, with no surprises along the way.',
  steps: [
    ['Free call', 'Tell me what you want people to see, or where your game or XR project stands.'],
    ['Written scope and price', "A short proposal with what I'll make, how long it takes, and the price."],
    ['Build and review', 'You try your AR on your own phone and send changes. Studios get sprints, playtests, and milestone reviews.'],
    ['Launch and handover', 'You get the link, the printed code, and your files, so it stays yours.'],
  ],
  website: '<b>Need a website too?</b> See <a href="/websites/#packages">website packages from $1,500</a>. AR Product View can be added to any of them.',
  // AR sub page
  arTitle: 'AR Packages', arSeo: 'AR Packages from $750, No App Needed | Auva Studio',
  arDesc: 'AR cards, flyers, menus, packaging, product views, and project viewers from $750. They open in any phone browser, with no app to download.',
  arH: 'AR people remember, <em>from $750.</em>', arL: 'Cards, menus, products, and buildings that come alive on any phone. No app to download.',
  tryCard: 'Try it on my card', pkH: 'AR packages, <em>priced up front.</em>', pkL: "Each one opens in a phone's browser. Founding prices for my first AR clients.", ask: 'Ask about this',
  bigH: 'Need something bigger?', bigP: 'VR training, home walkthroughs, Meta Horizon worlds, and full apps are built with an experienced XR developer partner who joins at the start. I stay on as your producer. Quoted for your project.',
  ideasH: 'What we could <em>build together.</em>', ideasL: 'The first one is my own business card. The others are ideas to spark yours.',
  live: 'Live demo', idea: 'Idea', ideaPartner: 'Idea, with partner',
  // Studios sub page
  stTitle: 'Game and XR Production', stSeo: 'Game and XR Producer for Indie Studios | Auva Studio',
  stDesc: 'A producer for game and XR teams: a $650 Production Plan Review, or production support at $65/hr or monthly from $650, without a full-time hire.',
  stH: 'A producer for game and XR teams, <em>without a full-time hire.</em>', stL: 'Plans, schedules, design documents, and playtests that keep your team aligned and your launch on track.',
  offH: 'Start with a plan, <em>or bring me onto the team.</em>', offL: '14+ game and XR projects managed for indie studios since 2023.',
  proofH: "From the studios <em>I've worked with.</em>",
};

export const services = [
  { id: 'ar', icon: 'layers', title: 'AR packages', price: 'From $750', text: 'Cards, menus, products, and buildings that come alive on any phone, with no app to download.', href: `${base}/ar/`, link: 'See AR packages' },
  { id: 'studios', icon: 'star', title: 'Game and XR production', price: 'From $650', text: 'An experienced producer and a schedule your team can trust, without a full-time hire.', href: `${base}/studios/`, link: 'See production for studios' },
];

export const audiences = [
  { icon: 'layers', title: 'Shops, makers, and restaurants', text: 'Let customers see a product at home before they buy, or scan a menu or label that comes alive.', to: 'ar' },
  { icon: 'compass', title: 'Architects, builders, and developers', text: "Show clients a home or building that isn't built yet, on the table or full size on the lot.", to: 'ar' },
  { icon: 'book', title: 'Museums, educators, and cultural organizations', text: 'Exhibits, lessons, and historic sites that show a scene, a voice, or a 3D object through a phone or headset.', to: 'ar' },
  { icon: 'globe', title: 'Venues, brands, and tourism', text: 'Attractions, events, and campaigns people remember, from a scan-to-play poster to a Meta Horizon world.', to: 'ar' },
  { icon: 'star', title: 'Game and XR studios', text: 'An experienced producer and a schedule people trust, without a full-time hire.', to: 'studios' },
];

export const ideas = [
  { icon: 'star', title: 'An AR business card', text: 'Point your phone at the card and the owner appears, with buttons to book, call, or follow.', live: true },
  { icon: 'layers', title: 'A sofa in your living room', text: 'Shoppers see the real size and color at home before they order.' },
  { icon: 'book', title: 'A menu that comes alive', text: "Scan the menu and tonight's special turns on the plate in 3D." },
  { icon: 'compass', title: 'A house on the empty lot', text: 'Buyers stand on the land and see the finished home around them.' },
  { icon: 'globe', title: 'A sign that tells a story', text: 'A historic marker that shows the street 100 years ago.' },
  { icon: 'shield', title: 'VR training for staff', text: 'Practice a safety step or a hard conversation on Meta Quest before doing it for real.', partner: true },
];

export const studioOffers = [
  { icon: 'search', topic: 'review', price: '$650', text: 'I review your scope, milestones, and risks, and give you a plan your team can follow. About 2 weeks.', items: ['Scope, milestones, and risks reviewed', 'A plan and schedule your team can follow', 'Project tools set up if you need them'] },
  { icon: 'star', topic: 'production', price: '$65/hr, or monthly from $650', text: 'A producer inside your team: plans, schedules, design documents, playtests, and keeping everyone aligned. Join at the start or partway through.', items: ['Monthly: 10 hrs $650, 20 hrs $1,200, or 40 hrs $2,200', 'Agile workflow, sprints, design documents, and playtests', '3-month minimum for monthly'] },
];

export const faq = {
  app: { q: 'Do my customers need an app?', a: "No. They scan a code or open a link, and it works in their phone's browser." },
  bigger: { q: 'What if I want something bigger?', a: 'VR, full walkthroughs, and games are built by an experienced XR developer partner who joins at the start. I stay on as your producer, so you have one person from the first call.' },
  underway: { q: 'Can you join a game or XR project already underway?', a: 'Yes. I review where things stand, set up a plan and schedule, and keep the team moving from there.' },
  models: { q: 'Do I need 3D models?', a: 'No. I can make them from your photos or product files. Architects and builders can use the model they already have.' },
  engines: { q: 'Which engines and platforms have you worked with?', a: 'Unity and Meta Quest, plus Meta Horizon Worlds. I manage the work and the schedule; your developers build in the engine you use.' },
  glasses: { q: 'Can you build for smart glasses?', a: 'Yes. I can build for AI glasses and display glasses, like Ray-Ban Meta and Meta Ray-Ban Display, for things like hands-free guides, tours, and step-by-step help. It isn’t a package yet, so it’s quoted for your project.' },
  remote: { q: 'Do you work remotely?', a: 'Yes. Most studio work is remote, across time zones, with the tools your team already uses.' },
};
