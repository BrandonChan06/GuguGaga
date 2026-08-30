import { Screen } from '../types'
import { EXCHANGE_RATES } from '../data/mockData'
import {
  IconGrid,
  IconMap,
  IconCalendar,
  IconWallet,
  IconTicket,
  IconUsers,
  IconChevronDown,
  IconShare,
  IconSparkles
} from './icons'

export default function Sidebar({
  active,
  onNavigate,
  selectedDayStopsCount,
  budgetPercentage,
  bookedCount,
  totalBookings,
  squadCount,
  homeCurrency,
  setHomeCurrency,
  onOpenCalculator,
  onOpenShare,
  onOpenAI
}: {
  active: Screen
  onNavigate: (s: Screen) => void
  selectedDayStopsCount: number
  budgetPercentage: number
  bookedCount: number
  totalBookings: number
  squadCount: number
  homeCurrency: string
  setHomeCurrency: (c: string) => void
  onOpenCalculator: () => void
  onOpenShare: () => void
  onOpenAI: () => void
}) {
  return (
    <aside className="w-[260px] flex-shrink-0 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-20 select-none">
      
      {/* Brand */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white text-base font-black tracking-tight">W</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 text-[17px] tracking-tight block leading-tight">Wayfarer</span>
            <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">AI Travel Suite</span>
          </div>
        </div>
        <button onClick={onOpenAI} title="AI Travel Assistant"
          className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors">
          <IconSparkles size={14} />
        </button>
      </div>

      {/* Current Trip Switcher */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Trip</p>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Confirmed</span>
        </div>
        <div className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1552076170-3b3f5c8fe1c6?w=120&h=120&fit=crop&auto=format" alt="Rome" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-slate-900 leading-tight truncate">Rome, Italy 🇮🇹</div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <span>Sep 12–18, 2026</span>
            </div>
          </div>
          <IconChevronDown size={14} color="#94A3B8" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {[
          { id: 'dashboard', label: 'Dashboard', Icon: IconGrid },
          { id: 'itinerary', label: 'Itinerary & Map', Icon: IconMap, badge: `${selectedDayStopsCount} stops` },
          { id: 'calendar', label: 'Trip Calendar', Icon: IconCalendar, badge: '7 Days' },
          { id: 'budget', label: 'Budget & Split', Icon: IconWallet, badge: `${budgetPercentage}%`, badgeColor: budgetPercentage > 85 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700' },
          { id: 'bookings', label: 'Bookings & Passes', Icon: IconTicket, badge: `${bookedCount}/${totalBookings}` },
          { id: 'group', label: 'Group Hub & AI Voting', Icon: IconUsers, badge: `${squadCount} active` },
        ].map(({ id, label, Icon, badge, badgeColor }) => {
          const isActive = active === id
          return (
            <button key={id} onClick={() => onNavigate(id as Screen)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}>
              <Icon size={18} color={isActive ? 'white' : '#64748B'} />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                  isActive ? 'bg-white/25 text-white' : badgeColor || 'bg-slate-100 text-slate-600'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Quick Currency Bar in Sidebar */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
          <span>Currency Converter</span>
          <button onClick={onOpenCalculator} className="text-blue-600 font-bold hover:underline">Calculator</button>
        </div>
        <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-[12px]">
          <span className="font-semibold text-slate-700">€1.00 EUR =</span>
          <select value={homeCurrency} onChange={e => setHomeCurrency(e.target.value)}
            className="font-bold text-blue-600 bg-transparent outline-none cursor-pointer">
            {Object.entries(EXCHANGE_RATES).map(([code, info]) => (
              <option key={code} value={code}>{code} ({info.symbol}{info.rate})</option>
            ))}
          </select>
        </div>
      </div>

      {/* User Accessibility Profile & Share */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
              SC
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold text-slate-900 leading-tight">Sarah Chen</div>
              <div className="text-[10px] text-slate-400">Lead Organizer</div>
            </div>
          </div>
          <button onClick={onOpenShare} title="Share & Accessibility Settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <IconShare size={15} />
          </button>
        </div>

        <button onClick={onOpenShare}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100/70 border border-violet-200/60 text-left transition-colors">
          <span className="text-[11px] text-violet-700 font-semibold flex items-center gap-1.5">
            <span>♿</span> Accessibility Active
          </span>
          <span className="text-[10px] font-bold text-violet-500 uppercase">View</span>
        </button>
      </div>
    </aside>
  )
}
