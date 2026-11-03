// "Tools and platforms" rows (alexandria 2026-11-03, idea from the Ulster County Chamber web developers' sites).
// Only what clients recognize: platforms and main tools, no languages or infrastructure. All from her resume or work.
// icon = Simple Icons slug in toolIcons.ts; a tool with no icon in Simple Icons shows a short text mark.
export type Tool = { name: string; icon?: string; mark?: string };

const T: Record<string, Tool> = {
  astro: { name: 'Astro', icon: 'astro' },
  next: { name: 'Next.js', icon: 'nextdotjs' },
  react: { name: 'React', icon: 'react' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  webflow: { name: 'Webflow', icon: 'webflow' },
  shopify: { name: 'Shopify', icon: 'shopify' },
  sanity: { name: 'Sanity', icon: 'sanity' },
  cloudflare: { name: 'Cloudflare', icon: 'cloudflare' },
  zapier: { name: 'Zapier', icon: 'zapier' },
  make: { name: 'Make', icon: 'make' },
  chatgpt: { name: 'ChatGPT', mark: 'GPT' },
  claude: { name: 'Claude', icon: 'claude' },
  gemini: { name: 'Gemini', icon: 'googlegemini' },
  metaai: { name: 'Meta AI', icon: 'meta' },
  copilot: { name: 'Microsoft Copilot', mark: 'Co' },
  notion: { name: 'Notion', icon: 'notion' },
  jira: { name: 'Jira', icon: 'jira' },
  clickup: { name: 'ClickUp', icon: 'clickup' },
  trello: { name: 'Trello', icon: 'trello' },
  gworkspace: { name: 'Google Workspace', mark: 'G' },
  m365: { name: 'Microsoft 365', mark: '365' },
  quest: { name: 'Meta Quest', icon: 'meta' },
  horizon: { name: 'Horizon Worlds', icon: 'meta' },
  unity: { name: 'Unity', icon: 'unity' },
  blender: { name: 'Blender', icon: 'blender' },
  krita: { name: 'Krita', icon: 'krita' },
  mindar: { name: 'MindAR', mark: 'AR' },
  three: { name: 'three.js', icon: 'threedotjs' },
  modelviewer: { name: 'model-viewer', mark: '3D' },
  miro: { name: 'Miro', icon: 'miro' },
};

export const toolSets: Record<string, Tool[]> = {
  // Websites and Development Partnerships share one list (alexandria 2026-11-03).
  websites: [T.astro, T.next, T.react, T.typescript, T.webflow, T.shopify, T.sanity, T.cloudflare],
  // Automation (new service, alexandria 2026-11-03): only tools she has used. PM tools: Jira, ClickUp, Trello most; learning Notion. Add apps as she connects them for clients.
  automation: [T.zapier, T.make, T.chatgpt, T.claude, T.gemini, T.metaai, T.copilot, T.jira, T.clickup, T.trello, T.notion],
  // AR, VR & Production (alexandria 2026-11-03): Quest 2 and 3, Horizon Worlds, Unity, Blender, Krita, MindAR + three.js (web AR, as on her business card; web AR/VR is what she wants to do next), her PM tools, Miro.
  xr: [T.quest, T.horizon, T.unity, T.blender, T.krita, T.mindar, T.three, T.modelviewer, T.jira, T.clickup, T.trello, T.notion, T.miro],
};
