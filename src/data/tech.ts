// Automation, AI & Projects (URL /automation-ai-projects/): main page + 3 sub pages (alexandria 2026-11-02).
// The section name lives here so a rename is one line. Spanish copy is in tech.es.ts.
export const sectionName = 'Automation, AI & Projects';
export const base = '/automation-ai-projects';

export const services = [
  { id: 'automation', icon: 'gear', title: 'Automation', price: '$500 per workflow', text: 'Routine work that happens on its own, like follow-ups, review requests, and onboarding.', href: `${base}/automation/`, link: 'See automation' },
  { id: 'ai', icon: 'bulb', title: 'AI for you and your team', price: 'From $150', text: 'Hands-on help using ChatGPT, Claude, or Gemini on your real work, safely.', href: `${base}/ai/`, link: 'See AI help' },
  { id: 'pm', icon: 'compass', title: 'Project management', price: 'From $400', text: 'Get projects out of email and spreadsheets, and someone to keep them on track.', href: `${base}/project-management/`, link: 'See project management' },
];

export const audiences = [
  { icon: 'globe', title: 'Shops, restaurants, and local services', text: 'Inquiries slip through, reviews never get asked for, and invoices need chasing.', to: 'automation' },
  { icon: 'book', title: 'Nonprofits', text: 'A small team doing the same tasks twice, on a tight budget.', to: 'automation' },
  { icon: 'key', title: 'Startups', text: 'A first product, new systems, and a project that needs someone keeping it on track.', to: 'pm' },
  { icon: 'chart', title: 'Offices and growing teams', text: 'More people and more projects, with work spread across email, chats, and spreadsheets.', to: 'pm' },
  { icon: 'bulb', title: 'Teams curious about AI', text: "You know AI could help, but not where to start or what's safe to share with it.", to: 'ai' },
];

export const safety = [
  { icon: 'key', title: 'Your accounts, your data', text: 'Everything is built in accounts you own. You add me as a user and remove me when the work is done.' },
  { icon: 'shield', title: 'You approve every message', text: 'Nothing goes to a customer until you have read and approved the wording.' },
  { icon: 'book', title: 'A how-to guide for each one', text: 'Plain steps to pause, change, or turn it off, so you are never stuck with it.' },
  { icon: 'wrench', title: '30 days of fixes', text: 'If something breaks in the first 30 days, I fix it at no charge.' },
];

export const automationExamples = [
  { icon: 'mail', title: 'Lead follow-up', text: 'An inquiry that waits two days for a reply may already have called someone else. With this, every website inquiry gets an instant reply and lands in one list, with a nudge to you if nobody answers in 2 days.' },
  { icon: 'star', title: 'Review requests', text: 'After a job or visit, a thank-you with your Google review link and one gentle reminder.' },
  { icon: 'gear', title: 'Your own', text: 'Client onboarding, a monthly report, or another task your team does by hand.' },
];

export const aiPackages = [
  { icon: 'bulb', title: '1-on-1 AI Session', price: '$150', text: 'For owners and solo pros. 90 minutes, just you and me, working on your own tasks in the AI tool you choose.', items: ['Set up safely on your account', 'Practice on your real work', 'Your saved prompts to keep'], link: 'Ask about this', topic: 'ai-session' },
  { icon: 'chat', title: 'Team AI Workshop', price: 'Coming soon', text: 'The same hands-on approach for up to 10 people, with safe account setup, saved prompts, and one-page AI rules for your team.', items: ['Practice on real tasks together', 'What is safe to share, and what is not', 'A one-page guide to keep'], link: 'Ask to be first in line', topic: 'workshop' },
];

export const aiTasks = [
  { icon: 'mail', title: 'Answer customer emails faster', text: 'Draft replies to common questions, then check and send.' },
  { icon: 'book', title: 'Write job posts and descriptions', text: 'Turn a few notes into a clear first draft.' },
  { icon: 'clock', title: 'Turn meetings into to-dos', text: 'Summaries and next steps, without retyping your notes.' },
  { icon: 'chat', title: 'Draft social posts and newsletters', text: 'A week of ideas and drafts in your own voice.' },
  { icon: 'search', title: 'Find answers in your own documents', text: 'Ask your handbook, policies, or price list a question.' },
  { icon: 'layers', title: 'First drafts of quotes and proposals', text: 'Start from a draft instead of a blank page.' },
];

export const pmPackages = [
  { icon: 'layers', title: 'Project workspace setup', price: 'From $400', topic: 'workspace', text: 'Get work out of email and spreadsheets and into one tool, like Asana, ClickUp, monday.com, Notion, or Trello. You choose the tool, or I’ll recommend one. More boards or projects to move are quoted, usually $750 to $1,500.', items: ['1 board with your stages', 'Up to 3 templates for repeat work', 'Up to 5 current projects moved in', 'A 1-hour team training and 30 days of questions'] },
  { icon: 'check', title: 'Project Kickoff Plan', price: '$650', topic: 'kickoff', text: 'Before a project starts: a clear scope, timeline, owners, and risks, ready to bring into your tool.', items: ['Up to 2 planning sessions with your team', 'Scope and milestones in writing', 'Who does what, and when', 'Written plan within 5 business days', 'A task list that imports into Asana, ClickUp, monday.com, Notion, and most other tools', 'Credited toward your first month of project management'] },
  { icon: 'compass', title: 'Monthly project management', price: 'From $650/mo', topic: 'delivery', text: 'Someone to keep your project on track, run check-ins, and handle vendors, without a full-time hire.', items: ['10 hrs $650, 20 hrs $1,200, 40 hrs $2,200', 'A short written update every week', '3-month minimum'] },
];

export const faq = {
  founding: { id: 'faq-founding', q: 'What are founding prices?', a: "My first 5 automation, AI, and project clients get these prices, in exchange for a short review. This is a limited-time offer: after that, prices go up. They don't combine with the nonprofit discount; if both apply, you get the bigger one." },
  review: { q: "What's in the Tech Review?", a: 'A 60-minute call, then a written report within 5 business days with your top fixes in order and rough costs. The $250 is credited toward any package with me that starts within 90 days.' },
  inPerson: { q: 'Do you work in person?', a: 'Yes, from New York City and Westchester up to Albany, though most work happens remotely. On-site time is $65 an hour, and any travel outside the Mid-Hudson Valley is agreed in writing before booking.' },
  vendors: { q: 'Can you work with our current vendors or IT provider?', a: 'Yes. I often work alongside existing teams and vendors, and can help you review their proposals.' },
  needAi: { q: 'Does every automation use AI?', a: "No. Most don't need it. I use AI only where it helps, like sorting messages or drafting a reply you approve." },
  appChanges: { q: 'What if an app we use changes and an automation stops?', a: 'Fixes are free for 30 days. After that, a fix is usually under an hour at my $125 hourly rate, quoted first.' },
  tools: { q: 'Which tools do you use?', a: 'Zapier or Make, connected to the apps you already have, like Gmail, Google Sheets, your website form, and your booking or invoicing tool.' },
  skills: { q: 'Do I need technical skills?', a: 'No. Sessions are made for non-technical people, using tools like ChatGPT, Claude, and Gemini on your real work.' },
  aiSafe: { q: 'Is it safe to use AI with our business data?', a: 'It can be, with business accounts and the right settings. Every AI session covers what is safe to share.' },
  chatbot: { q: 'Can you put an AI chatbot on my website?', a: 'Yes. That is a website add-on, quoted for your site.' },
  whichPm: { q: 'Which one should I start with?', a: 'If your team has no shared tool yet, start with the workspace setup. If a big project is about to start, start with the Kickoff Plan. If the project is already moving and needs someone to run it, go monthly.' },
};
