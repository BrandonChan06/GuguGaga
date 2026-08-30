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
    <div className="p-8 max-w-[1240px] mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight">Trip Calendar & Master Schedule</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">Rome 2026 · Integrated flight departures, hotel stays & daily activities</p>
        </div>
        <button onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-[12px] font-bold rounded-xl shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors">
          <IconPlus size={13} color="white" /> Add Event / Stop
        </button>
      </div>

      {/* Multi-Day Calendar Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {dates.map((d) => {
          const isSelected = selectedDay === d.dayKey
          const dayActivities = itinerary[d.dayKey] || []
          return (
            <div key={d.dayKey}
              onClick={() => onSelectDay(d.dayKey)}
              className={`rounded-2xl border p-4 flex flex-col justify-between min-h-[360px] cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
              }`}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[12px] font-black text-slate-900">{d.label}</span>
                  <span className="text-[10px] font-semibold text-slate-400">{d.date.split(',')[0]}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">{d.date}</div>
                <div className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mt-1.5 font-bold inline-block">
                  {d.weather}
                </div>

                {/* Milestones (Flights / Hotels) */}
                {d.dayKey === 'day1' && (
                  <div className="mt-2.5 p-2 rounded-xl bg-blue-100/70 text-blue-800 text-[10px] font-bold flex items-center gap-1.5">
                    <span>✈️</span> LH1820 Arrival (08:15)
                  </div>
                )}
                {d.dayKey === 'day7' && (
                  <div className="mt-2.5 p-2 rounded-xl bg-rose-100/70 text-rose-800 text-[10px] font-bold flex items-center gap-1.5">
                    <span>🛫</span> Departure Flight (19:30)
                  </div>
                )}

                {/* Day Activities List */}
                <div className="mt-3 space-y-1.5">
                  {dayActivities.slice(0, 4).map((act, i) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-left">
                      <div className="text-[10px] font-bold text-slate-500 leading-none">{act.time}</div>
                      <div className="text-[11px] font-bold text-slate-800 truncate mt-0.5 flex items-center gap-1">
                        <span>{act.emoji}</span>
                        <span className="truncate">{act.name}</span>
                      </div>
                    </div>
                  ))}
                  {dayActivities.length > 4 && (
                    <div className="text-[10px] text-center font-bold text-blue-600 pt-1">
                      +{dayActivities.length - 4} more stops
                    </div>
                  )}
                  {dayActivities.length === 0 && (
                    <div className="text-[10px] text-slate-400 italic py-6 text-center">
                      Free Exploration Day
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2 text-center">
                <span className="text-[10px] font-bold text-blue-600 hover:underline">
                  Open Day Details →
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 7-Day Weather Forecast Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wide">
          7-Day Meteorological Forecast & Outdoor Index
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {WEATHER_FORECAST.map((w, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
              <div className="text-[11px] font-bold text-slate-500">{w.day}</div>
              <div className="text-2xl my-1">{w.icon}</div>
              <div className="text-[13px] font-black text-slate-900">{w.temp}</div>
              <div className="text-[10px] text-slate-400">{w.condition}</div>
              <div className="text-[9px] font-bold text-blue-600 bg-blue-50 py-0.5 rounded">Rain: {w.rain}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
