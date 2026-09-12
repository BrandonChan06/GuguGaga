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
    <header className="h-[58px] md:h-[62px] bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC] flex items-center px-4 sm:px-6 md:px-8 gap-2.5 sm:gap-4 flex-shrink-0 z-10 select-none">
      
      {/* Mobile Hamburger & Brand */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl text-[#5C554B] hover:bg-[#EFE9E0] active:bg-[#E5DDCF] transition-colors cursor-pointer"
          title="Open menu & trips"
          aria-label="Open menu"
        >
          <IconMenu size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#182B49] text-[#FAF8F5] flex items-center justify-center shadow-xs">
            <span className="font-display italic text-xs font-bold">W</span>
          </div>
          <span className="font-display font-bold text-[#1C1917] text-[15px] tracking-tight">Wayfarer</span>
        </div>
      </div>

      {/* Quick Search (Desktop / Tablet) */}
      <div className="flex-1 max-w-[340px] relative hidden md:block">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C857B] pointer-events-none">
          <IconSearch size={15} />
        </div>
        <input
          type="text"
          placeholder="Search itinerary, vouchers, squad..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-[13px] text-[#262320] placeholder:text-[#9E978C] focus:outline-none focus:ring-2 focus:ring-[#182B49]/15 focus:border-[#182B49] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        />
      </div>

      {/* Right Header Widgets */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Weather Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F6F1EA] border border-[#E2DBD0] text-[#5C5346]">
          <span className="text-sm sm:text-base">☀️</span>
          <div>
            <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
              <span className="text-[#1C1917]">28°C</span> <span className="text-[10px] text-[#8C8478] font-medium hidden sm:inline">Rome</span>
            </div>
            <div className="text-[9px] text-[#8C8478] font-medium hidden md:block">Sunny · UV 7</div>
          </div>
        </div>

        {/* Live Fare Alert (Desktop) */}
        <button
          onClick={onNavigateToBookings}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EAF2EC] border border-[#CDE0D2] text-[#2D5A43] hover:bg-[#DFECE1] transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#3D7A58] animate-pulse" />
          <div className="text-left">
            <div className="text-[11px] font-bold leading-tight">Live Pricing Active</div>
            <div className="text-[9px] text-[#4A7D60]">Flights down 9.4%</div>
          </div>
        </button>

        {/* Concierge Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white text-[11px] sm:text-[12px] font-bold shadow-xs transition-all cursor-pointer flex-shrink-0"
        >
          <IconBot size={14} color="#FAF8F5" />
          <span>Concierge</span>
        </button>

        {/* Share Trip */}
        <button
          onClick={onOpenShare}
          className="p-1.5 sm:p-2 rounded-xl bg-white border border-[#E0D8CB] text-[#5C554B] hover:bg-[#F6F1EA] transition-colors cursor-pointer shadow-xs"
          title="Share Trip & Accessibility"
        >
          <IconShare size={15} />
        </button>

        {/* Notification Bell */}
        <div
          onClick={onNavigateToBookings}
          className="relative p-1.5 sm:p-2 rounded-xl bg-white border border-[#E0D8CB] text-[#5C554B] hover:bg-[#F6F1EA] cursor-pointer transition-colors shadow-xs"
          title="1 pending notification"
        >
          <IconBell size={15} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#C25934] rounded-full" />
        </div>
      </div>
    </header>
  )
}
