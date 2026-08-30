import React from 'react'
import { ItineraryItem } from '../types'
import { IconPlus, IconTrash, IconClock, IconClose } from '../components/icons'
import InteractiveSVGMap from '../components/InteractiveSVGMap'

function calculateDuration(start: string, end: string): string {
  if (!start || !end) return "1h 00m"
  const [sh, sm] = start.split(":").map(Number)
  const [eh, em] = end.split(":").map(Number)
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return "1h 30m"
  let diffMin = (eh * 60 + em) - (sh * 60 + sm)
  if (diffMin < 0) diffMin += 24 * 60
  const hours = Math.floor(diffMin / 60)
  const mins = diffMin % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

export default function ItineraryView({
  itinerary,
  selectedDay,
  setSelectedDay,
  onDeleteItem,
  onOpenAddModal,
  planBOpen,
  setPlanBOpen,
  onSwapPlanB
}: {
  itinerary: Record<string, ItineraryItem[]>
  selectedDay: string
  setSelectedDay: (d: string) => void
  onDeleteItem: (day: string, id: string) => void
  onOpenAddModal: () => void
  planBOpen: boolean
  setPlanBOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSwapPlanB: (alt: { name: string; emoji: string; time: string; price: string }) => void
}) {
  const currentStops = itinerary[selectedDay] || []
  const daysList = Object.keys(itinerary).sort()

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fadeIn">
      {/* Sub-Header / Day Selector */}
      <div className="px-8 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-[18px] font-extrabold text-slate-900 tracking-tight">Interactive Itinerary & Map</h1>
          <p className="text-[11px] text-slate-400">Rome, Italy · Sep 12–18 · Auto travel time & stay duration calculated</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Day buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {daysList.map((d, i) => (
              <button key={d} onClick={() => { setSelectedDay(d); setPlanBOpen(false) }}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  selectedDay === d
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}>
                Day {i + 1}
              </button>
            ))}
          </div>

          <button onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold shadow-sm shadow-blue-500/20 transition-all">
            <IconPlus size={13} color="white" /> Add Stop
          </button>
        </div>
      </div>

      {/* Main Split Body: Timeline + Plan B + Map */}
      <div className="flex-1 flex overflow-hidden p-5 gap-4">
        
        {/* Left: Interactive Timeline */}
        <div className="w-[420px] flex-shrink-0 flex flex-col overflow-hidden relative bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">
              Timeline · {currentStops.length} Activities
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Start: {currentStops[0]?.time || '09:00'} → End: {currentStops[currentStops.length - 1]?.endTime || '21:00'}
            </span>
          </div>

          {/* Activity items list */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 pb-24">
            {currentStops.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <p className="text-[14px] font-semibold">No activities planned for this day yet.</p>
                <button onClick={onOpenAddModal} className="text-blue-600 text-[12px] font-bold hover:underline">
                  + Add your first activity
                </button>
              </div>
            ) : (
              currentStops.map((item, idx) => {
                const stayDuration = calculateDuration(item.time, item.endTime)
                return (
                  <div key={item.id} className="group relative">
                    <div className={`p-3.5 rounded-2xl border ${item.colorClass} hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between gap-2">
                        {/* Time & Duration badge */}
                        <div className="flex-shrink-0">
                          <span className="text-[12px] font-black text-slate-800 block leading-tight">{item.time}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">to {item.endTime}</span>
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-white/80 border border-slate-200/60 text-[9px] font-bold text-slate-600">
                            ⏳ Stay: {stayDuration}
                          </span>
                        </div>

                        {/* Title & Notes */}
                        <div className="flex-1 min-w-0 px-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base flex-shrink-0">{item.emoji}</span>
                            <span className="text-[13px] font-bold text-slate-900 leading-tight truncate">{item.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-snug">{item.loc}</div>
                          {item.note && (
                            <div className="text-[10px] text-slate-600 mt-2 bg-white/80 p-2 rounded-xl border border-slate-100 leading-relaxed">
                              {item.note}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {item.cost && (
                            <span className="text-[11px] font-extrabold text-slate-700">{item.cost}</span>
                          )}
                          <button onClick={() => onDeleteItem(selectedDay, item.id)}
                            title="Delete Stop"
                            className="p-1 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors opacity-80 group-hover:opacity-100">
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Journey Travel Time to next stop */}
                    {item.travelTime && idx < currentStops.length - 1 && (
                      <div className="flex items-center gap-2 ml-8 my-1 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-[10px] text-slate-500 w-fit">
                        <IconClock size={10} color="#64748B" />
                        <span className="font-semibold text-slate-700">{item.travelTime}</span>
                        <span>transit to next activity ({item.travelMode || 'transit'})</span>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Floating Plan B Trigger */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center z-10">
            <button onClick={() => setPlanBOpen(v => !v)}
              style={{ backgroundColor: '#FF7F50' }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-white font-extrabold text-[13px] shadow-xl hover:opacity-95 hover:scale-[1.02] transition-all">
              <span>⚡</span>
              <span>Plan B — Instant Weather & Crowd Reroute</span>
            </button>
          </div>
        </div>

        {/* Plan B Overlay Panel */}
        {planBOpen && (
          <div className="w-[300px] flex-shrink-0 bg-white rounded-3xl border border-orange-200 shadow-2xl overflow-hidden flex flex-col animate-slideRight">
            <div className="px-5 py-4 bg-orange-50/80 border-b border-orange-100 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-black text-orange-800 flex items-center gap-1.5">
                  <span>🌦️</span> Plan B Alternatives
                </h3>
                <p className="text-[10px] text-orange-600 font-medium mt-0.5">Instant rainy/crowd-free indoor substitutes</p>
              </div>
              <button onClick={() => setPlanBOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <IconClose size={15} />
              </button>
            </div>

            <div className="p-3.5 space-y-2.5 flex-1 overflow-y-auto">
              {[
                { emoji: '🖼️', name: 'Borghese Gallery Masterpieces', tag: 'Indoor Museum', time: '2.5h', price: '€28', desc: 'Pre-reserved skip-line entry, sheltered from rain.' },
                { emoji: '👨‍🍳', name: 'Roman Pasta & Wine Cooking Masterclass', tag: 'Culinary Indoor', time: '3.0h', price: '€95', desc: 'Hands-on cellar workshop in historic Trastevere palazzo.' },
                { emoji: '🏛️', name: 'Capitoline Underground Archeology', tag: 'Underground / Dry', time: '2.0h', price: '€16', desc: 'Subterranean galleries beneath Piazza del Campidoglio.' },
                { emoji: '☕', name: 'Historic Sant\'Eustachio Café Tasting', tag: 'Café & Culture', time: '1.0h', price: '€12', desc: 'Famous wooden-interior cafe founded in 1938.' }
              ].map((alt, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-300 hover:bg-orange-50/30 transition-all space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{alt.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-slate-900 leading-tight">{alt.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{alt.tag} · {alt.time}</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{alt.desc}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-slate-700">{alt.price}</span>
                    <button onClick={() => onSwapPlanB(alt)}
                      style={{ backgroundColor: '#FF7F50' }}
                      className="px-2.5 py-1 rounded-lg text-white text-[10px] font-bold hover:opacity-90 transition-opacity">
                      + Swap into Timeline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right: Detailed Interactive SVG Map */}
        <div className="flex-1 min-w-0 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
          <InteractiveSVGMap stops={currentStops} />
        </div>

      </div>
    </div>
  )
}
