/**
 * Local font bundle.
 *
 * Each import below pulls a woff2 font file (or a variable woff2) into the
 * Vite build under `dist/assets/`, served from this app's origin. No CDN.
 *
 * Used by:
 *   - the global theme tokens (`--font-primary` / `--font-display` / `--font-mono`
 *     in base.css, plus per-theme overrides in `public/themes/*.css`)
 *   - the Design Specs preview page, which maps the proprietary brand-font
 *     names listed in each `DESIGN.md` to one of these open-licensed families
 *     (see `BRAND_FONT_MAP` in `src/lib/designSpecs.ts`).
 */

// Variable fonts (single woff2 covers all weights — efficient bundling).
import '@fontsource-variable/inter'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/manrope'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/dm-sans'

// Non-variable fonts — import the weights we actually use.
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/700.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import '@fontsource/outfit/700.css'
import '@fontsource/vt323/400.css'
