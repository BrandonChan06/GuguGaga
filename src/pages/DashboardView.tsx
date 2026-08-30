import { Screen, Trip, ItineraryItem, ExpenseItem, BookingItem } from '../types'
import { INITIAL_TRIPS } from '../data/mockData'
import { IconMap, IconWallet, IconTicket, IconCalendar, IconBot, IconChevronRight, IconCheck } from '../components/icons'

export default function DashboardView({
  itinerary,
  expenses: _expenses,
  bookings,
  totalSpentEUR,
  totalBudgetEUR,
  budgetPercentage,
  convertEURTo,
  currentTrip = INITIAL_TRIPS[0],
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
  currentTrip?: Trip
  onNavigate: (s: Screen) => void
  onOpenAI: () => void
  onOpenReceipt: (name: string) => void
}) {
  // Day 1 stops
  const day1Stops = itinerary['day1'] || []
  const nextActivity = day1Stops[0] || null

  const bookedCount = bookings.filter(b => b.status === 'booked').length
  const pendingBookings = bookings.filter(b => b.status === 'pending')
  
  // Total activities count across all days
  const totalActivitiesCount = Object.values(itinerary).reduce((acc, curr) => acc + curr.length, 0)
  const remainingBudgetEUR = Math.max(0, totalBudgetEUR - totalSpentEUR)

  const isKL = currentTrip.destination === 'Kuala Lumpur'

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto space-y-7 animate-fadeIn">
      
      {/* ── 1. Current Trip Overview Banner ───────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-slate-900/10 border border-slate-800 p-6 md:p-8">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-blue-200">
              <span className={`w-2 h-2 rounded-full ${currentTrip.status === 'Confirmed' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>UPCOMING TRIP · {currentTrip.daysUntil} DAYS AWAY</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2.5 flex-wrap">
              <span>{currentTrip.destination}, {currentTrip.country}</span>
              <span className="text-2xl">{currentTrip.flag}</span>
            </h1>

            <p className="text-[13px] text-slate-300 leading-relaxed font-normal">
              {currentTrip.dates} · <span className="text-white font-semibold">{currentTrip.travelers.length} Travelers</span> ({currentTrip.travelers.join(', ')})
            </p>

            {/* Trip Preparation Progress */}
            <div className="pt-2 max-w-[420px] space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-medium">Trip Itinerary & Logistics</span>
                <span className="font-bold text-emerald-400">{currentTrip.progress}% Complete</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden backdrop-blur-xs">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: `${currentTrip.progress}%` }} />
              </div>
            </div>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('itinerary')}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>View Full Itinerary</span>
              <IconChevronRight size={14} />
            </button>

            <button
              onClick={onOpenAI}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-[13px] font-bold border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <IconBot size={15} color="#A5B4FC" />
              <span>Ask Wayfarer</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Action Required / Important Alerts ───────────────────────────── */}
      {pendingBookings.length > 0 && (
        <div className="p-4 md:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg flex-shrink-0 font-bold">
              ⏳
            </div>
            <div>
              <div className="text-[13px] font-bold text-amber-950">
                Action Required: {pendingBookings.length} booking awaiting squad confirmation
              </div>
              <div className="text-[11px] text-amber-800/90 mt-0.5">
                {pendingBookings[0]?.title} ({pendingBookings[0]?.price}) is currently held as pending.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            <button
              onClick={() => onNavigate('bookings')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold transition-colors shadow-xs cursor-pointer"
            >
              Resolve in Bookings →
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Next Upcoming Activity & Travel Context Spotlight ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Activity Spotlight Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
          {nextActivity ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      Next Scheduled Activity
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-bold">
                    Day 1 · {currentTrip.dates.split('–')[0]}
                  </span>
                </div>

                <div className="flex items-start gap-4 pt-1">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-3xl flex-shrink-0 shadow-xs">
                    {nextActivity.emoji}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-[18px] font-extrabold text-slate-900 tracking-tight leading-tight">
                      {nextActivity.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[12px] text-slate-500 font-medium">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        🕒 {nextActivity.time} – {nextActivity.endTime}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-600 truncate">
                        📍 {nextActivity.loc}
                      </span>
                    </div>
                  </div>
                </div>

                {nextActivity.note && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="line-clamp-2">{nextActivity.note}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                    Cost: {nextActivity.cost || 'Free'}
                  </span>
                  {nextActivity.travelTime && <span>· Transit: {nextActivity.travelTime}</span>}
                </div>

                <div className="flex items-center gap-2">
                  {nextActivity.cost && (
                    <button
                      onClick={() => onOpenReceipt('activity-voucher.pdf')}
                      className="px-3 py-1.5 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      📄 Digital Voucher
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('itinerary')}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Itinerary</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-3.5 my-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-xs">
                📍
              </div>
              <div className="space-y-1">
                <h3 className="text-[17px] font-bold text-slate-900">
                  No activities scheduled for {currentTrip.destination} yet
                </h3>
                <p className="text-[12px] text-slate-500 max-w-[380px] leading-relaxed">
                  Start building your personalized itinerary, add landmark stops, or ask the AI Concierge for recommendations.
                </p>
              </div>
              <button
                onClick={() => onNavigate('itinerary')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                + Add First Activity to Itinerary
              </button>
            </div>
          )}
        </div>

        {/* Quick Travel Context Card (1 col) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {currentTrip.destination} Status
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {currentTrip.status}
              </span>
            </div>

            <div className="pt-3 space-y-3.5">
              {/* Weather info */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-100">
                <span className="text-3xl">{isKL ? '⛅' : '☀️'}</span>
                <div>
                  <div className="text-[14px] font-extrabold text-slate-900">
                    {isKL ? '31°C / 88°F · Tropical' : '28°C / 82°F · Sunny'}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                    {isKL ? 'Warm & humid · Light tropical breeze' : 'High UV index 7 · Clear skies'}
                  </div>
                </div>
              </div>

              {/* Local Travel Tip */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <span>💡</span> Local Tip & Transit
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isKL
                    ? 'KL Sentral hub connects KLIA Ekspres and LRT transit. Touch ‘n Go cards accepted on all public transport.'
                    : 'Cathedrals require covered knees & shoulders. Metro Line B station Colosseo has step-free elevator access.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenAI}
            className="w-full py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <IconBot size={13} /> Ask AI Concierge for {currentTrip.destination} Tips
          </button>
        </div>
      </div>

      {/* ── 4. Core Trip Status Metrics ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Budget & Spend Metric */}
        <div
          onClick={() => onNavigate('budget')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Budget & Spending</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IconWallet size={16} />
            </div>
          </div>
          
          <div>
            <div className="text-[24px] font-black text-slate-900 tracking-tight">
              €{totalSpentEUR.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between font-medium">
              <span>≈ {convertEURTo(totalSpentEUR)}</span>
              <span className="font-bold text-blue-600">{budgetPercentage}% of €{(totalBudgetEUR / 1000).toFixed(0)}k</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${budgetPercentage}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>€{remainingBudgetEUR.toLocaleString()} remaining</span>
              <span className="text-blue-600 font-bold group-hover:underline">Manage Budget →</span>
            </div>
          </div>
        </div>

        {/* Bookings & Passes Metric */}
        <div
          onClick={() => onNavigate('bookings')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Bookings Status</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IconTicket size={16} />
            </div>
          </div>

          <div>
            <div className="text-[24px] font-black text-slate-900 tracking-tight">
              {bookings.length > 0 ? `${bookedCount} / ${bookings.length} Confirmed` : '0 Bookings'}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
              {bookings.length > 0 ? (
                <>
                  <IconCheck size={12} color="#059669" />
                  <span>{bookings.length - bookedCount === 0 ? 'All vouchers locked in' : `${bookings.length - bookedCount} pending confirmation`}</span>
                </>
              ) : (
                <span className="text-slate-400 font-normal">No bookings recorded yet</span>
              )}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${bookings.length > 0 ? (bookedCount / bookings.length) * 100 : 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>{bookings.length > 0 ? 'Flights & Hotel vouchers' : 'Ready to add tickets'}</span>
              <span className="text-emerald-600 font-bold group-hover:underline">View Bookings →</span>
            </div>
          </div>
        </div>

        {/* Overall Itinerary Completion */}
        <div
          onClick={() => onNavigate('itinerary')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Itinerary Schedule</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IconMap size={16} />
            </div>
          </div>

          <div>
            <div className="text-[24px] font-black text-slate-900 tracking-tight">
              {totalActivitiesCount} Stops Planned
            </div>
            <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">
              {totalActivitiesCount > 0 ? '7 Days · Mapped with walking routes' : '7 Days · Open schedule'}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${currentTrip.progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>{day1Stops.length > 0 ? `Day 1 has ${day1Stops.length} stops ready` : 'Start planning Day 1'}</span>
              <span className="text-indigo-600 font-bold group-hover:underline">Interactive Map →</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 5. Upcoming Schedule / Next Few Activities ──────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-[16px] font-extrabold text-slate-900 tracking-tight">
              Upcoming Schedule · Day 1 Timeline
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {currentTrip.dates.split('–')[0]} · {currentTrip.destination} Highlights
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('calendar')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <IconCalendar size={13} />
              <span>Full Calendar</span>
            </button>

            <button
              onClick={() => onNavigate('itinerary')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
            >
              Open Full Itinerary →
            </button>
          </div>
        </div>

        {/* Short clean list of upcoming stops or Empty state */}
        {day1Stops.length > 0 ? (
          <div className="space-y-3">
            {day1Stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Time badge */}
                  <div className="w-16 flex-shrink-0 text-center">
                    <span className="text-[12px] font-black text-slate-800 block leading-tight">{stop.time}</span>
                    <span className="text-[10px] text-slate-400 font-medium">to {stop.endTime}</span>
                  </div>

                  {/* Emoji & Name */}
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
                    {stop.emoji}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-slate-900 truncate">
                      {stop.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      📍 {stop.loc}
                    </div>
                  </div>
                </div>

                {/* Right metadata badge & CTA */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {stop.travelTime && idx < day1Stops.length - 1 && (
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                      🚶 {stop.travelTime}
                    </span>
                  )}

                  <span className="text-[12px] font-extrabold text-slate-800">
                    {stop.cost || 'Free'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 space-y-2">
            <p className="text-[13px] font-medium text-slate-600">
              No upcoming activities planned for {currentTrip.destination} yet.
            </p>
            <p className="text-[11px] text-slate-400">
              Click below to start customizing your schedule for Day 1.
            </p>
            <button
              onClick={() => onNavigate('itinerary')}
              className="inline-block mt-2 text-blue-600 font-bold text-[12px] hover:underline cursor-pointer"
            >
              + Start building Day 1 schedule →
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
