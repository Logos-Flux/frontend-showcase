export interface ThemeDef {
  id: string
  name: string
  description: string
}

export const THEMES: ThemeDef[] = [
  { id: 'eva-01', name: 'EVA-01', description: 'Dark sci-fi cockpit, purple + green' },
  { id: 'aurum', name: 'Aurum', description: 'Dark luxury, gold + serif display' },
  { id: 'monolith', name: 'Monolith', description: 'Brutalist mono, sharp, no glow' },
  { id: 'sakura', name: 'Sakura', description: 'Light paper, coral + plum' },
  { id: 'phosphor', name: 'Phosphor', description: 'Retro CRT green with scanlines' },
  { id: 'oceanic', name: 'Oceanic', description: 'Deep teal, cyan + coral' },
  { id: 'solamp', name: 'Solamp', description: 'Light corporate, navy + amber' },
  { id: 'dhm', name: 'DHM', description: 'Aerial editorial, teal + sunset' },
  { id: '52l', name: '52 Launch', description: 'Launch velocity, indigo + coral' },
  { id: 'perplexity', name: 'Perplexity', description: 'Calm research console, teal on near-black' },
  { id: 'airbnb', name: 'Airbnb', description: 'White canvas, single Rausch pink, photo-led' },
  { id: 'airtable', name: 'Airtable', description: 'White canvas, near-black ink, signature-color stripes' },
  { id: 'apple', name: 'Apple', description: 'Parchment + white, single Action Blue, no chrome' },
  { id: 'bmw', name: 'BMW', description: 'Cream-white canvas, corporate blue, sharp square cards' },
  { id: 'cal', name: 'Cal.com', description: 'White canvas, near-black CTA, friendly SaaS' },
  { id: 'claude', name: 'Claude', description: 'Warm cream canvas, coral CTAs, serif display' },
  { id: 'clay', name: 'Clay', description: 'Warm cream + multi-color claymation accents' },
  { id: 'clickhouse', name: 'ClickHouse', description: 'Black canvas, electric yellow voltage' },
  { id: 'cohere', name: 'Cohere', description: 'White editorial, deep green-black, mineral cards' },
  { id: 'coinbase', name: 'Coinbase', description: 'Blue + white binary, Coinbase Blue CTAs' },
  { id: 'composio', name: 'Composio', description: 'Pitch black, cobalt + cyan, brutalist shadows' },
  { id: 'cursor', name: 'Cursor', description: 'Warm cream, accent orange, 3-font code-editor' },
  { id: 'elevenlabs', name: 'ElevenLabs', description: 'Near-white + warm stone, whisper-light display' },
  { id: 'expo', name: 'Expo', description: 'Cool off-white, monochrome, pill geometry' },
  { id: 'ferrari', name: 'Ferrari', description: 'Black void + crisp white, surgical Ferrari Red' },
  { id: 'figma', name: 'Figma', description: 'Pure black + white chrome, dashed focus, hero gradient hint' },
  { id: 'framer', name: 'Framer', description: 'Pure black void, single Framer Blue, frosted glass' },
  { id: 'hashicorp', name: 'HashiCorp', description: 'Light gray + Terraform purple, micro-shadow whispers' },
  { id: 'ibm', name: 'IBM', description: 'White + Blue 60, Plex Sans Light, 0px corners' },
  { id: 'intercom', name: 'Intercom', description: 'Warm cream + Fin Orange, sharp 4px corners' },
  { id: 'kraken', name: 'Kraken', description: 'White canvas, Kraken purple, whisper shadows' },
  { id: 'lamborghini', name: 'Lamborghini', description: 'True black void, Lamborghini gold, all-caps display' },
  { id: 'linear.app', name: 'Linear', description: 'Near-black native, indigo-violet, weight 510' },
  { id: 'lovable', name: 'Lovable', description: 'Warm parchment, opacity-driven grays' },
  { id: 'minimax', name: 'MiniMax', description: 'White + brand blue / pink, pill buttons' },
  { id: 'mintlify', name: 'Mintlify', description: 'White canvas, brand green, atmospheric hero' },
  { id: 'miro', name: 'Miro', description: 'White + Blue 450, pastel collaboration accents' },
  { id: 'mistral.ai', name: 'Mistral', description: 'Sun-drenched amber + Mistral Orange, sharp corners' },
  { id: 'mongodb', name: 'MongoDB', description: 'Forest-dark teal + neon green, serif display' },
  { id: 'notion', name: 'Notion', description: 'Warm white, ultra-thin borders, Notion Blue' },
  { id: 'nvidia', name: 'NVIDIA', description: 'Black + GPU lime green as borders only' },
  { id: 'ollama', name: 'Ollama', description: 'Pure grayscale, SF Pro Rounded, pill geometry' },
  { id: 'opencode.ai', name: 'OpenCode', description: 'Warm near-black, Berkeley Mono everywhere' },
  { id: 'pinterest', name: 'Pinterest', description: 'Warm white + Pinterest Red, plum-black ink' },
  { id: 'posthog', name: 'PostHog', description: 'Sage parchment + hidden orange on hover' },
  { id: 'raycast', name: 'Raycast', description: 'Obsidian + Raycast Red, macOS shadow stack' },
  { id: 'renault', name: 'Renault', description: 'White + Renault yellow, sharp 0px corners, aurora wash' },
  { id: 'replicate', name: 'Replicate', description: 'White + Replicate Red, festival-poster gradient' },
  { id: 'resend', name: 'Resend', description: 'Black canvas + serif hero, icy blue-tinted borders' },
  { id: 'revolut', name: 'Revolut', description: 'Near-black + white, billboard-scale display' },
  { id: 'runwayml', name: 'Runway', description: 'Pure black, single typeface, invisible interface' },
  { id: 'sanity', name: 'Sanity', description: 'Near-black + Sanity red, electric-blue activation' },
  { id: 'sentry', name: 'Sentry', description: 'Deep purple, lime CTA, inset-shadow buttons' },
  { id: 'spacex', name: 'SpaceX', description: 'Pure black + spectral white, all-caps stencil' },
  { id: 'spotify', name: 'Spotify', description: 'Near-black cocoon, Spotify Green, pill controls' },
  { id: 'stripe', name: 'Stripe', description: 'White + Stripe Purple, weight-300 navy display' },
  { id: 'supabase', name: 'Supabase', description: 'Dark mode native + Postgres-emerald accent' },
  { id: 'superhuman', name: 'Superhuman', description: 'White + Mysteria purple, warm cream buttons' },
  { id: 'tesla', name: 'Tesla', description: 'Pure white, single Electric Blue, no decoration' },
  { id: 'together.ai', name: 'Together', description: 'White + pastel cloud gradient, sharp geometry' },
  { id: 'uber', name: 'Uber', description: 'Pure black + white binary, pill everything' },
  { id: 'vercel', name: 'Vercel', description: 'White + Geist, shadow-as-border, workflow accents' },
  { id: 'voltagent', name: 'VoltAgent', description: 'Carbon black + Emerald Signal Green, warm-charcoal borders' },
  { id: 'warp', name: 'Warp', description: 'Warm dark + parchment text, monochromatic discipline' },
  { id: 'webflow', name: 'Webflow', description: 'White + Webflow Blue, 5-layer cascading shadow on hover' },
  { id: 'wise', name: 'Wise', description: 'Cream + Wise lime green, weight-900 0.85 line-height display' },
  { id: 'x.ai', name: 'xAI', description: 'Brutalist dark + GeistMono display, white at opacities' },
  { id: 'zapier', name: 'Zapier', description: 'Cream paper + Zapier Orange, sand-bordered structure' },
]

const STORAGE_KEY = 'theme'
const DEFAULT_THEME = 'eva-01'

export function getActiveTheme(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function setActiveTheme(id: string): void {
  const link = document.getElementById('theme-css') as HTMLLinkElement | null
  if (link) link.href = `${import.meta.env.BASE_URL}themes/${id}.css`
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* storage disabled — just swap the link */
  }
}
