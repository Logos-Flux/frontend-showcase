import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import {
  brandFontStack,
  DESIGN_SPECS,
  localDesignMdPath,
  parseDesignMd,
} from '@/lib/designSpecs'
import { getActiveTheme } from '@/lib/themes'

const fallbackSpec =
  DESIGN_SPECS.find((s) => s.slug === 'eva-01') ?? DESIGN_SPECS[0]

export function DesignSpecs() {
  const { slug } = useParams<{ slug?: string }>()
  // If no slug in URL, default to the currently active theme so picking a
  // brand from the top-right BrandSwitcher and clicking "Designs" feels
  // continuous. If that theme isn't a registered spec, fall back to eva-01.
  const resolvedSlug = slug ?? getActiveTheme()
  const selected =
    DESIGN_SPECS.find((s) => s.slug === resolvedSlug) ?? fallbackSpec

  const [raw, setRaw] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(localDesignMdPath(selected))
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((text) => {
        if (!cancelled) {
          setRaw(text)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(String(e))
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [selected])

  const parsed = useMemo(() => (raw ? parseDesignMd(raw) : null), [raw])
  const html = useMemo(() => (raw ? (marked.parse(raw) as string) : ''), [raw])

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-t-bright text-xl mb-1">Design Specs</h1>
          <p className="text-t-muted text-sm">
            Theme + brand design systems. Pick from the top-right switcher to swap
            both the spec view and the active theme.
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-t-muted">
          {selected.kind} · {selected.label}
        </span>
      </div>

      {loading && <div className="t-card p-6 text-t-muted text-sm">Loading {selected.label}…</div>}
      {error && (
        <div className="t-card p-6 text-t-error text-sm">
          Failed to load <code>{localDesignMdPath(selected)}</code>: {error}
        </div>
      )}

      {parsed && !loading && (
        <div className="space-y-6">
          <header className="t-card p-5">
            <h2 className="font-display text-t-bright text-lg mb-1">{parsed.title}</h2>
            {parsed.tagline && <p className="text-t-muted text-sm">{parsed.tagline}</p>}
          </header>

          {parsed.colors.length > 0 && (
            <section className="t-card p-5">
              <h3 className="font-display text-t-bright text-sm uppercase tracking-wider mb-4">
                Color Palette · {parsed.colors.length}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {parsed.colors.map((c) => (
                  <ColorSwatch key={c.hex + c.name} name={c.name} hex={c.hex} note={c.note} />
                ))}
              </div>
            </section>
          )}

          {parsed.fonts.length > 0 && (
            <section className="t-card p-5">
              <h3 className="font-display text-t-bright text-sm uppercase tracking-wider mb-4">
                Typography
              </h3>
              <div className="space-y-4">
                {parsed.fonts.map((f) => (
                  <FontSample key={f.name} name={f.name} note={f.note} />
                ))}
              </div>
            </section>
          )}

          <section className="t-card p-6">
            <h3 className="font-display text-t-bright text-sm uppercase tracking-wider mb-4">
              Full Spec
            </h3>
            <div
              className="design-md-prose text-t-text text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </section>
        </div>
      )}
    </div>
  )
}

function ColorSwatch({ name, hex, note }: { name: string; hex: string; note?: string }) {
  return (
    <div className="rounded border border-t-border overflow-hidden bg-t-deep">
      <div
        className="h-16 w-full"
        style={{ background: hex }}
        title={note}
      />
      <div className="px-2.5 py-2">
        <div className="text-xs text-t-bright truncate" title={name}>{name}</div>
        <div className="font-mono text-[10px] text-t-muted uppercase">{hex}</div>
      </div>
    </div>
  )
}

function FontSample({ name, note }: { name: string; note?: string }) {
  // Resolve the brand-stated font name to a locally-bundled family (with sane
  // system fallback) via brandFontStack — see BRAND_FONT_SUBSTITUTIONS for the
  // open-licensed → proprietary mapping table.
  const stack = brandFontStack(name)
  return (
    <div className="border border-t-border rounded p-3">
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <div className="font-mono text-xs text-t-bright">{name}</div>
        {note && <div className="text-[11px] text-t-muted text-right truncate flex-1">{note}</div>}
      </div>
      <div style={{ fontFamily: stack }} className="text-t-text">
        <div className="text-2xl">The quick brown fox jumps over the lazy dog</div>
        <div className="text-sm text-t-muted mt-1">
          0123456789 — abcdefghijklmnopqrstuvwxyz — ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
      </div>
    </div>
  )
}
