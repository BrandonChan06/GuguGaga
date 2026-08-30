import { IconSearch, IconSparkles, IconShare, IconBell } from './icons'

export default function TopHeader({
  onOpenAI,
  onOpenShare,
  onNavigateToBookings
}: {
  onOpenAI: () => void
  onOpenShare: () => void
  onNavigateToBookings: () => void
}) {
  return (
    <header className="h-[62px] bg-white border-b border-slate-100 flex items-center px-8 gap-4 flex-shrink-0 z-10 select-none">
      {/* Quick Search */}
      <div className="flex-1 max-w-[380px] relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <IconSearch size={15} />
        </div>
        <input type="text" placeholder="Search activities, flights, receipts, voting..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      {/* Right Header Widgets */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Multi-day Weather Widget */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900">
          <span className="text-lg">☀️</span>
          <div>
            <div className="text-[12px] font-bold leading-tight flex items-center gap-1">
              <span>28°C</span> <span className="text-[10px] text-amber-700 font-medium">Rome, Italy</span>
            </div>
            <div className="text-[10px] text-amber-600 font-medium">Sunny · High UV 7 · Dry</div>
          </div>
        </div>

        {/* Live Pricing Alert */}
        <button onClick={onNavigateToBookings}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <div className="text-[11px] font-bold leading-tight">Live Pricing Active</div>
            <div className="text-[9px] text-emerald-600">Flights dropped 9.4%</div>
          </div>
        </button>

        {/* AI Assistant Button */}
        <button onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[12px] font-bold shadow-sm shadow-blue-500/20 hover:opacity-95 transition-all">
          <IconSparkles size={13} color="white" />
          <span>AI Trip Concierge</span>
        </button>

        {/* Share Trip */}
        <button onClick={onOpenShare}
          className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors" title="Share Trip">
          <IconShare size={16} />
        </button>

        {/* Notification Bell */}
        <div className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
          <IconBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </div>
      </div>
    </header>
  )
}
