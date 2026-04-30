export function Footer() {
  return (
    <footer className="border-t border-t-border bg-t-surface/60 backdrop-blur-sm">
      <div className="px-6 py-5 flex flex-col sm:flex-row justify-between gap-6">
        {/* Branding */}
        <div>
          <div className="font-display text-t-accent text-sm font-bold mb-1">
            LOGO
          </div>
          <p className="text-t-muted text-xs">
            Tagline or description goes here.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex gap-10">
          <div>
            <h4 className="text-[10px] uppercase tracking-[1px] text-t-muted mb-2 font-semibold">
              Links
            </h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-t-text text-xs hover:text-t-bright transition-colors">Link 1</a></li>
              <li><a href="#" className="text-t-text text-xs hover:text-t-bright transition-colors">Link 2</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[1px] text-t-muted mb-2 font-semibold">
              More
            </h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-t-text text-xs hover:text-t-bright transition-colors">Link 3</a></li>
              <li><a href="#" className="text-t-text text-xs hover:text-t-bright transition-colors">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="px-6 py-3 border-t border-t-border/30">
        <p className="text-t-muted text-[10px]">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
