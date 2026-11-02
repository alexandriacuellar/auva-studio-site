// MOCKUP data (2026-11-02): Tech, Automation & AI split into a main page + 3 sub pages.
export const base = '/mockups/tech';

export const services = [
  { id: 'automation', icon: 'gear', title: 'Automation', price: '$500 per workflow', text: 'Routine work that happens on its own, like follow-ups, review requests, and onboarding.', href: `${base}/automation/`, link: 'See automation' },
  { id: 'ai', icon: 'bulb', title: 'AI for you and your team', price: 'From $150', text: 'Hands-on help using ChatGPT, Claude, or Gemini on your real work, safely.', href: `${base}/ai/`, link: 'See AI help' },
  { id: 'pm', icon: 'compass', title: 'Project management', price: 'From $400', text: 'Get projects out of email and spreadsheets, and someone to keep them on track.', href: `${base}/project-management/`, link: 'See project management' },
];

export const safety = [
  { icon: 'key', title: 'Your accounts, your data', text: 'Everything is built in accounts you own. You add me as a user and remove me when the work is done.' },
  { icon: 'shield', title: 'You approve every message', text: 'Nothing goes to a customer until you have read and approved the wording.' },
  { icon: 'book', title: 'A how-to guide for each one', text: 'Plain steps to pause, change, or turn it off, so you are never stuck with it.' },
  { icon: 'wrench', title: '30 days of fixes', text: 'If something breaks in the first 30 days, I fix it at no charge.' },
];

export const inPerson = { q: 'Do you work in person?', a: 'Yes, from New York City and Westchester up to Albany, though most work happens remotely. On-site time is $65 an hour, and any travel outside the Mid-Hudson Valley is agreed in writing before booking.' };
export const vendors = { q: 'Can you work with our current vendors or IT provider?', a: 'Yes. I often work alongside existing teams and vendors, and can help you review their proposals.' };
