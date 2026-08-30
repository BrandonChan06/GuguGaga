import { Screen, ItineraryItem, ExpenseItem, BookingItem } from '../types'
import { IconStar, IconWallet, IconTicket, IconMap } from '../components/icons'

export default function DashboardView({
  itinerary,
  expenses,
  bookings,
  totalSpentEUR,
  budgetPercentage,
  convertEURTo,
  onNavigate,
  onOpenAI,
  onOpenReceipt
}: {
  itinerary: Record<string, ItineraryItem[]>
  expenses: ExpenseItem[]
  bookings: BookingItem[]
  totalSpentEUR: number
  totalBudgetEUR: number
  budgetPercentage: number
  homeCurrency: string
  convertEURTo: (eur: number) => string
  onNavigate: (s: Screen) => void
  onOpenAI: () => void
  onOpenReceipt: (name: string) => void
}) {
  const nextUpStops = itinerary['day1'] || []
  const bookedCount = bookings.filter(b => b.status === 'booked').length

  return (
    <div className="p-8 max-w-[1240px] mx-auto space-y-7 animate-fadeIn">
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-tight">Good morning, Sarah 👋</h1>
          <p className="text-[13px] text-slate-500 mt-1">
            Your Rome adventure departs in <span className="font-bold text-blue-600">13 days</span>. 4 travelers confirmed, itinerary 85% finalized.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => onNavigate('itinerary')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold shadow-md shadow-blue-500/20 transition-all">
            Open Itinerary Builder →
          </button>
          <button onClick={onOpenAI}
            className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[12px] font-bold border border-indigo-200/60 transition-all flex items-center gap-1.5">
            <span>✨</span> AI Suggestions
          </button>
        </div>
      </div>

      {/* AI Destination Suggestion & Review Spotlight */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl shadow-slate-900/10 group min-h-[260px] flex flex-col justify-between p-8">
        <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=600&fit=crop&auto=format"
          alt="Maldives" className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-transparent" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold text-indigo-200">
            <span>✨</span> AI VIBE-MATCHED DESTINATION
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-amber-300 border border-white/10">
            <IconStar size={12} filled={true} /> 4.97 (14.2k verified reviews)
          </div>
        </div>

        <div className="relative z-10 max-w-[650px] my-3">
          <h2 className="text-[28px] font-black tracking-tight text-white mb-2 leading-tight">
            Maldives · Baa Atoll Biosphere
          </h2>
          <p className="text-[13px] text-slate-200 leading-relaxed line-clamp-2">
            AI synthesized review summary: "Perfect tranquil contrast to Rome's bustling cobblestones. Crystal lagoon waters, overwater villas with private reef access, and zero crowds for post-city recharge."
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm">🤿 Manta Ray Snorkeling</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm">🏝️ 29°C Warm Waters</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm">✈️ Direct Connections</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button onClick={onOpenAI}
            style={{ backgroundColor: '#FF7F50' }}
            className="px-5 py-2.5 rounded-xl text-white text-[12px] font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-1.5">
            <span>Explore AI Reviews & Flights</span> →
          </button>
          <span className="text-[11px] text-slate-300 font-medium">Estimated for 4 people: €3,400 all-in</span>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Spent</span>
            <IconWallet size={16} color="#2563EB" />
          </div>
          <div className="text-[22px] font-black text-slate-900">€{totalSpentEUR.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>≈ {convertEURTo(totalSpentEUR)}</span>
            <span className="font-bold text-blue-600">{budgetPercentage}% of €8k</span>
          </div>
          <div className="mt-2.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${budgetPercentage}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Bookings Status</span>
            <IconTicket size={16} color="#059669" />
          </div>
          <div className="text-[22px] font-black text-slate-900">{bookedCount} / {bookings.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            {bookings.length - bookedCount === 0 ? 'All confirmed!' : `${bookings.length - bookedCount} pending decisions`}
          </div>
          <div className="mt-2.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(bookedCount / bookings.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Day 1 Activities</span>
            <IconMap size={16} color="#8B5CF6" />
          </div>
          <div className="text-[22px] font-black text-slate-900">{nextUpStops.length} Stops</div>
          <div className="text-[11px] text-slate-500 mt-1">Colosseum, Roman Forum, Trevi</div>
          <div className="mt-2.5 flex items-center gap-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-50 text-violet-700">09:00 AM Start</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Rome Weather</span>
            <span className="text-base">☀️</span>
          </div>
          <div className="text-[22px] font-black text-slate-900">28°C / 82°F</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Ideal walking weather</div>
          <div className="mt-2.5 text-[10px] text-slate-400 font-medium">UV Index 7 · Light breeze 12 km/h</div>
        </div>
      </div>

      {/* Split Grid: Live Pricing Radar & Recent Receipts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Flight & Hotel Pricing Radar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-[14px] font-bold text-slate-900">Live Price Tracking Radar</h3>
            </div>
            <button onClick={() => onNavigate('bookings')} className="text-[11px] text-blue-600 font-bold hover:underline">
              View all bookings →
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Monitoring real-time fares and rate drops for your trip dates</p>
          
          <div className="space-y-3">
            {bookings.slice(0, 3).map(b => (
              <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-base flex-shrink-0">
                    {b.emoji}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">{b.title}</div>
                    <div className="text-[10px] text-slate-400">{b.provider} · {b.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-extrabold text-slate-900">{b.price}</div>
                  {b.livePrice && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {b.livePrice.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stored Receipts & Document Vault */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-slate-900">Stored Receipts & Pass Vault</h3>
            <button onClick={() => onNavigate('budget')} className="text-[11px] text-blue-600 font-bold hover:underline">
              Manage in Budget →
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Click any receipt to open PDF / document viewer preview</p>
          
          <div className="space-y-2.5">
            {expenses.filter(e => e.receiptName).slice(0, 4).map(exp => (
              <div key={exp.id} onClick={() => onOpenReceipt(exp.receiptName!)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{exp.emoji}</span>
                  <div>
                    <div className="text-[12px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {exp.receiptName}
                    </div>
                    <div className="text-[10px] text-slate-400">{exp.name} · Paid by {exp.paidBy}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-slate-900">€{exp.amountEUR}</span>
                  <span className="text-[11px] text-blue-600 font-bold bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-xs">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
