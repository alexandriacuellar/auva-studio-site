// AR, VR & Production: main page + AR Packages and Game & XR Production sub pages (alexandria 2026-11-03).
// Spanish copy is in production.es.ts. Package prices live in aiOffers in site.ts.
export const base = '/ar-vr-production';

export const t = {
  title: 'AR, VR & Production',
  seo: 'AR Packages & Game and XR Producer | Auva Studio',
  desc: 'AR packages from $750 for businesses, architects, museums, and brands, opening on any phone with no app, plus a game and XR producer for studios.',
  heroH: 'AR and VR people remember, <em>and a producer to get it built.</em>',
  heroL: 'AR that works on any phone, VR on Meta Quest, and a producer who keeps game and XR teams on schedule.',
  book: 'Book a free 30-minute call', seeHow: 'How I help',
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
  arDesc: 'AR cards, flyers, labels, packaging, product views, and project viewers from $750. They open in any phone browser, with no app to download.',
  arH: 'AR people remember, <em>from $750.</em>', arL: 'Cards, labels, products, and buildings that come alive on any phone. No app to download.',
  tryCard: 'Try it on my card', pkH: 'AR packages, <em>priced up front.</em>', pkL: "Each one opens in a phone's browser. Founding prices for my first 5 AR clients.", ask: 'Ask about this',
  bigH: 'Need something bigger?', bigP: 'VR training, home walkthroughs, Meta Horizon worlds, and full apps are built with an experienced AR and VR developer partner who joins at the start. I stay on as your producer. Quoted for your project.',
  ideasH: 'What we could <em>build together.</em>', ideasL: 'A few more ideas to spark yours.',
  demosH: 'Try my AR demos <em>yourself.</em>', demosL: 'Each demo shows one of my AR packages. Open it on your phone and try it the way your customers would. The 3D models here are kept simple so they load fast. Yours can be more detailed or realistic, built from your own 3D files or made for your project.',
  seeDemos: 'See the demos', demoTry: 'Try the demo', demoWorks: 'Works on', demoLink: 'See the demo',
  live: 'Live demo', idea: 'Idea', ideaPartner: 'Idea, with partner',
  // Studios sub page
  stTitle: 'Game and XR Production', stSeo: 'Game and XR Producer for Indie Studios | Auva Studio',
  stDesc: 'A producer for game and XR teams: a $650 Production Plan Review, or production support at $65/hr or monthly from $650, without a full-time hire.',
  stH: 'A producer for game and XR teams, <em>without a full-time hire.</em>', stL: 'Plans, schedules, design documents, and playtests that keep your team aligned and your launch on track.',
  offH: 'Start with a plan, <em>or bring me onto the team.</em>', offL: '14+ game and XR projects managed for indie studios since 2023.',
  proofH: "From the studios <em>I've worked with.</em>",
};

export const services = [
  { id: 'ar', icon: 'layers', title: 'AR packages', price: 'From $750', text: 'Cards, labels, products, and buildings that come alive on any phone, with no app to download.', href: `${base}/ar/`, link: 'See AR packages' },
  { id: 'studios', icon: 'star', title: 'Game and XR production', price: 'From $650', text: 'An experienced producer and a schedule your team can trust, without a full-time hire.', href: `${base}/studios/`, link: 'See production for studios' },
];

export const audiences = [
  { icon: 'layers', title: 'Shops, makers, and product brands', text: 'Let customers see a product at home before they buy, or scan a label or package that comes alive.', to: 'ar' },
  { icon: 'compass', title: 'Architects, builders, and developers', text: "Show clients a home or building that isn't built yet, on the table or full size on the lot.", to: 'ar' },
  { icon: 'book', title: 'Museums, educators, and cultural organizations', text: 'Exhibits, lessons, and historic sites that show a scene, a voice, or a 3D object through a phone or headset.', to: 'ar' },
  { icon: 'globe', title: 'Venues, brands, and tourism', text: 'Attractions, events, and campaigns people remember, from a scan-to-play poster to a Meta Horizon world.', to: 'ar' },
  { icon: 'star', title: 'Game and XR studios', text: 'An experienced producer and a schedule people trust, without a full-time hire.', to: 'studios' },
];

// Live AR demos on the AR packages page, like the sample sites on the Websites page.
// pkg is the aiOffers id; its title and price come from site.ts.
export const demos = [
  { pkg: 'ar-product', img: 'room', name: 'See it in your room', href: '/samples/see-it-in-your-space/', works: 'phones and Meta Quest 3',
    text: 'A store page where shoppers place a dress form, a lamp, or a honey pot at real size in their own room, then add more pieces and turn them. The store is made up.',
    goodFor: 'Good for furniture, home goods, and gift shops, and anything people want to see at home first.' },
  { pkg: 'ar-card', img: 'card', name: 'My AR business card', href: '/samples/ar-business-card/', works: 'phones',
    text: 'Point your phone at my business card, or at the card on your computer screen, and I pop out of it with buttons to send me a message, email me, or follow. Only have a phone? Watch it right there.',
    goodFor: 'Good for business cards, flyers, postcards, and event signs.' },
  { pkg: 'ar-menu', img: 'label', name: 'A cider label that rides off the can', href: '/samples/ar-label/', works: 'phones',
    text: 'Point your phone at a hard cider label, or at the label on your computer screen, and the Headless Horseman gallops out, rears up, and throws his pumpkin. It bursts into buttons for tasting notes and where to buy. The cider is made up.',
    goodFor: 'Good for anyone who makes a physical product, from cider and coffee to candles, skincare, and toys.' },
  { pkg: 'ar-project', img: 'house', name: 'A farmhouse before it’s built', href: '/samples/ar-project-viewer/', works: 'phones and Meta Quest 3',
    text: 'An architect’s project page where clients set a new farmhouse on the table, lift the roof to see the rooms, try three finishes, and see it at night. Or switch to full size and stand on the porch. The firm is made up.',
    goodFor: 'Good for architects, builders, remodelers, and developers who want clients to see a project before it’s built.' },
];

export const ideas = [
  { icon: 'book', title: 'A box that opens itself', text: "Scan the box and what's inside unfolds in 3D, then shows how to set it up." },
  { icon: 'compass', title: 'A new kitchen before the work starts', text: 'Homeowners see the remodel in their own kitchen before the first wall comes down.' },
  { icon: 'globe', title: 'A sign that tells a story', text: 'A historic marker that shows the street 100 years ago.' },
  { icon: 'shield', title: 'VR training for staff', text: 'Practice a safety step or a hard conversation on Meta Quest before doing it for real.', partner: true },
];

export const studioOffers = [
  { icon: 'search', topic: 'review', price: '$650', text: 'I review your scope, milestones, and risks, and give you a plan your team can follow. About 2 weeks.', items: ['Scope, milestones, and risks reviewed', 'A plan and schedule your team can follow', 'Project tools set up if you need them'] },
  { icon: 'star', topic: 'production', price: '$65/hr, or monthly from $650', text: 'A producer inside your team: plans, schedules, design documents, playtests, and keeping everyone aligned. Join at the start or partway through.', items: ['Monthly: 10 hrs $650, 20 hrs $1,200, or 40 hrs $2,200', 'Agile workflow, sprints, design documents, and playtests', '3-month minimum for monthly'] },
];

export const faq = {
  founding: { id: 'faq-founding', q: 'What are founding prices?', a: "My first 5 AR clients get these prices, in exchange for a short review and permission to show the project. After that, prices go up. They don't combine with the nonprofit discount; if both apply, you get the bigger one." },
  app: { q: 'Do my customers need an app?', a: "No. They scan a code or open a link, and it works in their phone's browser." },
  bigger: { q: 'What if I want something bigger?', a: 'VR, full walkthroughs, and games are built by an experienced AR and VR developer partner who joins at the start. I stay on as your producer, so you have one person from the first call.' },
  underway: { q: 'Can you join a game or XR project already underway?', a: 'Yes. I review where things stand, set up a plan and schedule, and keep the team moving from there.' },
  models: { q: 'Do I need 3D models?', a: 'No. I can make them from your photos or product files. Architects and builders can use the model they already have.' },
  engines: { q: 'Which engines and platforms have you worked with?', a: 'Unity and Meta Quest, plus Meta Horizon Worlds. I manage the work and the schedule; your developers build in the engine you use.' },
  glasses: { q: 'Can you build for smart glasses?', a: 'Yes. I can build for AI glasses and display glasses, like Ray-Ban Meta and Meta Ray-Ban Display, for things like hands-free guides, tours, and step-by-step help. It isn’t a package yet, so it’s quoted for your project.' },
  remote: { q: 'Do you work remotely?', a: 'Yes. Most studio work is remote, across time zones, with the tools your team already uses.' },
};
