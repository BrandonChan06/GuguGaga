import { ItineraryItem, BookingItem } from '../types'
import { WEATHER_FORECAST } from '../data/mockData'
import { IconPlus } from '../components/icons'

export default function CalendarView({
  itinerary,
  selectedDay,
  onSelectDay,
  onOpenAddModal
}: {
  itinerary: Record<string, ItineraryItem[]>
  bookings: BookingItem[]
  selectedDay: string
  onSelectDay: (d: string) => void
  onOpenAddModal: () => void
}) {
  const dates = [
    { dayKey: 'day1', label: 'Day 1', date: 'Sat, Sep 12', weather: '☀️ 29°C' },
    { dayKey: 'day2', label: 'Day 2', date: 'Sun, Sep 13', weather: '☀️ 28°C' },
    { dayKey: 'day3', label: 'Day 3', date: 'Mon, Sep 14', weather: '🌤️ 27°C' },
    { dayKey: 'day4', label: 'Day 4', date: 'Tue, Sep 15', weather: '🌧️ 24°C (Rain)' },
    { dayKey: 'day5', label: 'Day 5', date: 'Wed, Sep 16', weather: '⛅ 26°C' },
    { dayKey: 'day6', label: 'Day 6', date: 'Thu, Sep 17', weather: '☀️ 28°C' },
    { dayKey: 'day7', label: 'Day 7', date: 'Fri, Sep 18', weather: '☀️ 29°C' },
  ]

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1240px] mx-auto space-y-6 animate-fadeIn select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1C1917] tracking-tight font-display">
            Expedition Calendar & Planner
          </h1>
          <p className="text-[11px] sm:text-[12px] text-[#7D766D] mt-0.5">
            Flight milestones, accommodation check-ins & scheduled field stops
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 bg-[#C25934] text-white text-[12px] font-bold rounded-xl shadow-xs hover:bg-[#A94A28] transition-colors cursor-pointer"
        >
          <IconPlus size={13} color="white" /> Add Event / Stop
        </button>
      </div>

      {/* Multi-Day Calendar Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {dates.map((d) => {
          const isSelected = selectedDay === d.dayKey
          const dayActivities = itinerary[d.dayKey] || []
          return (
            <div
              key={d.dayKey}
              onClick={() => onSelectDay(d.dayKey)}
              className={`rounded-2xl border p-4 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#F4EFE6] border-[#182B49] shadow-md ring-2 ring-[#182B49]/15'
                  : 'bg-white border-[#EAE5DC] hover:border-[#DDD5C7] hover:shadow-xs'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC]">
                  <span className="text-[13px] font-bold text-[#1C1917] font-display">{d.label}</span>
                  <span className="text-[10px] font-semibold text-[#8C8478]">{d.date.split(',')[0]}</span>
                </div>
                <div className="text-[11px] text-[#7D766D] mt-1 font-medium">{d.date}</div>
                <div className="text-[10px] text-[#8C5E28] bg-[#FAF6F0] px-2 py-0.5 rounded-md mt-1.5 font-bold inline-block border border-[#F3E7D5]">
                  {d.weather}
                </div>

                {/* Milestones (Flights / Hotels) */}
                {d.dayKey === 'day1' && (
                  <div className="mt-2.5 p-2 rounded-xl bg-[#EAF2EC] text-[#2D5A43] text-[10px] font-bold flex items-center gap-1.5 border border-[#CDE0D2]">
                    <span>✈️</span> LH1820 Arrival (08:15)
                  </div>
                )}
                {d.dayKey === 'day7' && (
                  <div className="mt-2.5 p-2 rounded-xl bg-[#FDF6ED] text-[#8C4828] text-[10px] font-bold flex items-center gap-1.5 border border-[#F2DECE]">
                    <span>🛫</span> Departure Flight (19:30)
                  </div>
                )}

                {/* Day Activities List */}
                <div className="mt-3 space-y-1.5">
                  {dayActivities.slice(0, 4).map((act, i) => (
                    <div key={i} className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-left">
                      <div className="text-[10px] font-bold text-[#8C8478] leading-none">{act.time}</div>
                      <div className="text-[11px] font-bold text-[#1C1917] truncate mt-0.5 flex items-center gap-1 font-display">
                        <span>{act.emoji}</span>
                        <span className="truncate">{act.name}</span>
                      </div>
                    </div>
                  ))}
                  {dayActivities.length > 4 && (
                    <div className="text-[10px] text-center font-bold text-[#C25934] pt-1">
                      +{dayActivities.length - 4} more stops
                    </div>
                  )}
                  {dayActivities.length === 0 && (
                    <div className="text-[10px] text-[#8C8478] italic py-6 text-center">
                      Free Exploration Day
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAE5DC] mt-2 text-center">
                <span className="text-[10px] font-bold text-[#182B49] hover:underline">
                  Open Day Details →
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 7-Day Weather Forecast Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] space-y-3 sm:space-y-4">
        <h3 className="text-[12px] sm:text-[13px] font-bold text-[#1C1917] uppercase tracking-wider font-display">
          7-Day Meteorological Outlook & Expedition Conditions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {WEATHER_FORECAST.map((w, i) => (
            <div key={i} className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-center space-y-1">
              <div className="text-[10px] sm:text-[11px] font-bold text-[#7D766D]">{w.day}</div>
              <div className="text-xl sm:text-2xl my-1">{w.icon}</div>
              <div className="text-[12px] sm:text-[13px] font-bold text-[#1C1917] font-display">{w.temp}</div>
              <div className="text-[10px] text-[#8C8478]">{w.condition}</div>
              <div className="text-[9px] font-bold text-[#182B49] bg-[#EAE4D8] py-0.5 rounded">Rain: {w.rain}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
