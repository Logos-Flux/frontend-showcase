// Note: this component fetches world-atlas topojson on mount (cached by the
// browser after first load). That keeps the ~60KB map data out of the main
// bundle, but the d3-geo/topojson-client imports add ~45KB when VectorMap is
// actually used. Wrap with React.lazy when mounting on a real panel.
import { useEffect, useMemo, useRef, useState } from 'react'
import { geoEquirectangular, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'

export interface VectorMapMarker {
  lat: number
  lng: number
  label?: string
  value?: number
  color?: string
  size?: number
}

interface VectorMapProps {
  markers?: VectorMapMarker[]
  heat?: Record<string, number>
  width?: number | string
  height?: number
  topoUrl?: string
  landColor?: string
  strokeColor?: string
  markerColor?: string
  heatAccent?: 'purple' | 'green' | 'info'
  onMarkerClick?: (marker: VectorMapMarker) => void
  className?: string
}

const DEFAULT_TOPO = 'https://unpkg.com/world-atlas@2/countries-110m.json'

const heatPalettes = {
  purple: ['rgba(123,47,190,0.15)', 'rgba(123,47,190,0.35)', 'rgba(123,47,190,0.6)', 'rgba(123,47,190,0.85)'],
  green: ['rgba(1,255,112,0.12)', 'rgba(1,255,112,0.3)', 'rgba(1,255,112,0.55)', 'rgba(1,255,112,0.8)'],
  info: ['rgba(0,117,255,0.15)', 'rgba(0,117,255,0.35)', 'rgba(0,117,255,0.6)', 'rgba(0,117,255,0.85)'],
} as const

type LandFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }> & { id?: string | number }

let topoCache: Map<string, Promise<Topology>> = new Map()
function loadTopo(url: string): Promise<Topology> {
  const cached = topoCache.get(url)
  if (cached) return cached
  const p = fetch(url).then((r) => r.json() as Promise<Topology>)
  topoCache.set(url, p)
  return p
}

export function VectorMap({
  markers = [],
  heat,
  width = '100%',
  height = 340,
  topoUrl = DEFAULT_TOPO,
  landColor = 'var(--color-t-hover)',
  strokeColor = 'var(--color-t-border)',
  markerColor = 'var(--color-t-accent)',
  heatAccent = 'purple',
  onMarkerClick,
  className = '',
}: VectorMapProps) {
  const [features, setFeatures] = useState<LandFeature[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 960, h: 480 })

  useEffect(() => {
    let cancelled = false
    loadTopo(topoUrl)
      .then((topo) => {
        if (cancelled) return
        const key = Object.keys(topo.objects)[0]
        const fc = feature(topo, topo.objects[key]) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name?: string }>
        setFeatures(fc.features as LandFeature[])
      })
      .catch(() => {/* offline or blocked — silently fall back to marker-only */})
    return () => {
      cancelled = true
    }
  }, [topoUrl])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { projection, pathGen } = useMemo(() => {
    const proj = geoEquirectangular().fitSize([size.w, size.h], {
      type: 'Sphere',
    } as GeoPermissibleObjects)
    return { projection: proj, pathGen: geoPath(proj) }
  }, [size])

  const palette = heatPalettes[heatAccent]
  const heatMax = useMemo(() => {
    if (!heat) return 0
    return Math.max(0, ...Object.values(heat))
  }, [heat])

  const colorForFeature = (f: LandFeature): string => {
    if (!heat || !heatMax) return landColor
    const k = (f.id ?? f.properties?.name ?? '').toString()
    const v = heat[k]
    if (!v) return landColor
    const ratio = v / heatMax
    if (ratio > 0.75) return palette[3]
    if (ratio > 0.5) return palette[2]
    if (ratio > 0.25) return palette[1]
    return palette[0]
  }

  return (
    <div
      ref={containerRef}
      className={`t-card overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`}>
        <rect width={size.w} height={size.h} fill="transparent" />
        {features.map((f, i) => (
          <path
            key={(f.id ?? i).toString()}
            d={pathGen(f) ?? undefined}
            fill={colorForFeature(f)}
            stroke={strokeColor}
            strokeWidth={0.5}
          >
            {f.properties?.name && <title>{f.properties.name}</title>}
          </path>
        ))}
        {markers.map((m, i) => {
          const pt = projection([m.lng, m.lat])
          if (!pt) return null
          const [x, y] = pt
          const r = m.size ?? 4
          const color = m.color ?? markerColor
          return (
            <g
              key={`${m.label ?? i}-${i}`}
              onClick={onMarkerClick ? () => onMarkerClick(m) : undefined}
              style={{ cursor: onMarkerClick ? 'pointer' : undefined }}
            >
              <circle cx={x} cy={y} r={r * 2.5} fill={color} opacity={0.2} />
              <circle cx={x} cy={y} r={r} fill={color}>
                <title>{m.label ?? `${m.lat.toFixed(2)}, ${m.lng.toFixed(2)}`}</title>
              </circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
