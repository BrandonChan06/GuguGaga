import React, { useState } from 'react'
import { ItineraryItem } from '../types'
import { IconPlus, IconTrash, IconClose } from '../components/icons'
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
  const [mobileTab, setMobileTab] = useState<'timeline' | 'map'>('timeline')
  const currentStops = itinerary[selectedDay] || []
  const daysList = Object.keys(itinerary).sort()

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fadeIn select-none">
      
      {/* Sub-Header / Day Selector & Mobile View Switcher */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 bg-[#FAF8F5] border-b border-[#EAE5DC] flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[17px] sm:text-[20px] font-bold text-[#1C1917] tracking-tight font-display">
              Expedition Itinerary & Map
            </h1>
            <p className="text-[11px] text-[#7D766D] truncate">
              Field walking routes, stay durations & cultural landmarks
            </p>
          </div>

          {/* Mobile view segmented switch (Timeline vs Map) */}
          <div className="flex lg:hidden items-center bg-[#EFE9E0] p-1 rounded-xl text-[11px] font-bold border border-[#E2DBD0]">
            <button
              onClick={() => setMobileTab('timeline')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                mobileTab === 'timeline' ? 'bg-white text-[#182B49] shadow-xs' : 'text-[#7D766D]'
              }`}
            >
              📋 Timeline
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                mobileTab === 'map' ? 'bg-white text-[#182B49] shadow-xs' : 'text-[#7D766D]'
              }`}
            >
              🗺️ Map
            </button>
          </div>
        </div>

        {/* Days Horizontal Scroll Bar & Add Stop */}
        <div className="flex items-center justify-between md:justify-end gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 bg-[#EFE9E0] p-1 rounded-xl overflow-x-auto flex-nowrap flex-shrink-0 border border-[#E2DBD0]">
            {daysList.map((d, i) => (
              <button
                key={d}
                onClick={() => { setSelectedDay(d); setPlanBOpen(false) }}
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDay === d
                    ? 'bg-[#182B49] text-white shadow-xs'
                    : 'text-[#5C554B] hover:text-[#1C1917]'
                }`}
              >
                Day {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#C25934] hover:bg-[#A94A28] text-white text-[11px] sm:text-[12px] font-bold shadow-xs transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
          >
            <IconPlus size={13} color="white" />
            <span>Add Stop</span>
          </button>
        </div>
      </div>

      {/* Main Split Body: Timeline + Plan B + Map */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-3 sm:p-5 gap-4 min-h-0">
        
        {/* Left: Interactive Timeline */}
        <div className={`w-full lg:w-[420px] flex-shrink-0 flex flex-col overflow-hidden relative bg-white rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] p-4 ${
          mobileTab === 'map' ? 'hidden lg:flex' : 'flex flex-1'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC] mb-2 flex-shrink-0">
            <span className="text-[12px] font-bold text-[#1C1917] uppercase tracking-wider font-display">
              Field Schedule · {currentStops.length} Activities
            </span>
            <span className="text-[11px] text-[#7D766D] font-medium">
              {currentStops[0]?.time || '09:00'} → {currentStops[currentStops.length - 1]?.endTime || '21:00'}
            </span>
          </div>

          {/* Activity items list */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 pb-24">
            {currentStops.length === 0 ? (
              <div className="text-center py-16 text-[#8C8478] space-y-2">
                <p className="text-[14px] font-semibold text-[#1C1917] font-display">No activities planned for this day yet.</p>
                <p className="text-[12px] text-[#7D766D]">Select below to add visits, meals, and landmark stops.</p>
                <button
                  onClick={onOpenAddModal}
                  className="mt-2 px-4 py-2 bg-[#182B49] hover:bg-[#122138] text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  + Add First Stop
                </button>
              </div>
            ) : (
              currentStops.map((item, idx) => {
                const stayDuration = calculateDuration(item.time, item.endTime)
                return (
                  <div key={item.id} className="group relative">
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] hover:border-[#DDD5C7] hover:shadow-[0_4px_16px_rgba(38,35,32,0.04)] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        {/* Time & Duration badge */}
                        <div className="flex-shrink-0">
                          <span className="text-[13px] font-bold text-[#1C1917] block leading-tight font-display">{item.time}</span>
                          <span className="text-[10px] text-[#8C8478] block mt-0.5 font-medium">to {item.endTime}</span>
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded-md bg-white border border-[#E0D8CB] text-[9px] font-bold text-[#5C554B]">
                            ⏳ {stayDuration}
                          </span>
                        </div>

                        {/* Title & Notes */}
                        <div className="flex-1 min-w-0 px-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base flex-shrink-0">{item.emoji}</span>
                            <span className="text-[14px] font-bold text-[#1C1917] leading-tight truncate font-display">{item.name}</span>
                          </div>
                          <div className="text-[11px] text-[#7D766D] mt-1 leading-snug">📍 {item.loc}</div>
                          {item.note && (
                            <div className="text-[11px] text-[#5C554B] mt-2 bg-white p-2.5 rounded-xl border border-[#EAE5DC] leading-relaxed">
                              {item.note}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          {item.cost && (
                            <span className="text-[11px] font-bold text-[#1C1917] bg-white px-2 py-0.5 rounded-md border border-[#E0D8CB]">
                              {item.cost}
                            </span>
                          )}
                          <button
                            onClick={() => onDeleteItem(selectedDay, item.id)}
                            title="Delete Stop"
                            className="p-1 rounded-lg text-[#B4ADA1] hover:text-[#C25934] hover:bg-[#FDF6ED] transition-colors mt-2 cursor-pointer"
                          >
                            <IconTrash size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Travel Time & Transit Mode indicator to next stop */}
                    {item.travelTime && idx < currentStops.length - 1 && (
                      <div className="flex items-center gap-2 py-2 px-4 my-0.5 text-[11px] text-[#8C8478] font-medium">
                        <div className="w-0.5 h-6 bg-[#DCD5C7] mx-2" />
                        <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE5DC] text-[#5C554B] text-[10px]">
                          <span>{item.travelMode === 'metro' ? '🚇' : item.travelMode === 'bus' ? '🚌' : '🚶'}</span>
                          <span>{item.travelTime}</span>
                        </span>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Floating Plan B Smart Alternative Suggestion */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            {planBOpen ? (
              <div className="p-4 rounded-2xl bg-[#FDF8F0] border border-[#F2DECE] shadow-xl space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#5C2B14] font-bold text-[12px] font-display">
                    <span>🌧️</span>
                    <span>Weather Alert: Afternoon Rain Expected</span>
                  </div>
                  <button onClick={() => setPlanBOpen(false)} className="text-[#8C8478] hover:text-[#262320] cursor-pointer">
                    <IconClose size={13} />
                  </button>
                </div>
                <p className="text-[11px] text-[#8C4828] leading-relaxed">
                  Swap outdoor Trevi Fountain walk for indoor Capitoline Museum or Pantheon tour to stay dry.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSwapPlanB({ name: 'Capitoline Museum', emoji: '🏛️', time: '15:00', price: '€16' })}
                    className="flex-1 py-1.5 rounded-xl bg-[#C25934] hover:bg-[#A94A28] text-white font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
                  >
                    Swap in Capitoline Museum →
                  </button>
                  <button
                    onClick={() => setPlanBOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#DDD5C7] text-[#5C554B] text-[11px] font-medium hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    Keep Original
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setPlanBOpen(true)}
                className="w-full py-2.5 px-4 rounded-2xl bg-[#182B49] hover:bg-[#122138] text-white text-[11px] font-bold shadow-lg flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span className="font-display tracking-wide">Plan B Weather Advisory Available</span>
                </div>
                <span className="text-[#FBBF24] font-bold">Review →</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Interactive SVG Map Canvas */}
        <div className={`flex-1 rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] relative min-h-[300px] ${
          mobileTab === 'timeline' ? 'hidden lg:block' : 'block'
        }`}>
          <InteractiveSVGMap stops={currentStops} />
        </div>

      </div>
    </div>
  )
}
