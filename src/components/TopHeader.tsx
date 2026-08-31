import { IconSearch, IconBot, IconShare, IconBell, IconMenu } from './icons'

export default function TopHeader({
  onOpenAI,
  onOpenShare,
  onNavigateToBookings,
  onToggleMobileMenu
}: {
  onOpenAI: () => void
  onOpenShare: () => void
  onNavigateToBookings: () => void
  onToggleMobileMenu?: () => void
}) {
  return (
    <header className="h-[58px] md:h-[62px] bg-white border-b border-slate-100 flex items-center px-4 sm:px-6 md:px-8 gap-2.5 sm:gap-4 flex-shrink-0 z-10 select-none">
      
      {/* Mobile Hamburger & Brand */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
          title="Open menu & trips"
          aria-label="Open menu"
        >
          <IconMenu size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xs">
            <span className="text-white text-xs font-black">W</span>
          </div>
          <span className="font-extrabold text-slate-900 text-[14px] tracking-tight">Wayfarer</span>
        </div>
      </div>

      {/* Quick Search (Desktop / Tablet) */}
      <div className="flex-1 max-w-[340px] relative hidden md:block">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <IconSearch size={15} />
        </div>
        <input
          type="text"
          placeholder="Search itinerary, bookings, squad..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Right Header Widgets */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Weather Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-900">
          <span className="text-sm sm:text-base">☀️</span>
          <div>
            <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
              <span>28°C</span> <span className="text-[10px] text-amber-700 font-medium hidden xs:inline">Rome</span>
            </div>
            <div className="text-[9px] text-amber-600 font-medium hidden md:block">Sunny · UV 7</div>
          </div>
        </div>

        {/* Live Fare Alert (Desktop) */}
        <button
          onClick={onNavigateToBookings}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <div className="text-[11px] font-bold leading-tight">Live Pricing Active</div>
            <div className="text-[9px] text-emerald-600">Flights down 9.4%</div>
          </div>
        </button>

        {/* Unified Ask Wayfarer AI Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-[11px] sm:text-[12px] font-bold shadow-xs hover:opacity-95 transition-all cursor-pointer flex-shrink-0"
        >
          <IconBot size={14} color="white" />
          <span className="hidden xs:inline">Ask Wayfarer</span>
          <span className="xs:hidden">AI</span>
        </button>

        {/* Share Trip */}
        <button
          onClick={onOpenShare}
          className="p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Share Trip & Accessibility"
        >
          <IconShare size={15} />
        </button>

        {/* Notification Bell */}
        <div
          onClick={onNavigateToBookings}
          className="relative p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
          title="1 pending notification"
        >
          <IconBell size={15} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
        </div>
      </div>
    </header>
  )
}
