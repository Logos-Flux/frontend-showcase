import { useState, useEffect, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { GlobalPalette } from './GlobalPalette'
import { SiteSwitchBar } from './SiteSwitchBar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  return (
    <div className="flex h-dvh bg-t-deep">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <SiteSwitchBar />
        <TopNav onMenuToggle={toggleSidebar} onPaletteOpen={() => setPaletteOpen(true)} />
        <main className="flex-1 overflow-y-auto t-bg-pattern flex flex-col">
          <div className="p-4 md:p-6 relative z-[1] flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <GlobalPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  )
}
