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
    <div className="p-3.5 sm:p-6 md:p-8 max-w-[1200px] mx-auto space-y-5 sm:space-y-7 animate-fadeIn select-none">
      
      {/* ── 1. Current Trip Overview Banner ───────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-[#182B49] text-[#FAF8F5] shadow-[0_10px_30px_-10px_rgba(24,43,73,0.3)] border border-[#2B3F61] p-5 sm:p-7 md:p-9">
        {/* Subtle warm texture/vignette overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url(${currentTrip.imageUrl})` }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C25934]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[#A06C42]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-[640px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#E8DEC8]">
              <span className={`w-2 h-2 rounded-full ${currentTrip.status === 'Confirmed' ? 'bg-[#5EEAD4] animate-pulse' : 'bg-[#FBBF24]'}`} />
              <span>EXPEDITION · {currentTrip.daysUntil} DAYS TO DEPARTURE</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2.5 sm:gap-3 flex-wrap font-display">
              <span>{currentTrip.destination}, {currentTrip.country}</span>
              <span className="text-2xl sm:text-3xl">{currentTrip.flag}</span>
            </h1>

            <p className="text-[12px] sm:text-[13px] text-[#D8D0C3] leading-relaxed font-normal">
              {currentTrip.dates} · <span className="text-white font-semibold">{currentTrip.travelers.length} Companions</span> ({currentTrip.travelers.join(', ')})
            </p>

            {/* Trip Preparation Progress */}
            <div className="pt-2 max-w-[440px] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#C8C0B2] font-medium tracking-wide">Itinerary & Travel Readiness</span>
                <span className="font-bold text-[#5EEAD4]">{currentTrip.progress}% Complete</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden backdrop-blur-xs">
                <div 
                  className="h-full bg-gradient-to-r from-[#C25934] to-[#5EEAD4] rounded-full transition-all duration-700" 
                  style={{ width: `${currentTrip.progress}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onNavigate('itinerary')}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#C25934] hover:bg-[#A94A28] text-white text-[12px] sm:text-[13px] font-bold shadow-md shadow-[#C25934]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Itinerary</span>
              <IconChevronRight size={14} />
            </button>

            <button
              onClick={onOpenAI}
              className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-[#FAF8F5] text-[12px] sm:text-[13px] font-bold border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <IconBot size={15} color="#E8DEC8" />
              <span>Travel Concierge</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Action Required / Important Alerts ───────────────────────────── */}
      {pendingBookings.length > 0 && (
        <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FDF6ED] border border-[#F2DECE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_2px_8px_rgba(194,89,52,0.06)]">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#F8E7D5] text-[#A84B2B] flex items-center justify-center text-base sm:text-lg flex-shrink-0 font-bold border border-[#F0D5BE]">
              ⏳
            </div>
            <div>
              <div className="text-[12px] sm:text-[13px] font-bold text-[#5C2B14] font-display">
                Action Required: {pendingBookings.length} booking awaiting squad confirmation
              </div>
              <div className="text-[11px] text-[#8C4828] mt-0.5">
                {pendingBookings[0]?.title} ({pendingBookings[0]?.price}) is currently held as pending confirmation.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            <button
              onClick={() => onNavigate('bookings')}
              className="px-3.5 py-1.5 rounded-xl bg-[#C25934] hover:bg-[#A94A28] text-white text-[11px] font-bold transition-colors shadow-xs cursor-pointer"
            >
              Resolve in Bookings →
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Next Upcoming Activity & Travel Context Spotlight ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Next Activity Spotlight Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EAE5DC] p-5 sm:p-7 shadow-[0_2px_12px_rgba(38,35,32,0.03)] hover:shadow-[0_4px_18px_rgba(38,35,32,0.06)] transition-all space-y-4 flex flex-col justify-between">
          {nextActivity ? (
            <>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C25934] animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#A84B2B] uppercase tracking-wider">
                      Next Scheduled Stop
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#F4EFE6] text-[#5C5346] border border-[#DDD5C7] text-[10px] font-bold">
                    Day 1 · {currentTrip.dates.split('–')[0]}
                  </span>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 pt-1">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#FAF6F0] border border-[#E8E0D2] flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-xs">
                    {nextActivity.emoji}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#1C1917] tracking-tight leading-tight font-display">
                      {nextActivity.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-[11px] sm:text-[12px] text-[#7D766D] font-medium">
                      <span className="font-semibold text-[#262320] flex items-center gap-1">
                        🕒 {nextActivity.time} – {nextActivity.endTime}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[#5C554B] truncate">
                        📍 {nextActivity.loc}
                      </span>
                    </div>
                  </div>
                </div>

                {nextActivity.note && (
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] text-[#5C554B] flex items-center gap-2 leading-relaxed">
                    <span className="text-[#2D5A43] font-bold">✓</span>
                    <span className="line-clamp-2">{nextActivity.note}</span>
                  </div>
                )}
              </div>

              <div className="pt-3.5 border-t border-[#EAE5DC] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-[#7D766D]">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] text-[#262320] font-bold border border-[#EAE5DC]">
                    Cost: {nextActivity.cost || 'Included'}
                  </span>
                  {nextActivity.travelTime && <span>· Transit: {nextActivity.travelTime}</span>}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {nextActivity.cost && (
                    <button
                      onClick={() => onOpenReceipt('activity-voucher.pdf')}
                      className="px-3 py-1.5 rounded-xl text-[#182B49] bg-[#EFE9E0] hover:bg-[#E5DDCF] text-[11px] font-bold transition-colors cursor-pointer border border-[#DDD5C7]"
                    >
                      📄 Voucher
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('itinerary')}
                    className="px-4 py-1.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Itinerary</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 space-y-3.5 my-auto">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-[#C25934] flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-xs">
                📍
              </div>
              <div className="space-y-1">
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#1C1917] font-display">
                  No activities scheduled for {currentTrip.destination} yet
                </h3>
                <p className="text-[11px] sm:text-[12px] text-[#7D766D] max-w-[380px] leading-relaxed">
                  Start mapping your journey, add historical landmark visits, or consult the Travel Concierge.
                </p>
              </div>
              <button
                onClick={() => onNavigate('itinerary')}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#182B49] hover:bg-[#122138] text-white text-[11px] sm:text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                + Add First Activity to Itinerary
              </button>
            </div>
          )}
        </div>

        {/* Quick Travel Context Card (1 col) */}
        <div className="bg-white rounded-3xl border border-[#EAE5DC] p-5 sm:p-7 shadow-[0_2px_12px_rgba(38,35,32,0.03)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAE5DC]">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#8C8478] uppercase tracking-wider">
                {currentTrip.destination} Dispatch
              </span>
              <span className="text-[10px] font-bold text-[#2D5A43] bg-[#EAF2EC] border border-[#CDE0D2] px-2 py-0.5 rounded-full">
                {currentTrip.status}
              </span>
            </div>

            <div className="pt-3.5 space-y-3">
              {/* Weather info */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FDF8F0] border border-[#F3E7D5]">
                <span className="text-2xl sm:text-3xl">{isKL ? '⛅' : '☀️'}</span>
                <div>
                  <div className="text-[13px] sm:text-[14px] font-bold text-[#1C1917] font-display">
                    {isKL ? '31°C / 88°F · Tropical' : '28°C / 82°F · Sunny'}
                  </div>
                  <div className="text-[11px] text-[#8C5E28] font-medium mt-0.5">
                    {isKL ? 'Warm & humid · Gentle afternoon breezes' : 'High UV index 7 · Clear Mediterranean skies'}
                  </div>
                </div>
              </div>

              {/* Local Travel Tip */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1">
                <div className="text-[11px] font-bold text-[#262320] flex items-center gap-1.5 font-display">
                  <span>💡</span> Field Note & Transit
                </div>
                <p className="text-[11px] text-[#5C554B] leading-relaxed">
                  {isKL
                    ? 'KL Sentral hub connects KLIA Ekspres and LRT transit. Touch ‘n Go cards accepted on all public transport.'
                    : 'Cathedrals require covered knees & shoulders. Metro Line B station Colosseo has step-free elevator access.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenAI}
            className="w-full py-2.5 rounded-xl bg-[#F4EFE6] hover:bg-[#EDE5D8] border border-[#DDD5C7] text-[#5C5346] text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <IconBot size={13} /> Ask Concierge for {currentTrip.destination} Notes
          </button>
        </div>
      </div>

      {/* ── 4. Core Trip Status Metrics ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Budget & Spend Metric */}
        <div
          onClick={() => onNavigate('budget')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] hover:border-[#182B49]/40 hover:shadow-[0_4px_20px_rgba(38,35,32,0.06)] transition-all cursor-pointer group space-y-3.5"
        >
          <div className="flex items-center justify-between text-[#8C8478]">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7D766D]">Budget & Spending</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-[#182B49] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <IconWallet size={16} />
            </div>
          </div>
          
          <div>
            <div className="text-[22px] sm:text-[26px] font-bold text-[#1C1917] tracking-tight font-display">
              €{totalSpentEUR.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#7D766D] mt-0.5 flex items-center justify-between font-medium">
              <span>≈ {convertEURTo(totalSpentEUR)}</span>
              <span className="font-bold text-[#182B49]">{budgetPercentage}% of €{(totalBudgetEUR / 1000).toFixed(0)}k cap</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-[#F0EBE1] rounded-full overflow-hidden">
              <div className="h-full bg-[#182B49] rounded-full transition-all duration-700" style={{ width: `${budgetPercentage}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#8C8478] font-medium">
              <span>€{remainingBudgetEUR.toLocaleString()} remaining</span>
              <span className="text-[#C25934] font-bold group-hover:underline">Manage Ledger →</span>
            </div>
          </div>
        </div>

        {/* Bookings & Passes Metric */}
        <div
          onClick={() => onNavigate('bookings')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] hover:border-[#2D5A43]/40 hover:shadow-[0_4px_20px_rgba(38,35,32,0.06)] transition-all cursor-pointer group space-y-3.5"
        >
          <div className="flex items-center justify-between text-[#8C8478]">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7D766D]">Vouchers & Passes</span>
            <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] border border-[#CDE0D2] text-[#2D5A43] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <IconTicket size={16} />
            </div>
          </div>

          <div>
            <div className="text-[22px] sm:text-[26px] font-bold text-[#1C1917] tracking-tight font-display">
              {bookings.length > 0 ? `${bookedCount} / ${bookings.length} Confirmed` : '0 Bookings'}
            </div>
            <div className="text-[11px] text-[#2D5A43] font-semibold mt-0.5 flex items-center gap-1">
              {bookings.length > 0 ? (
                <>
                  <IconCheck size={12} color="#2D5A43" />
                  <span>{bookings.length - bookedCount === 0 ? 'All vouchers secured' : `${bookings.length - bookedCount} awaiting squad confirmation`}</span>
                </>
              ) : (
                <span className="text-[#8C8478] font-normal">No vouchers recorded yet</span>
              )}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-[#F0EBE1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2D5A43] rounded-full transition-all duration-700"
                style={{ width: `${bookings.length > 0 ? (bookedCount / bookings.length) * 100 : 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#8C8478] font-medium">
              <span>{bookings.length > 0 ? 'Flights & Hotel vouchers' : 'Ready to add tickets'}</span>
              <span className="text-[#2D5A43] font-bold group-hover:underline">View Bookings →</span>
            </div>
          </div>
        </div>

        {/* Overall Itinerary Completion */}
        <div
          onClick={() => onNavigate('itinerary')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] hover:border-[#C25934]/40 hover:shadow-[0_4px_20px_rgba(38,35,32,0.06)] transition-all cursor-pointer group space-y-3.5"
        >
          <div className="flex items-center justify-between text-[#8C8478]">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7D766D]">Itinerary Progress</span>
            <div className="w-8 h-8 rounded-xl bg-[#FDF6ED] border border-[#F2DECE] text-[#C25934] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <IconMap size={16} />
            </div>
          </div>

          <div>
            <div className="text-[22px] sm:text-[26px] font-bold text-[#1C1917] tracking-tight font-display">
              {totalActivitiesCount} Stops Planned
            </div>
            <div className="text-[11px] text-[#C25934] font-semibold mt-0.5">
              {totalActivitiesCount > 0 ? '7 Days · Walking routes mapped' : '7 Days · Open schedule'}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-[#F0EBE1] rounded-full overflow-hidden">
              <div className="h-full bg-[#C25934] rounded-full transition-all duration-700" style={{ width: `${currentTrip.progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#8C8478] font-medium">
              <span>{day1Stops.length > 0 ? `Day 1 has ${day1Stops.length} stops ready` : 'Start planning Day 1'}</span>
              <span className="text-[#C25934] font-bold group-hover:underline">Interactive Map →</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 5. Upcoming Schedule / Next Few Activities ──────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#EAE5DC] p-5 sm:p-7 shadow-[0_2px_12px_rgba(38,35,32,0.03)] space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE5DC]">
          <div>
            <h2 className="text-[16px] sm:text-[18px] font-bold text-[#1C1917] tracking-tight font-display">
              Upcoming Schedule · Day 1 Timeline
            </h2>
            <p className="text-[11px] text-[#7D766D] mt-0.5">
              {currentTrip.dates.split('–')[0]} · {currentTrip.destination} Highlights
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('calendar')}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#5C554B] border border-[#EAE5DC] text-[11px] font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <IconCalendar size={13} />
              <span>Full Calendar</span>
            </button>

            <button
              onClick={() => onNavigate('itinerary')}
              className="px-3.5 py-1.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
            >
              Open Full Itinerary →
            </button>
          </div>
        </div>

        {/* Short clean list of upcoming stops or Empty state */}
        {day1Stops.length > 0 ? (
          <div className="space-y-2.5 sm:space-y-3">
            {day1Stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F5F0E6] border border-[#EAE5DC] hover:border-[#DDD5C7] transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Time badge */}
                  <div className="w-14 sm:w-16 flex-shrink-0 text-center">
                    <span className="text-[12px] sm:text-[13px] font-bold text-[#1C1917] block leading-tight font-display">{stop.time}</span>
                    <span className="text-[9px] sm:text-[10px] text-[#8C8478] font-medium">to {stop.endTime}</span>
                  </div>

                  {/* Emoji & Name */}
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white border border-[#E2DBD0] flex items-center justify-center text-base sm:text-lg flex-shrink-0 shadow-xs">
                    {stop.emoji}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[13px] sm:text-[14px] font-bold text-[#1C1917] truncate font-display">
                      {stop.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#7D766D] truncate mt-0.5">
                      📍 {stop.loc}
                    </div>
                  </div>
                </div>

                {/* Right metadata badge & CTA */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {stop.travelTime && idx < day1Stops.length - 1 && (
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-white border border-[#EAE5DC] text-[10px] font-bold text-[#5C554B]">
                      🚶 {stop.travelTime}
                    </span>
                  )}

                  <span className="text-[11px] sm:text-[12px] font-bold text-[#1C1917] bg-white px-2.5 py-1 rounded-lg border border-[#EAE5DC]">
                    {stop.cost || 'Free'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center rounded-2xl bg-[#FAF8F5] border border-dashed border-[#DDD5C7] text-[#8C8478] space-y-2">
            <p className="text-[13px] font-medium text-[#5C554B]">
              No upcoming activities planned for {currentTrip.destination} yet.
            </p>
            <p className="text-[11px] text-[#8C8478]">
              Select below to customize your schedule for Day 1.
            </p>
            <button
              onClick={() => onNavigate('itinerary')}
              className="inline-block mt-2 text-[#C25934] font-bold text-[12px] hover:underline cursor-pointer"
            >
              + Start building Day 1 schedule →
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
