import { useParams } from 'react-router-dom'
import { ThemeCard } from '@/components/ui/ThemeCard'

/**
 * Route map: translates URL slugs to display labels and breadcrumb sections.
 */
const routeMap: Record<string, { title: string; section: string }> = {
  // Top Nav 1
  'top/1-1': { title: 'Sub Item 1.1', section: 'Top Nav 1' },
  'top/1-2': { title: 'Sub Item 1.2', section: 'Top Nav 1' },
  'top/1-3': { title: 'Sub Item 1.3', section: 'Top Nav 1' },
  // Top Nav 2
  'top/2-1': { title: 'Sub Item 2.1', section: 'Top Nav 2' },
  'top/2-2': { title: 'Sub Item 2.2', section: 'Top Nav 2' },
  // Top Nav 3 (direct link)
  'top/3': { title: 'Top Nav 3', section: 'Top Nav' },
  // Side Nav 1
  'side/1-1': { title: 'Sub Item 1.1', section: 'Side Nav 1' },
  'side/1-2': { title: 'Sub Item 1.2', section: 'Side Nav 1' },
  'side/1-3': { title: 'Sub Item 1.3', section: 'Side Nav 1' },
  // Side Nav 2
  'side/2-1': { title: 'Sub Item 2.1', section: 'Side Nav 2' },
  'side/2-2': { title: 'Sub Item 2.2', section: 'Side Nav 2' },
  // Side Nav 3
  'side/3-1': { title: 'Sub Item 3.1', section: 'Side Nav 3' },
  'side/3-2': { title: 'Sub Item 3.2', section: 'Side Nav 3' },
}

export function PlaceholderPage() {
  const { area, slug } = useParams<{ area: string; slug: string }>()
  const key = `${area}/${slug}`
  const route = routeMap[key]

  const title = route?.title ?? slug ?? 'Unknown Page'
  const section = route?.section ?? area ?? 'Navigation'

  return (
    <div>
      <h1 className="font-display text-t-bright text-xl mb-1">{title}</h1>
      <p className="text-t-muted text-sm mb-6">
        {section} / {title}
      </p>

      <ThemeCard>
        <h3 className="text-t-bright text-sm mb-2">{title}</h3>
        <p className="text-t-muted text-xs">
          This is a placeholder page for the <strong className="text-t-text">{title}</strong> route
          under <strong className="text-t-text">{section}</strong>. Replace this content with real
          functionality when ready.
        </p>
      </ThemeCard>
    </div>
  )
}
