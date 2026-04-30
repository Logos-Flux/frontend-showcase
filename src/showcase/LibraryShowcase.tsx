import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  Activity, AlertCircle, AlertTriangle, ArrowRight, Bot, Box, CheckCircle2, Cpu, Database, Flame,
  GitBranch, HardDrive, Info, Power, Radio, Rocket, Search, Settings, Signal,
  Sparkles, Terminal, Trash2,
} from 'lucide-react'
import {
  ComplexStatisticsCard,
  ControllerCard,
  DataTable, type DataTableColumn,
  Dialog,
  Drawer,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
  EmptyState,
  GradientBorder,
  GradientProgress,
  Heatmap,
  KeyValueList, KeyValueRow,
  LogStream, type LogLine,
  MessageCard,
  MiniStatCard,
  Pagination,
  RadialGauge,
  SegmentedControl,
  Skeleton,
  Sparkline,
  StatusPill,
  Switch,
  Tab, TabList, TabPanel, Tabs,
  Timeline, TimelineItem,
  Tooltip,
  ToastProvider, useToast,
  CommandPalette, type CommandItem,
} from '@/components/library'

const Globe = lazy(() => import('@/components/library/Globe').then((m) => ({ default: m.Globe })))
const VectorMap = lazy(() =>
  import('@/components/library/VectorMap').then((m) => ({ default: m.VectorMap })),
)

interface SectionDef {
  id: string
  num: string
  title: string
  classification: string
  blurb: string
  specimens: string[]
}

const SECTIONS: SectionDef[] = [
  { id: 'structural', num: '01', title: 'STRUCTURE', classification: 'CHASSIS', blurb: 'Containment shells & frame primitives.', specimens: ['GradientBorder'] },
  { id: 'controls',   num: '02', title: 'CONTROLS',  classification: 'INPUT',    blurb: 'Interactive toggles, selectors, and menus.', specimens: ['Switch', 'SegmentedControl', 'Tabs', 'DropdownMenu'] },
  { id: 'surfaces',   num: '03', title: 'SURFACES',  classification: 'CARD',     blurb: 'Containment for data, status, and action.', specimens: ['MiniStatCard', 'ComplexStatisticsCard', 'ControllerCard', 'MessageCard', 'EmptyState'] },
  { id: 'metrics',    num: '04', title: 'METRICS',   classification: 'TELEMETRY',blurb: 'Numerical readouts — bar, gauge, trace.', specimens: ['GradientProgress', 'RadialGauge', 'Sparkline'] },
  { id: 'status',     num: '05', title: 'STATUS',    classification: 'STATE',    blurb: 'Liveness, placeholders, real-time streams.', specimens: ['StatusPill', 'Skeleton', 'LogStream'] },
  { id: 'data',       num: '06', title: 'DATA',      classification: 'TABULAR',  blurb: 'Row & field containment for structured output.', specimens: ['KeyValueList', 'DataTable', 'Pagination'] },
  { id: 'temporal',   num: '07', title: 'TEMPORAL',  classification: 'HISTORY',  blurb: 'Events & activity over time.', specimens: ['Timeline', 'Heatmap'] },
  { id: 'geospatial', num: '08', title: 'GEOSPATIAL',classification: 'RECON',    blurb: 'Topology visualizers. Lazy-loaded — heavy.', specimens: ['Globe', 'VectorMap'] },
  { id: 'overlays',   num: '09', title: 'OVERLAYS',  classification: 'LAYER',    blurb: 'Portaled surfaces: modals, drawers, tooltips, palettes.', specimens: ['Dialog', 'Drawer', 'Tooltip', 'Toast', 'CommandPalette'] },
]

export function LibraryShowcase() {
  return (
    <ToastProvider placement="bottom-right">
      <LibraryShowcaseInner />
    </ToastProvider>
  )
}

function LibraryShowcaseInner() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [missionClock, setMissionClock] = useState(() => formatMissionClock(new Date()))

  useEffect(() => {
    const id = setInterval(() => setMissionClock(formatMissionClock(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActiveSection(hit.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative -m-4 md:-m-6 bg-t-deep circuit-bg codex-grain">
      {/* decorative corners */}
      <span className="codex-corner tl" aria-hidden />
      <span className="codex-corner tr" aria-hidden />
      <span className="codex-corner bl" aria-hidden />
      <span className="codex-corner br" aria-hidden />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <Hero missionClock={missionClock} onOpenPalette={() => setPaletteOpen(true)} />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-16">
          <IndexRail active={activeSection} onSelect={scrollTo} />

          <div className="min-w-0 space-y-24 lg:space-y-32">
            {SECTIONS.map((s) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => {
                  sectionRefs.current[s.id] = el
                }}
                className="scroll-mt-8"
              >
                <SectionHeader section={s} />
                <div className="mt-10 space-y-14">
                  {s.specimens.map((name, idx) => (
                    <Specimen key={name} code={name} index={computeSpecimenIndex(s, idx)} />
                  ))}
                </div>
              </section>
            ))}

            <Coda />
          </div>
        </div>
      </div>

      <GlobalCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onJump={scrollTo} />
    </div>
  )
}

/* ========================================================================== */
/* HERO                                                                        */
/* ========================================================================== */

function Hero({ missionClock, onOpenPalette }: { missionClock: string; onOpenPalette: () => void }) {
  return (
    <header className="relative overflow-hidden border border-t-border bg-t-surface/40 rounded-md codex-scanlines">
      <div className="codex-scan-sweep pointer-events-none" aria-hidden />

      <div className="relative px-6 lg:px-10 py-10 lg:py-14">
        {/* Top strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-terminal uppercase tracking-[0.3em] text-t-muted">
          <span className="flex items-center gap-2">
            <span className="codex-blink text-t-accent-alt">●</span>
            LIVE&nbsp;·&nbsp;CLEARANCE TIER-1
          </span>
          <span className="tabular-nums">T{missionClock}</span>
          <span>REV 2026.04.19</span>
        </div>

        {/* Title lockup */}
        <div className="mt-8 flex items-end gap-6 flex-wrap">
          <div className="font-display text-[11px] text-t-accent-alt tracking-[0.4em] uppercase leading-none">
            Materiel Catalog
          </div>
        </div>
        <h1 className="mt-2 font-display uppercase leading-[0.85] tracking-tight text-t-bright"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}>
          Codex&thinsp;<span className="text-t-accent">·</span>&thinsp;28
        </h1>
        <div className="mt-4 max-w-2xl text-sm text-t-text leading-relaxed">
          Every component presently staged in{' '}
          <code className="font-terminal text-t-bright">src/components/library/</code>{' '}
          catalogued, classified, and served live. Hover, toggle, dispatch — nothing is a screenshot.
          Tree-shaken from the production bundle until a panel imports it.
        </div>

        {/* Stat strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatChip label="Specimens" value="28" accent="purple" />
          <StatChip label="Sections" value="09" accent="green" />
          <StatChip label="Deps Added" value="3" secondary="three · d3-geo · topojson" accent="info" />
          <StatChip label="Runtime Cost" value="0KB" secondary="staged, not mounted" accent="green" />
        </div>

        {/* Hotkey lure */}
        <button
          type="button"
          onClick={onOpenPalette}
          className="mt-8 inline-flex items-center gap-3 px-3.5 py-2 rounded
            border border-t-border bg-t-deep/60 hover:border-t-accent/60 transition-colors
            font-terminal text-[11px] uppercase tracking-[0.25em] text-t-muted hover:text-t-bright"
        >
          <Search className="w-3.5 h-3.5" />
          Jump to Specimen
          <kbd className="ml-2 text-[10px] px-1.5 py-0.5 border border-t-border rounded">⌘K</kbd>
        </button>
      </div>
    </header>
  )
}

function StatChip({ label, value, secondary, accent }: {
  label: string; value: string; secondary?: string
  accent: 'purple' | 'green' | 'info'
}) {
  const color = accent === 'purple' ? 'text-t-accent' : accent === 'green' ? 'text-t-accent-alt' : 'text-t-info'
  return (
    <div className="border border-t-border bg-t-deep/40 px-3 py-2.5 rounded">
      <div className="text-[9px] uppercase tracking-[0.3em] text-t-muted font-terminal">{label}</div>
      <div className={`font-display text-2xl leading-none mt-1 ${color}`}>{value}</div>
      {secondary && <div className="text-[10px] text-t-muted font-terminal uppercase tracking-wider mt-1.5">{secondary}</div>}
    </div>
  )
}

/* ========================================================================== */
/* INDEX RAIL                                                                  */
/* ========================================================================== */

function IndexRail({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-10">
        <div className="text-[9px] font-terminal uppercase tracking-[0.3em] text-t-muted mb-4">
          Manifest · Index
        </div>
        <ol className="space-y-1.5">
          {SECTIONS.map((s) => {
            const isActive = active === s.id
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(s.id)}
                  className={`group w-full text-left flex items-baseline gap-3 px-3 py-2 rounded
                    border border-transparent transition-all
                    ${isActive
                      ? 'border-t-accent/40 bg-t-accent/10 text-t-bright'
                      : 'text-t-muted hover:text-t-bright hover:border-t-border'}`}
                >
                  <span className={`font-display text-[11px] tabular-nums ${isActive ? 'text-t-accent' : ''}`}>§{s.num}</span>
                  <span className="font-display text-[12px] uppercase tracking-[0.2em] flex-1">
                    {s.title}
                  </span>
                  {isActive && (
                    <span className="codex-blink text-t-accent text-xs leading-none">▌</span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>

        <div className="mt-8 px-3 py-3 border border-t-border bg-t-deep/40 rounded
          text-[10px] font-terminal uppercase tracking-[0.25em] text-t-muted leading-relaxed">
          <div className="text-t-accent-alt mb-1">// OPSEC</div>
          Pages marked ▲ incur code-split on first mount.
        </div>
      </div>
    </aside>
  )
}

/* ========================================================================== */
/* SECTION HEADER                                                              */
/* ========================================================================== */

function SectionHeader({ section }: { section: SectionDef }) {
  return (
    <div className="border-t border-t-border pt-6">
      <div className="flex items-start gap-6 flex-wrap">
        <div className="codex-section-num">{section.num}</div>
        <div className="flex-1 min-w-[220px] pt-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-display uppercase text-t-bright tracking-[0.15em] text-2xl lg:text-3xl">
              {section.title}
            </h2>
            <span className="px-2 py-0.5 border border-t-accent/40 bg-t-accent/10 text-t-accent
                            font-terminal text-[9px] uppercase tracking-[0.3em] rounded">
              {section.classification}
            </span>
            <span className="font-terminal text-[10px] uppercase tracking-[0.3em] text-t-muted">
              {section.specimens.length} specimen{section.specimens.length === 1 ? '' : 's'}
            </span>
          </div>
          <p className="text-sm text-t-text mt-2 max-w-xl leading-relaxed">{section.blurb}</p>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* SPECIMEN                                                                    */
/* ========================================================================== */

interface SpecimenMeta {
  title: string
  brief: string
  classification: string
  importPath: string
  deps?: string
  bundle?: string
  notes?: string
  demo: ReactNode
}

function Specimen({ code, index }: { code: string; index: string }) {
  const meta = SPECIMENS[code]
  if (!meta) return null

  return (
    <article className="grid grid-cols-1 md:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] gap-6 md:gap-10">
      {/* Left — dossier */}
      <div className="relative">
        <div className="flex items-baseline gap-3">
          <span className="codex-specimen-num">##{index}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="font-display text-lg uppercase tracking-[0.18em] text-t-bright">
            {meta.title}
          </span>
          <span className="px-1.5 py-0.5 border border-t-border text-[9px] font-terminal uppercase tracking-[0.25em] text-t-muted rounded">
            {meta.classification}
          </span>
        </div>

        <p className="text-xs text-t-text mt-4 leading-relaxed max-w-sm">{meta.brief}</p>

        <div className="mt-5 border-t border-dashed border-t-border pt-4">
          <DossierLine label="IMPORT" value={meta.importPath} mono />
          {meta.deps && <DossierLine label="DEPS" value={meta.deps} />}
          {meta.bundle && <DossierLine label="BUNDLE" value={meta.bundle} />}
          {meta.notes && <DossierLine label="NOTES" value={meta.notes} />}
        </div>
      </div>

      {/* Right — live demo */}
      <div className="relative">
        <DemoFrame>{meta.demo}</DemoFrame>
      </div>
    </article>
  )
}

function DossierLine({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 text-[10px] py-0.5">
      <span className="font-terminal uppercase tracking-[0.25em] text-t-muted">{label}</span>
      <span className={`${mono ? 'font-terminal' : ''} text-t-text break-all`}>{value}</span>
    </div>
  )
}

function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative group">
      {/* corner ticks */}
      <span aria-hidden className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-t-accent/70" />
      <span aria-hidden className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-t-accent/70" />
      <span aria-hidden className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-t-accent/70" />
      <span aria-hidden className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-t-accent/70" />
      <div className="relative bg-t-deep/40 border border-t-border rounded p-5 min-h-[180px]
        group-hover:border-t-accent/30 transition-colors">
        <div className="absolute top-1.5 right-2.5 font-terminal text-[9px] uppercase tracking-[0.25em] text-t-muted">
          <span className="text-t-accent-alt codex-blink">●</span> DEMO · LIVE
        </div>
        {children}
      </div>
    </div>
  )
}

function computeSpecimenIndex(section: SectionDef, idx: number): string {
  let count = 0
  for (const s of SECTIONS) {
    if (s.id === section.id) {
      count += idx + 1
      break
    }
    count += s.specimens.length
  }
  return String(count).padStart(2, '0')
}

/* ========================================================================== */
/* CODA                                                                        */
/* ========================================================================== */

function Coda() {
  return (
    <div className="border-t border-t-border pt-8 pb-16">
      <div className="font-terminal text-[11px] uppercase tracking-[0.3em] text-t-muted">
        <span className="text-t-accent-alt">//</span> END OF CATALOG
        <span className="codex-blink text-t-accent ml-1">▌</span>
      </div>
      <div className="mt-3 text-[10px] text-t-muted font-terminal tracking-wider">
        MATERIEL-CATALOG · CODEX-28 · PHASE-1 · DESKTOP-ONLY
      </div>
    </div>
  )
}

/* ========================================================================== */
/* COMMAND PALETTE                                                             */
/* ========================================================================== */

function GlobalCommandPalette({
  open, onOpenChange, onJump,
}: { open: boolean; onOpenChange: (v: boolean) => void; onJump: (id: string) => void }) {
  const items: CommandItem[] = useMemo(() => {
    const all: CommandItem[] = []
    for (const s of SECTIONS) {
      all.push({
        id: `sec-${s.id}`,
        label: `§${s.num} — ${s.title}`,
        description: s.blurb,
        icon: <ArrowRight className="w-full h-full" />,
        group: 'SECTIONS',
        keywords: [s.classification.toLowerCase()],
        onSelect: () => onJump(s.id),
      })
      s.specimens.forEach((name, i) => {
        const idx = computeSpecimenIndex(s, i)
        all.push({
          id: `spec-${name}`,
          label: `##${idx} ${SPECIMENS[name]?.title ?? name}`,
          description: SPECIMENS[name]?.brief ?? '',
          group: 'SPECIMENS',
          keywords: [s.title.toLowerCase(), name.toLowerCase()],
          onSelect: () => onJump(s.id),
        })
      })
    }
    return all
  }, [onJump])

  return <CommandPalette open={open} onOpenChange={onOpenChange} items={items} hotkey="mod+k" />
}

/* ========================================================================== */
/* UTILITIES                                                                   */
/* ========================================================================== */

function formatMissionClock(d: Date): string {
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  const ss = String(d.getUTCSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}Z`
}

function useTicker(data: number[], interval = 1500): number[] {
  const [series, setSeries] = useState(data)
  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1] ?? 50
        const drift = (Math.random() - 0.5) * 18
        const next = Math.max(8, Math.min(95, last + drift))
        return [...prev.slice(1), Number(next.toFixed(1))]
      })
    }, interval)
    return () => clearInterval(id)
  }, [interval])
  return series
}

/* ========================================================================== */
/* SPECIMEN DEFINITIONS                                                        */
/* ========================================================================== */

const SPECIMENS: Record<string, SpecimenMeta> = {
  GradientBorder: {
    title: 'GradientBorder',
    classification: 'SHELL',
    brief: 'Wraps any node with a soft radial-gradient trim. Use for emphasized panels, active states, or selection highlight.',
    importPath: "import { GradientBorder } from '@/components/library'",
    deps: 'react',
    demo: <GradientBorderDemo />,
  },
  Switch: {
    title: 'Switch',
    classification: 'TOGGLE',
    brief: 'Minimal on/off primitive. EVA-purple glow when engaged.',
    importPath: "import { Switch } from '@/components/library'",
    deps: 'react',
    demo: <SwitchDemo />,
  },
  SegmentedControl: {
    title: 'SegmentedControl',
    classification: 'SELECTOR',
    brief: 'Value-toggle for bounded choices. Not navigation — use Tabs for routing.',
    importPath: "import { SegmentedControl } from '@/components/library'",
    deps: 'react',
    demo: <SegmentedControlDemo />,
  },
  Tabs: {
    title: 'Tabs',
    classification: 'NAVIGATION',
    brief: 'Two visual variants: underline (default) and pill. Context-driven, controlled or uncontrolled.',
    importPath: "import { Tabs, TabList, Tab, TabPanel } from '@/components/library'",
    deps: 'react',
    demo: <TabsDemo />,
  },
  DropdownMenu: {
    title: 'DropdownMenu',
    classification: 'MENU',
    brief: 'Portaled, viewport-clamped floating menu. Items support icons, shortcuts, danger variant, disabled state.',
    importPath: "import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/library'",
    deps: 'react',
    demo: <DropdownDemo />,
  },

  MiniStatCard: {
    title: 'MiniStatCard',
    classification: 'STAT',
    brief: 'Dense inline stat tile — icon, label, value, optional delta. For grid layouts.',
    importPath: "import { MiniStatCard } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <MiniStatCardDemo />,
  },
  ComplexStatisticsCard: {
    title: 'ComplexStatisticsCard',
    classification: 'STAT',
    brief: 'Richer stat card with embedded Sparkline, delta w/ auto-color, and a secondary footer line.',
    importPath: "import { ComplexStatisticsCard } from '@/components/library'",
    deps: 'react, recharts',
    demo: <ComplexStatDemo />,
  },
  ControllerCard: {
    title: 'ControllerCard',
    classification: 'TILE',
    brief: 'On/off tile with icon + switch + description. Ideal for Proxmox LXCs, systemd services, feature flags.',
    importPath: "import { ControllerCard } from '@/components/library'",
    deps: 'react',
    demo: <ControllerCardDemo />,
  },
  MessageCard: {
    title: 'MessageCard',
    classification: 'ALERT',
    brief: 'Static alert card with variant, icon, timestamp, optional action + dismiss. Compose with ToastProvider for transient feedback.',
    importPath: "import { MessageCard } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <MessageCardDemo />,
  },
  EmptyState: {
    title: 'EmptyState',
    classification: 'FALLBACK',
    brief: 'Icon chip + title + description + CTA for empty collections. Three sizes.',
    importPath: "import { EmptyState } from '@/components/library'",
    deps: 'react',
    demo: <EmptyStateDemo />,
  },

  GradientProgress: {
    title: 'GradientProgress',
    classification: 'BAR',
    brief: 'Horizontal progress bar with gradient fill. "auto" accent color-codes by threshold (≥90 error, ≥75 warn, …).',
    importPath: "import { GradientProgress } from '@/components/library'",
    deps: 'react',
    demo: <GradientProgressDemo />,
  },
  RadialGauge: {
    title: 'RadialGauge',
    classification: 'GAUGE',
    brief: 'Half- or full-arc gauge. SVG-only, no deps. Auto-accent with configurable warn/danger thresholds.',
    importPath: "import { RadialGauge } from '@/components/library'",
    deps: 'react',
    demo: <RadialGaugeDemo />,
  },
  Sparkline: {
    title: 'Sparkline',
    classification: 'TRACE',
    brief: 'Minimal Recharts area/line. No axes, no legend, no tooltip — visual rhythm only.',
    importPath: "import { Sparkline } from '@/components/library'",
    deps: 'recharts',
    demo: <SparklineDemo />,
  },

  StatusPill: {
    title: 'StatusPill',
    classification: 'BADGE',
    brief: 'Rounded badge: ●LIVE / ●IDLE / ●ERROR / … Seven variants. Auto-pulse on live/active.',
    importPath: "import { StatusPill } from '@/components/library'",
    deps: 'react',
    demo: <StatusPillDemo />,
  },
  Skeleton: {
    title: 'Skeleton',
    classification: 'PLACEHOLDER',
    brief: 'Shimmer placeholders: text (multiline), rect, circle, card (full stat-card shape).',
    importPath: "import { Skeleton } from '@/components/library'",
    deps: 'react',
    demo: <SkeletonDemo />,
  },
  LogStream: {
    title: 'LogStream',
    classification: 'FEED',
    brief: 'Terminal-font log viewer. Pause-on-hover, auto-scroll, 5 severities, source tag. maxLines caps render.',
    importPath: "import { LogStream } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <LogStreamDemo />,
  },

  KeyValueList: {
    title: 'KeyValueList',
    classification: 'DETAIL',
    brief: 'dt/dd grid for metadata panels. mono flag swaps to IBM 3270 for IPs, hashes, UUIDs.',
    importPath: "import { KeyValueList, KeyValueRow } from '@/components/library'",
    deps: 'react',
    demo: <KVListDemo />,
  },
  DataTable: {
    title: 'DataTable',
    classification: 'GRID',
    brief: 'Generic-typed table. Column-level sort/accessor/cell/align/width. Sticky header, row-click handler, dense mode.',
    importPath: "import { DataTable } from '@/components/library'",
    deps: 'react, lucide-react',
    notes: 'No virtualization — fine up to ~2k rows',
    demo: <DataTableDemo />,
  },
  Pagination: {
    title: 'Pagination',
    classification: 'CONTROL',
    brief: 'DataTable companion. Ellipsis-aware token range, optional edge buttons, optional per-page selector + item counter.',
    importPath: "import { Pagination } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <PaginationDemo />,
  },

  Timeline: {
    title: 'Timeline',
    classification: 'HISTORY',
    brief: 'Vertical event rail. 7 colors. Icon + title + terminal-font timestamp + description + badges.',
    importPath: "import { Timeline, TimelineItem } from '@/components/library'",
    deps: 'react',
    demo: <TimelineDemo />,
  },
  Heatmap: {
    title: 'Heatmap',
    classification: 'DENSITY',
    brief: 'GitHub-style activity grid. Auto-aggregates duplicate dates. Configurable weeks, 5-step palette, future cells outlined.',
    importPath: "import { Heatmap } from '@/components/library'",
    deps: 'react',
    demo: <HeatmapDemo />,
  },

  Globe: {
    title: 'Globe',
    classification: 'TOPOLOGY',
    brief: 'Rotating three.js sphere with Fibonacci-distributed land dots. Marker spheres + ring halos at lat/lng. Auto-rotates.',
    importPath: "const Globe = lazy(() => import('@/components/library/Globe').then(m => ({ default: m.Globe })))",
    deps: 'three ≈ 600KB',
    bundle: '▲ lazy-load recommended',
    demo: <GlobeDemo />,
  },
  VectorMap: {
    title: 'VectorMap',
    classification: 'ATLAS',
    brief: 'Flat equirectangular world map via d3-geo + topojson. Country heat shading + lat/lng markers with halos.',
    importPath: "const VectorMap = lazy(() => import('@/components/library/VectorMap').then(m => ({ default: m.VectorMap })))",
    deps: 'd3-geo, topojson-client ≈ 45KB + runtime topojson fetch ≈ 60KB',
    bundle: '▲ lazy-load recommended',
    demo: <VectorMapDemo />,
  },

  Dialog: {
    title: 'Dialog',
    classification: 'MODAL',
    brief: 'Portal-rendered modal. Backdrop blur, ESC-close, scroll-lock, 4 sizes. Title/description/footer slots.',
    importPath: "import { Dialog } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <DialogDemo />,
  },
  Drawer: {
    title: 'Drawer',
    classification: 'PANEL',
    brief: 'Portal slide-in from any side. Transform-based animation, same close semantics as Dialog.',
    importPath: "import { Drawer } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <DrawerDemo />,
  },
  Tooltip: {
    title: 'Tooltip',
    classification: 'HINT',
    brief: 'Hover + focus triggered. Viewport-clamped positioning. 4 placements, configurable delay.',
    importPath: "import { Tooltip } from '@/components/library'",
    deps: 'react',
    demo: <TooltipDemo />,
  },
  Toast: {
    title: 'Toast',
    classification: 'TRANSIENT',
    brief: 'Stack of 4-variant notifications. Auto-dismiss, pause-on-hover, optional action, max-cap trimming.',
    importPath: "import { ToastProvider, useToast } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <ToastDemo />,
  },
  CommandPalette: {
    title: 'CommandPalette',
    classification: 'HOTKEY',
    brief: '⌘K search across anything. Groups, keyboard nav (↑↓ ↵ ⎋), custom filter. Page above wraps its own palette — try ⌘K.',
    importPath: "import { CommandPalette } from '@/components/library'",
    deps: 'react, lucide-react',
    demo: <CommandPaletteDemoNote />,
  },
}

/* ========================================================================== */
/* DEMO IMPLEMENTATIONS                                                        */
/* ========================================================================== */

function GradientBorderDemo() {
  return (
    <div className="flex gap-4 flex-wrap items-start">
      <GradientBorder borderRadius={10} style={{ display: 'block' }}>
        <div className="t-card px-5 py-4">
          <div className="font-display text-xs uppercase tracking-wider text-t-bright">DEFAULT</div>
          <div className="text-[11px] text-t-muted mt-1">Radial · purple→green</div>
        </div>
      </GradientBorder>
      <GradientBorder
        borderRadius={10}
        style={{ display: 'block' }}
        backgroundImage="linear-gradient(135deg, var(--color-t-accent-alt) 0%, var(--color-t-accent) 100%)"
      >
        <div className="t-card px-5 py-4">
          <div className="font-display text-xs uppercase tracking-wider text-t-bright">CUSTOM</div>
          <div className="text-[11px] text-t-muted mt-1">Linear · green→purple</div>
        </div>
      </GradientBorder>
    </div>
  )
}

function SwitchDemo() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className="flex items-center gap-8">
      <label className="flex items-center gap-3 cursor-pointer">
        <Switch checked={a} onChange={setA} label="polling" />
        <span className="font-terminal text-[11px] uppercase tracking-[0.25em] text-t-muted">POLLING · {a ? 'ON' : 'OFF'}</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Switch checked={b} onChange={setB} label="auto-heal" />
        <span className="font-terminal text-[11px] uppercase tracking-[0.25em] text-t-muted">AUTOHEAL · {b ? 'ON' : 'OFF'}</span>
      </label>
      <Switch checked={false} onChange={() => {}} disabled label="disabled" />
    </div>
  )
}

function SegmentedControlDemo() {
  const [range, setRange] = useState<'1H' | '24H' | '7D' | '30D'>('24H')
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        value={range}
        onChange={setRange}
        options={[
          { value: '1H', label: '1H' },
          { value: '24H', label: '24H' },
          { value: '7D', label: '7D' },
          { value: '30D', label: '30D' },
        ]}
      />
      <div className="font-terminal text-[11px] uppercase tracking-[0.25em] text-t-muted">
        SELECTED · {range}
      </div>
    </div>
  )
}

function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview" icon={<Activity className="w-full h-full" />}>Overview</Tab>
        <Tab value="logs" icon={<Terminal className="w-full h-full" />}>Logs</Tab>
        <Tab value="config" icon={<Settings className="w-full h-full" />}>Config</Tab>
      </TabList>
      <TabPanel value="overview" className="pt-4">
        <div className="text-xs text-t-text">Uptime 14d 02:31 · Load 0.42 · Memory 4.8/16GB</div>
      </TabPanel>
      <TabPanel value="logs" className="pt-4">
        <div className="text-xs text-t-text font-terminal">13:04:21 INF service ready</div>
      </TabPanel>
      <TabPanel value="config" className="pt-4">
        <div className="text-xs text-t-text">22 values loaded from /etc/service/env</div>
      </TabPanel>
    </Tabs>
  )
}

function DropdownDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded
            border border-t-border bg-t-surface
            font-display text-xs uppercase tracking-wider text-t-bright
            hover:border-t-accent/60 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Container Actions
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>vm-101 · runtime-01</DropdownMenuLabel>
        <DropdownMenuItem icon={<Power className="w-full h-full" />} shortcut="⌘R">Restart</DropdownMenuItem>
        <DropdownMenuItem icon={<Terminal className="w-full h-full" />} shortcut="⌘T">Open shell</DropdownMenuItem>
        <DropdownMenuItem icon={<Rocket className="w-full h-full" />} disabled>Migrate (locked)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 className="w-full h-full" />} variant="danger">Destroy</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MiniStatCardDemo() {
  const cpu = useTicker([28, 32, 40, 36, 44, 52, 48, 50, 42])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <MiniStatCard label="CPU" value={cpu[cpu.length - 1].toFixed(0)} unit="%" accent="purple" delta={-4} icon={<Cpu className="w-full h-full" />} />
      <MiniStatCard label="Memory" value="8.4" unit="GB" accent="info" delta={2} icon={<Database className="w-full h-full" />} />
      <MiniStatCard label="Disk" value="62" unit="%" accent="warning" delta={0} icon={<HardDrive className="w-full h-full" />} />
      <MiniStatCard label="GPU" value="72" unit="°C" accent="error" delta={8} icon={<Flame className="w-full h-full" />} />
    </div>
  )
}

function ComplexStatDemo() {
  const trend = useTicker([45, 50, 62, 58, 64, 71, 68, 75, 70, 78, 74, 80])
  return (
    <ComplexStatisticsCard
      title="GPU Utilization"
      value={trend[trend.length - 1].toFixed(0)}
      unit="%"
      icon={<Cpu className="w-5 h-5" />}
      accent="purple"
      delta={{ value: 12, label: 'vs 5m ago' }}
      secondary="Updated 4s ago"
      trend={trend}
    />
  )
}

function ControllerCardDemo() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  const [c, setC] = useState(true)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <ControllerCard title="runtime-01" description="container · llm" icon={<Box className="w-7 h-7" />} state={a} onChange={setA} accent="purple" />
      <ControllerCard title="worker-02" description="docker · 8790" icon={<Bot className="w-7 h-7" />} state={b} onChange={setB} accent="green" />
      <ControllerCard title="metrics" description="systemd · 8780" icon={<Signal className="w-7 h-7" />} state={c} onChange={setC} accent="info" />
    </div>
  )
}

function MessageCardDemo() {
  return (
    <div className="space-y-3">
      <MessageCard
        variant="warning"
        icon={<AlertTriangle className="w-4 h-4" />}
        title="Service degraded"
        description="Two of three heartbeats missed in the last 90s. Circuit-breaker will trip at 3 misses."
        timestamp="14:02:18 · node-alpha"
        action={{ label: 'Acknowledge', onClick: () => {} }}
        onDismiss={() => {}}
      />
      <MessageCard
        variant="success"
        icon={<CheckCircle2 className="w-4 h-4" />}
        title="Deploy complete"
        description="build@abc1234 rolled out to edge. 0 errors, 2.4s TTFB."
        timestamp="14:04:55"
      />
    </div>
  )
}

function EmptyStateDemo() {
  return (
    <EmptyState
      size="sm"
      icon={<Radio className="w-6 h-6" />}
      title="No runners online"
      description="Dispatch an environment from CC-Dispatch to begin claiming queued tasks."
      action={{ label: 'Open Dispatch', onClick: () => {} }}
      secondaryAction={{ label: 'Docs', onClick: () => {} }}
    />
  )
}

function GradientProgressDemo() {
  const cpu = useTicker([45, 50, 55, 60, 58, 65, 70, 68, 72, 80], 1200)
  return (
    <div className="space-y-4">
      <GradientProgress label="CPU · node-alpha" value={cpu[cpu.length - 1]} accent="auto" />
      <GradientProgress label="Memory" value={58} accent="purple" />
      <GradientProgress label="Disk · /data" value={82} accent="auto" />
      <GradientProgress label="VRAM · GPU0" value={94} accent="auto" size="lg" />
    </div>
  )
}

function RadialGaugeDemo() {
  const temp = useTicker([62, 65, 68, 71, 74, 72, 75, 78, 76])
  const load = useTicker([0.2, 0.3, 0.4, 0.35, 0.5, 0.6, 0.45, 0.5])
  return (
    <div className="flex items-start gap-8 flex-wrap">
      <RadialGauge
        value={temp[temp.length - 1]}
        max={100}
        label="GPU Temp"
        unit="°C"
        accent="auto"
        thresholds={{ warn: 70, danger: 85 }}
      />
      <RadialGauge
        value={Number((load[load.length - 1] * 100).toFixed(0))}
        max={100}
        label="Load"
        unit="%"
        arc="full"
        size={120}
        accent="purple"
      />
    </div>
  )
}

function SparklineDemo() {
  const a = useTicker([20, 25, 22, 30, 28, 35, 40, 38, 42, 45])
  const b = useTicker([60, 55, 58, 52, 50, 48, 52, 55, 50, 45])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="t-card p-3">
        <div className="text-[10px] uppercase tracking-wider text-t-muted font-terminal mb-1">INGRESS</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg text-t-accent">{a[a.length - 1].toFixed(0)}</span>
          <span className="text-[10px] text-t-muted">req/s</span>
        </div>
        <Sparkline data={a} height={40} />
      </div>
      <div className="t-card p-3">
        <div className="text-[10px] uppercase tracking-wider text-t-muted font-terminal mb-1">LATENCY</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg text-t-accent-alt">{b[b.length - 1].toFixed(0)}</span>
          <span className="text-[10px] text-t-muted">ms</span>
        </div>
        <Sparkline data={b} color="var(--color-t-accent-alt)" height={40} />
      </div>
    </div>
  )
}

function StatusPillDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusPill variant="live" />
      <StatusPill variant="active" />
      <StatusPill variant="idle" />
      <StatusPill variant="warning" />
      <StatusPill variant="error" />
      <StatusPill variant="info" />
      <StatusPill variant="offline" />
      <StatusPill variant="live" label="HEARTBEAT" size="md" />
    </div>
  )
}

function SkeletonDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Skeleton variant="text" lines={4} />
      <Skeleton variant="card" />
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={44} />
        <div className="flex-1">
          <Skeleton variant="rect" height={10} className="mb-2" />
          <Skeleton variant="rect" height={10} width="60%" />
        </div>
      </div>
      <Skeleton variant="rect" height={64} />
    </div>
  )
}

function LogStreamDemo() {
  const [lines, setLines] = useState<LogLine[]>(() => seedLogs())
  useEffect(() => {
    const id = setInterval(() => {
      setLines((prev) => [...prev, synthLogLine(prev.length)].slice(-80))
    }, 1100)
    return () => clearInterval(id)
  }, [])
  return (
    <LogStream lines={lines} title="node-alpha · journalctl" height={260} onClear={() => setLines([])} />
  )
}

function KVListDemo() {
  return (
    <div className="t-card p-5">
      <div className="font-display text-xs uppercase tracking-wider text-t-bright mb-4">
        VM-101 · RUNTIME-01
      </div>
      <KeyValueList dense>
        <KeyValueRow label="Host" mono dense>10.0.1.42</KeyValueRow>
        <KeyValueRow label="RAM" dense>16 GB</KeyValueRow>
        <KeyValueRow label="vCPU" dense>8</KeyValueRow>
        <KeyValueRow label="Image" dense>runtime:3b-q4</KeyValueRow>
        <KeyValueRow label="Uptime" mono dense>04d 11:22:08</KeyValueRow>
        <KeyValueRow label="Status" dense>
          <StatusPill variant="live" />
        </KeyValueRow>
      </KeyValueList>
    </div>
  )
}

interface ContainerRow {
  name: string
  host: string
  cpu: number
  mem: number
  status: 'live' | 'idle' | 'error'
}
const DATA_ROWS: ContainerRow[] = [
  { name: 'runtime-01',  host: '10.0.1.42',  cpu: 42, mem: 68, status: 'live' },
  { name: 'worker-02',   host: '10.0.0.42',  cpu: 12, mem: 24, status: 'idle' },
  { name: 'worker-01',   host: '10.0.0.42',  cpu: 58, mem: 42, status: 'live' },
  { name: 'frontend',    host: '10.0.0.42',  cpu: 4,  mem: 8,  status: 'idle' },
  { name: 'inference',   host: '10.0.0.42',  cpu: 91, mem: 96, status: 'error' },
]
const DATA_COLS: DataTableColumn<ContainerRow>[] = [
  { key: 'name',   header: 'SERVICE', accessor: (r) => r.name, sortable: true,
    cell: (r) => <span className="font-display uppercase tracking-wider text-t-bright">{r.name}</span> },
  { key: 'host',   header: 'HOST', accessor: (r) => r.host, sortable: true,
    cell: (r) => <span className="font-terminal text-t-text">{r.host}</span> },
  { key: 'cpu',    header: 'CPU', accessor: (r) => r.cpu, sortable: true, align: 'right',
    cell: (r) => <span className="font-terminal text-t-bright">{r.cpu}%</span> },
  { key: 'mem',    header: 'MEM', accessor: (r) => r.mem, sortable: true, align: 'right',
    cell: (r) => <span className="font-terminal text-t-bright">{r.mem}%</span> },
  { key: 'status', header: 'STATE', align: 'right',
    cell: (r) => <StatusPill variant={r.status} /> },
]
function DataTableDemo() {
  return <DataTable data={DATA_ROWS} columns={DATA_COLS} rowKey={(r) => r.name} dense />
}

function PaginationDemo() {
  const [page, setPage] = useState(3)
  return (
    <Pagination
      page={page}
      pageCount={12}
      onPageChange={setPage}
      totalItems={586}
      pageSize={50}
      showPageSize
      onPageSizeChange={() => {}}
    />
  )
}

function TimelineDemo() {
  return (
    <Timeline title="Recent Events">
      <TimelineItem
        color="green"
        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
        title="deployment completed"
        dateTime="2026-04-19 14:04"
        description="build@abc1234 · 33 files · +3322 insertions"
        badges={['EDGE', 'PROD']}
      />
      <TimelineItem
        color="purple"
        icon={<GitBranch className="w-3.5 h-3.5" />}
        title="merged /feature/status-overhaul"
        dateTime="2026-04-02 09:11"
        description="PR #6 — 6-status model rolled out"
      />
      <TimelineItem
        color="warning"
        icon={<AlertTriangle className="w-3.5 h-3.5" />}
        title="batch job kicked off"
        dateTime="2026-03-27 23:40"
        description="Estimated 2-day runtime on runtime-01"
      />
      <TimelineItem
        color="info"
        icon={<Rocket className="w-3.5 h-3.5" />}
        title="schema migration"
        dateTime="2026-03-14 18:22"
        lastItem
      />
    </Timeline>
  )
}

function HeatmapDemo() {
  const data = useMemo(() => {
    const out: { date: string; value: number }[] = []
    const end = new Date()
    for (let i = 0; i < 26 * 7; i++) {
      const d = new Date(end)
      d.setDate(end.getDate() - i)
      const rand = Math.random()
      const v = rand < 0.55 ? 0 : Math.floor(rand * 12)
      if (v > 0) out.push({ date: d.toISOString(), value: v })
    }
    return out
  }, [])
  return <Heatmap data={data} weeks={26} title="Task completions · last 26 weeks" accent="purple" />
}

function GlobeDemo() {
  const markers = useMemo(() => ([
    { lat: 42.3601, lng: -71.0589, label: 'node-alpha', color: 'var(--color-t-accent)' },
    { lat: 37.7749, lng: -122.4194, label: 'edge-sf' },
    { lat: 51.5074, lng: -0.1278,   label: 'edge-lon' },
    { lat: 35.6762, lng: 139.6503,  label: 'edge-tok' },
    { lat: -33.8688, lng: 151.2093, label: 'edge-syd' },
  ]), [])
  return (
    <div className="h-[360px]">
      <Suspense fallback={<LazyFallback label="LOADING GLOBE · three.js" />}>
        <Globe markers={markers} />
      </Suspense>
    </div>
  )
}

function VectorMapDemo() {
  const markers = useMemo(() => ([
    { lat: 42.3601, lng: -71.0589, label: 'node-alpha', color: 'var(--color-t-accent-alt)' },
    { lat: 37.7749, lng: -122.4194, label: 'edge-sf' },
    { lat: 51.5074, lng: -0.1278,   label: 'edge-lon' },
    { lat: 35.6762, lng: 139.6503,  label: 'edge-tok' },
    { lat: -33.8688, lng: 151.2093, label: 'edge-syd' },
  ]), [])
  return (
    <div className="h-[320px]">
      <Suspense fallback={<LazyFallback label="LOADING ATLAS · topojson" />}>
        <VectorMap markers={markers} />
      </Suspense>
    </div>
  )
}

function LazyFallback({ label }: { label: string }) {
  return (
    <div className="h-full t-card flex flex-col items-center justify-center gap-3">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-t-accent animate-pulse" />
        <span className="w-1.5 h-1.5 rounded-full bg-t-accent animate-pulse" style={{ animationDelay: '0.15s' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-t-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
      </div>
      <div className="font-terminal text-[10px] uppercase tracking-[0.3em] text-t-muted">{label}</div>
    </div>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <DemoButton onClick={() => setOpen(true)}>Open Dialog</DemoButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Container Destroy"
        description="This action cannot be reversed."
        footer={
          <>
            <DemoButton onClick={() => setOpen(false)} variant="ghost">Cancel</DemoButton>
            <DemoButton onClick={() => setOpen(false)} variant="danger">Destroy</DemoButton>
          </>
        }
      >
        <div className="text-sm text-t-text leading-relaxed">
          VM-101 <span className="font-terminal text-t-bright">runtime-01</span> will be stopped,
          its rootfs unmounted, and its allocation reclaimed. Any persistent volumes remain.
        </div>
        <div className="mt-4 t-card p-3">
          <KeyValueList dense>
            <KeyValueRow label="Host" mono dense>10.0.1.42</KeyValueRow>
            <KeyValueRow label="Uptime" mono dense>04d 11:22:08</KeyValueRow>
            <KeyValueRow label="Backup" dense>2026-04-18 03:00 UTC</KeyValueRow>
          </KeyValueList>
        </div>
      </Dialog>
    </>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <DemoButton onClick={() => setOpen(true)}>Open Drawer</DemoButton>
      <Drawer open={open} onClose={() => setOpen(false)} title="Specimen Details" side="right" size={420}>
        <div className="space-y-4">
          <div className="text-xs text-t-text leading-relaxed">
            Drawers share the Dialog's backdrop and scroll-lock plumbing. In Phase 3 this same
            component will serve as the mobile sidebar — one pattern, no duplication.
          </div>
          <MessageCard
            variant="purple"
            title="Phase 3 primitive"
            description="Reused for mobile nav drawer under md breakpoint"
            icon={<Sparkles className="w-4 h-4" />}
          />
          <KeyValueList>
            <KeyValueRow label="Side">right</KeyValueRow>
            <KeyValueRow label="Size" mono>420px</KeyValueRow>
            <KeyValueRow label="Escape">closes</KeyValueRow>
          </KeyValueList>
        </div>
      </Drawer>
    </>
  )
}

function TooltipDemo() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {(['top', 'right', 'bottom', 'left'] as const).map((p) => (
        <Tooltip key={p} content={`Placement: ${p}`} placement={p}>
          <button className="px-3 py-2 t-card text-xs font-display uppercase tracking-wider text-t-bright hover:border-t-accent/60 transition-colors">
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
  )
}

function ToastDemo() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      <DemoButton onClick={() => toast.push({ title: 'Claim acquired', description: 'worker-01 claimed task tk_0x9af', variant: 'success' })}>
        <CheckCircle2 className="w-3.5 h-3.5" /> Success
      </DemoButton>
      <DemoButton onClick={() => toast.push({ title: 'Heartbeat late', description: 'service heartbeat missed — retrying', variant: 'warning' })}>
        <AlertTriangle className="w-3.5 h-3.5" /> Warning
      </DemoButton>
      <DemoButton onClick={() => toast.push({ title: 'Deploy failed', description: 'bundle-size check failed: 1.32MB > 1.30MB ceiling', variant: 'error', action: { label: 'Logs', onClick: () => {} } })}>
        <AlertCircle className="w-3.5 h-3.5" /> Error
      </DemoButton>
      <DemoButton onClick={() => toast.push({ title: 'Synced', description: 'Index rebuilt (586 items)', variant: 'info' })}>
        <Info className="w-3.5 h-3.5" /> Info
      </DemoButton>
    </div>
  )
}

function CommandPaletteDemoNote() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm text-t-text">
        The palette at the top of this page is the live specimen. Try it:
      </div>
      <kbd className="self-start font-terminal text-[11px] uppercase tracking-[0.25em] text-t-muted px-2.5 py-1 border border-t-border rounded">
        ⌘ / Ctrl + K
      </kbd>
      <div className="text-xs text-t-muted mt-1">
        Populated with all 9 sections and 28 specimens. Enter jumps; hover updates the highlight.
      </div>
    </div>
  )
}

function DemoButton({
  children, onClick, variant = 'default',
}: { children: ReactNode; onClick: () => void; variant?: 'default' | 'ghost' | 'danger' }) {
  const base = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded font-display text-xs uppercase tracking-wider transition-colors border cursor-pointer'
  const variants = {
    default: 'bg-t-accent/20 border-t-accent/50 text-t-bright hover:bg-t-accent/30 shadow-[0_0_10px_var(--color-t-accent-glow)]',
    ghost: 'border-t-border text-t-text hover:text-t-bright hover:bg-t-hover',
    danger: 'bg-t-error/20 border-t-error/50 text-t-bright hover:bg-t-error/30',
  }
  return <button type="button" onClick={onClick} className={`${base} ${variants[variant]}`}>{children}</button>
}

/* ========================================================================== */
/* LOG SYNTHESIS                                                               */
/* ========================================================================== */

const LOG_SOURCES = ['api', 'scheduler', 'worker-01', 'runtime', 'service-01', 'gateway']
const LOG_MESSAGES: { sev: LogLine['severity']; msg: string }[] = [
  { sev: 'info', msg: 'heartbeat ok · latency=12ms' },
  { sev: 'info', msg: 'polling /tasks · 86 rows' },
  { sev: 'success', msg: 'job tk_0x9af claimed by worker-01' },
  { sev: 'debug', msg: 'cache hit: context/latest' },
  { sev: 'warn', msg: 'heartbeat late: 7.2s since last' },
  { sev: 'info', msg: 'gpu0 mem_used=8.4GB util=58%' },
  { sev: 'error', msg: 'tunnel: 502 from origin (retrying)' },
  { sev: 'success', msg: 'rolled out build@abc1234 · 0 errors' },
  { sev: 'info', msg: 'snapshot complete: vm-101 · 1.2GB' },
  { sev: 'debug', msg: 'scheduler tick #488' },
]

function synthLogLine(i: number): LogLine {
  const src = LOG_SOURCES[Math.floor(Math.random() * LOG_SOURCES.length)]
  const m = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]
  return { id: `l-${Date.now()}-${i}`, ts: new Date(), severity: m.sev, source: src, message: m.msg }
}

function seedLogs(): LogLine[] {
  const base = Date.now() - 10_000
  return Array.from({ length: 10 }).map((_, i) => {
    const m = LOG_MESSAGES[i % LOG_MESSAGES.length]
    return {
      id: `seed-${i}`,
      ts: new Date(base + i * 1000),
      severity: m.sev,
      source: LOG_SOURCES[i % LOG_SOURCES.length],
      message: m.msg,
    }
  })
}

