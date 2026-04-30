import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { DesignSpecs } from '@/pages/DesignSpecs'
import { ToastProvider } from '@/components/library/Toast'

const LibraryShowcase = lazy(() =>
  import('@/showcase/LibraryShowcase').then((m) => ({ default: m.LibraryShowcase })),
)

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/showcase" replace />} />
            <Route
              path="/showcase"
              element={
                <Suspense fallback={<div className="p-8 text-t-muted">Loading…</div>}>
                  <LibraryShowcase />
                </Suspense>
              }
            />
            <Route path="/design-specs" element={<DesignSpecs />} />
            <Route path="/design-specs/:slug" element={<DesignSpecs />} />
            <Route path="/:area/:slug" element={<PlaceholderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
