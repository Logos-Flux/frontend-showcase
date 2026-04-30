/**
 * Design-spec viewer registry.
 *
 * Two kinds of specs are surfaced through the same viewer:
 *   - kind: 'brand'  → external brand DESIGN.md, mirrored from
 *     https://github.com/VoltAgent/awesome-design-md / getdesign.md
 *     into public/design-md/<slug>.md.
 *   - kind: 'theme'  → our own theme design systems, hand-authored at
 *     public/design-md/themes/<slug>.md. The slug matches a theme id
 *     in src/lib/themes.ts.
 */

export type DesignSpecKind = 'brand' | 'theme'

export interface DesignSpec {
  slug: string
  label: string
  kind: DesignSpecKind
}

export interface ParsedSpec {
  title: string
  tagline: string
  intro: string
  colors: { name: string; hex: string; note?: string }[]
  fonts: { name: string; note?: string }[]
}

/**
 * Substitute a brand-stated font name with the closest open-licensed family
 * we actually bundle (see `src/styles/fonts.ts`). Used by the Design Specs
 * preview to render typography samples in something that resembles the real
 * brand font when the brand font is proprietary or otherwise unavailable.
 *
 * Returns a CSS font-family stack — bundled local family first, then sane
 * system fallbacks. Uses case-insensitive prefix matching against the brand
 * name; unknown names fall through to a generic sans stack.
 */
const BRAND_FONT_SUBSTITUTIONS: { match: RegExp; family: string }[] = [
  // Direct hits: brand font is open-licensed and we bundle it
  { match: /^inter\b|^notioninter\b/i, family: '"Inter Variable", Inter' },
  { match: /^geist mono\b|^geistmono\b/i, family: '"Geist Mono Variable", "Geist Mono"' },
  { match: /^geist\b/i, family: '"Geist Variable", Geist' },
  { match: /^jetbrains mono\b/i, family: '"JetBrains Mono Variable", "JetBrains Mono"' },
  { match: /^manrope\b/i, family: '"Manrope Variable", Manrope' },
  { match: /^space grotesk\b/i, family: '"Space Grotesk Variable", "Space Grotesk"' },
  { match: /^fraunces\b/i, family: '"Fraunces Variable", Fraunces' },
  { match: /^plus jakarta\b/i, family: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans"' },
  { match: /^playfair\b/i, family: '"Playfair Display Variable", "Playfair Display"' },
  { match: /^dm sans\b/i, family: '"DM Sans Variable", "DM Sans"' },
  { match: /^ibm plex sans\b/i, family: '"IBM Plex Sans"' },
  { match: /^ibm plex mono\b/i, family: '"IBM Plex Mono"' },
  { match: /^outfit\b/i, family: 'Outfit' },
  { match: /^vt323\b/i, family: 'VT323' },
  { match: /^cormorant\b/i, family: '"Cormorant Garamond"' },

  // Substitutions: proprietary brand fonts → closest open-licensed match
  { match: /^fk grotesk|^fk display|^sohne|^söhne|^söhneplus|^abc diatype|^haas|^söehne|^abcdiatype|^figmasans|^cohere|^kraken|^saans|^stylene|^styreneb|^waldenburg|^circular|^pin sans|^plain black|^medium ?ll|^roobert|^gt walsheim/i, family: '"Inter Variable", Inter' },
  { match: /^geistsans/i, family: '"Geist Variable", Geist' },
  { match: /^berkeley mono|^sfmono|^sf ?mono|^sourcecodepro|^source code pro|^azeret/i, family: '"JetBrains Mono Variable", "JetBrains Mono"' },
  { match: /^bmw type|^universal sans|^sf pro|^cal sans|^notionsans|^helvetica|^arial|^cereal|^camera plain/i, family: '"Inter Variable", Inter' },
  { match: /^ferrarisans|^body-?font/i, family: '"Inter Variable", Inter' },
  { match: /^copernicus|^tiempos|^display serif/i, family: '"Fraunces Variable", Fraunces' },
  { match: /^nvidia/i, family: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans"' },
  { match: /^noto sans/i, family: '"IBM Plex Sans"' },

  // Generic role labels (parser fallthrough — pick something reasonable)
  { match: /mono\b/i, family: '"JetBrains Mono Variable", "JetBrains Mono"' },
  { match: /\b(serif|editorial|tiempos)\b/i, family: '"Fraunces Variable", Fraunces' },
  { match: /\b(display|heading)\b/i, family: '"Space Grotesk Variable", "Space Grotesk"' },
]

const SYSTEM_FALLBACK = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
const SYSTEM_MONO_FALLBACK = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace'
const SYSTEM_SERIF_FALLBACK = 'ui-serif, Georgia, "Times New Roman", serif'

export function brandFontStack(brandName: string): string {
  for (const entry of BRAND_FONT_SUBSTITUTIONS) {
    if (entry.match.test(brandName)) {
      const fallback = /mono\b/i.test(brandName)
        ? SYSTEM_MONO_FALLBACK
        : /\b(serif|editorial)\b/i.test(brandName)
          ? SYSTEM_SERIF_FALLBACK
          : SYSTEM_FALLBACK
      return `${entry.family}, ${fallback}`
    }
  }
  // Unknown name — try the brand-stated family first, then fall back
  return `"${brandName}", ${SYSTEM_FALLBACK}`
}

/**
 * Our own abstract theme design systems. Solamp, DHM, 52 Launch, and
 * Perplexity ship as themes too but live under Brands in the dropdown
 * because they're modeled on real brands — see BRAND_SPECS below. The
 * `kind` field controls the markdown path resolution; the THEME / BRAND
 * arrays only control dropdown grouping.
 */
export const THEME_SPECS: DesignSpec[] = [
  { slug: 'eva-01',   label: 'EVA-01',   kind: 'theme' },
  { slug: 'aurum',    label: 'Aurum',    kind: 'theme' },
  { slug: 'monolith', label: 'Monolith', kind: 'theme' },
  { slug: 'sakura',   label: 'Sakura',   kind: 'theme' },
  { slug: 'phosphor', label: 'Phosphor', kind: 'theme' },
  { slug: 'oceanic',  label: 'Oceanic',  kind: 'theme' },
]

export const BRAND_SPECS: DesignSpec[] = [
  { slug: '52l', label: '52 Launch', kind: 'theme' },
  { slug: 'airbnb', label: 'Airbnb', kind: 'brand' },
  { slug: 'airtable', label: 'Airtable', kind: 'brand' },
  { slug: 'apple', label: 'Apple', kind: 'brand' },
  { slug: 'bmw', label: 'BMW', kind: 'brand' },
  { slug: 'cal', label: 'Cal.com', kind: 'brand' },
  { slug: 'claude', label: 'Claude', kind: 'brand' },
  { slug: 'clay', label: 'Clay', kind: 'brand' },
  { slug: 'clickhouse', label: 'ClickHouse', kind: 'brand' },
  { slug: 'cohere', label: 'Cohere', kind: 'brand' },
  { slug: 'coinbase', label: 'Coinbase', kind: 'brand' },
  { slug: 'composio', label: 'Composio', kind: 'brand' },
  { slug: 'cursor', label: 'Cursor', kind: 'brand' },
  { slug: 'dhm', label: 'DHM', kind: 'theme' },
  { slug: 'elevenlabs', label: 'ElevenLabs', kind: 'brand' },
  { slug: 'expo', label: 'Expo', kind: 'brand' },
  { slug: 'ferrari', label: 'Ferrari', kind: 'brand' },
  { slug: 'figma', label: 'Figma', kind: 'brand' },
  { slug: 'framer', label: 'Framer', kind: 'brand' },
  { slug: 'hashicorp', label: 'HashiCorp', kind: 'brand' },
  { slug: 'ibm', label: 'IBM', kind: 'brand' },
  { slug: 'intercom', label: 'Intercom', kind: 'brand' },
  { slug: 'kraken', label: 'Kraken', kind: 'brand' },
  { slug: 'lamborghini', label: 'Lamborghini', kind: 'brand' },
  { slug: 'linear.app', label: 'Linear', kind: 'brand' },
  { slug: 'lovable', label: 'Lovable', kind: 'brand' },
  { slug: 'minimax', label: 'MiniMax', kind: 'brand' },
  { slug: 'mintlify', label: 'Mintlify', kind: 'brand' },
  { slug: 'miro', label: 'Miro', kind: 'brand' },
  { slug: 'mistral.ai', label: 'Mistral', kind: 'brand' },
  { slug: 'mongodb', label: 'MongoDB', kind: 'brand' },
  { slug: 'notion', label: 'Notion', kind: 'brand' },
  { slug: 'nvidia', label: 'NVIDIA', kind: 'brand' },
  { slug: 'ollama', label: 'Ollama', kind: 'brand' },
  { slug: 'opencode.ai', label: 'OpenCode', kind: 'brand' },
  { slug: 'perplexity', label: 'Perplexity', kind: 'theme' },
  { slug: 'pinterest', label: 'Pinterest', kind: 'brand' },
  { slug: 'posthog', label: 'PostHog', kind: 'brand' },
  { slug: 'raycast', label: 'Raycast', kind: 'brand' },
  { slug: 'renault', label: 'Renault', kind: 'brand' },
  { slug: 'replicate', label: 'Replicate', kind: 'brand' },
  { slug: 'resend', label: 'Resend', kind: 'brand' },
  { slug: 'revolut', label: 'Revolut', kind: 'brand' },
  { slug: 'runwayml', label: 'RunwayML', kind: 'brand' },
  { slug: 'sanity', label: 'Sanity', kind: 'brand' },
  { slug: 'sentry', label: 'Sentry', kind: 'brand' },
  { slug: 'solamp', label: 'Solamp', kind: 'theme' },
  { slug: 'spacex', label: 'SpaceX', kind: 'brand' },
  { slug: 'spotify', label: 'Spotify', kind: 'brand' },
  { slug: 'stripe', label: 'Stripe', kind: 'brand' },
  { slug: 'supabase', label: 'Supabase', kind: 'brand' },
  { slug: 'superhuman', label: 'Superhuman', kind: 'brand' },
  { slug: 'tesla', label: 'Tesla', kind: 'brand' },
  { slug: 'together.ai', label: 'Together', kind: 'brand' },
  { slug: 'uber', label: 'Uber', kind: 'brand' },
  { slug: 'vercel', label: 'Vercel', kind: 'brand' },
  { slug: 'voltagent', label: 'VoltAgent', kind: 'brand' },
  { slug: 'warp', label: 'Warp', kind: 'brand' },
  { slug: 'webflow', label: 'Webflow', kind: 'brand' },
  { slug: 'wise', label: 'Wise', kind: 'brand' },
  { slug: 'x.ai', label: 'xAI', kind: 'brand' },
  { slug: 'zapier', label: 'Zapier', kind: 'brand' },
]

export const DESIGN_SPECS: DesignSpec[] = [...THEME_SPECS, ...BRAND_SPECS]

export function localDesignMdPath(spec: DesignSpec): string {
  const sub = spec.kind === 'theme' ? 'themes/' : ''
  return `${import.meta.env.BASE_URL}design-md/${sub}${spec.slug}.md`
}

const HEX_RE = /#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/g

/**
 * Parse a brand DESIGN.md into structured preview data.
 * The files follow a consistent format from getdesign.md:
 *   # Design System Inspired by <Brand>
 *   ## 1. Visual Theme & Atmosphere   (intro paragraphs)
 *   ## 2. Color Palette & Roles       (`### Primary`, `### Secondary` … with `**Name** (`#hex`)`)
 *   ## 3. Typography Rules
 *     ### Font Family                 (with `**Name**: …`)
 */
export function parseDesignMd(md: string): ParsedSpec {
  const lines = md.split('\n')

  const title = (lines.find((l) => l.startsWith('# ')) ?? '').replace(/^#\s+/, '').trim()

  // Tagline = first non-empty paragraph after the title (often missing — derive from "## 1." section first sentence)
  let tagline = ''
  let intro = ''
  const sec1Idx = lines.findIndex((l) => /^##\s+1\./.test(l))
  if (sec1Idx >= 0) {
    const after = lines.slice(sec1Idx + 1)
    const stopAt = after.findIndex((l) => /^##\s/.test(l))
    const block = (stopAt >= 0 ? after.slice(0, stopAt) : after).join('\n').trim()
    intro = block
    const firstPara = block.split(/\n{2,}/)[0] ?? ''
    tagline = firstPara.split(/(?<=[.!?])\s+/)[0]?.replace(/`/g, '').slice(0, 220) ?? ''
  }

  // Colors — walk the color section. Some specs use "## 2. Color Palette …",
  // others use "## Colors". Per-line: `- **Name** (...#hex...): note`.
  const colors: ParsedSpec['colors'] = []
  const colorIdx = lines.findIndex((l) =>
    /^##\s+(2\.\s+)?(Color\b|Colors\b|Color Palette)/i.test(l),
  )
  if (colorIdx >= 0) {
    const after = lines.slice(colorIdx + 1)
    const stopAt = after.findIndex((l) => /^##\s/.test(l))
    const block = stopAt >= 0 ? after.slice(0, stopAt) : after
    const seen = new Set<string>()
    for (const line of block) {
      // Try structured: - **Name** (anything containing #hex): note
      const structured = line.match(/^\s*-\s+\*\*([^*]+)\*\*\s*\(([^)]*)\)\s*[:—-]?\s*(.*)$/)
      if (structured) {
        const name = structured[1].trim()
        const inner = structured[2]
        const note = stripBackticks(structured[3]).trim() || undefined
        const hexMatch = inner.match(HEX_RE)
        if (hexMatch && hexMatch[0]) {
          const hex = normalizeHex(hexMatch[0])
          const key = hex.toLowerCase()
          if (!seen.has(key)) {
            seen.add(key)
            colors.push({ name, hex, note })
            continue
          }
        }
      }
      // Try simple: - **Name**: #hex — note   (or any hex anywhere on a bullet line)
      const bulletWithHex = line.match(/^\s*-\s+(?:\*\*([^*]+)\*\*\s*[:—-]?\s*)?(.*)$/)
      if (bulletWithHex) {
        const name = bulletWithHex[1]?.trim()
        const rest = bulletWithHex[2]
        const hexMatch = rest.match(HEX_RE)
        if (hexMatch && hexMatch[0]) {
          const hex = normalizeHex(hexMatch[0])
          const key = hex.toLowerCase()
          if (!seen.has(key)) {
            seen.add(key)
            colors.push({ name: name ?? hex, hex })
          }
        }
      }
    }
    // Final fallback: sweep all hex codes from the section
    if (colors.length === 0) {
      for (const line of block) {
        const matches = line.match(HEX_RE) ?? []
        for (const raw of matches) {
          const hex = normalizeHex(raw)
          const key = hex.toLowerCase()
          if (!seen.has(key)) {
            seen.add(key)
            colors.push({ name: hex, hex })
          }
        }
      }
    }
  }

  // Fonts — under "### Font Family" / "### Font Families"
  const fonts: ParsedSpec['fonts'] = []
  const fontIdx = lines.findIndex((l) => /^###\s+Font Famil(y|ies)/i.test(l))
  if (fontIdx >= 0) {
    const after = lines.slice(fontIdx + 1)
    const stopAt = after.findIndex((l) => /^###?\s/.test(l))
    const block = stopAt >= 0 ? after.slice(0, stopAt) : after
    const seenFonts = new Set<string>()
    const isRole = (n: string) =>
      /^(primary|secondary|monospace|mono|display|text\/ui|text|ui|body|headings?|brand)$/i.test(n)
    const skipName = (n: string) =>
      /^(no |opentype|features?$|italic|weights?$|fallbacks?$)/i.test(n)
    for (const line of block) {
      // - **FerrariSans**: Primary typeface for headings…    (concrete font name as bullet)
      // - **Primary**: `Inter Variable`, with fallbacks: …   (role as bullet, real font in backticks)
      const m = line.match(/^\s*-\s+\*\*([^*]+)\*\*\s*[:—-]?\s*(.*)$/)
      if (!m) continue
      const bulletName = m[1].trim()
      const rest = m[2].trim()
      if (skipName(bulletName)) continue
      let name = bulletName
      let note: string | undefined = rest || undefined
      if (isRole(bulletName)) {
        const tick = rest.match(/`([^`]+)`/)
        if (!tick) continue // role bullet with no concrete font name → skip
        name = tick[1].trim()
        note = bulletName
      }
      if (!seenFonts.has(name.toLowerCase())) {
        seenFonts.add(name.toLowerCase())
        fonts.push({ name, note })
      }
    }
    // Fallback for paragraph-style font sections (e.g. BMW): pull bolded font names out of prose
    if (fonts.length === 0) {
      const text = block.join(' ')
      const matches = text.matchAll(/\*\*([A-Z][A-Za-z0-9 .'/-]{2,40})\*\*/g)
      for (const m of matches) {
        const name = m[1].trim()
        if (skipName(name)) continue
        if (!seenFonts.has(name.toLowerCase())) {
          seenFonts.add(name.toLowerCase())
          fonts.push({ name })
        }
      }
    }
  }

  return { title, tagline, intro, colors, fonts }
}

function normalizeHex(input: string): string {
  let h = input.trim()
  if (!h.startsWith('#')) h = '#' + h
  if (h.length === 4) {
    // expand #abc → #aabbcc for consistent rendering
    h = '#' + h.slice(1).split('').map((c) => c + c).join('')
  }
  return h
}

function stripBackticks(s: string): string {
  return s.replace(/`([^`]+)`/g, '$1')
}
