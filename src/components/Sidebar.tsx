import { useState, useRef, useEffect } from 'react'
import { Screen, Trip } from '../types'
import { INITIAL_TRIPS } from '../data/mockData'
import {
  IconGrid,
  IconMap,
  IconCalendar,
  IconWallet,
  IconTicket,
  IconUsers,
  IconShare,
  IconChevronDown,
  IconCheck,
  IconBot,
  IconClose
} from './icons'

export default function Sidebar({
  active,
  onNavigate,
  selectedDayStopsCount,
  budgetPercentage,
  bookedCount,
  totalBookings,
  squadCount,
  trips = INITIAL_TRIPS,
  currentTripId = 'trip-rome',
  onSelectTrip,
  onOpenShare,
  onOpenAI,
  isMobileOpen = false,
  onCloseMobile
}: {
  active: Screen
  onNavigate: (s: Screen) => void
  selectedDayStopsCount: number
  budgetPercentage: number
  bookedCount: number
  totalBookings: number
  squadCount: number
  trips?: Trip[]
  currentTripId?: string
  onSelectTrip?: (tripId: string) => void
  homeCurrency?: string
  setHomeCurrency?: (c: string) => void
  onOpenCalculator?: () => void
  onOpenShare: () => void
  onOpenAI: () => void
  isMobileOpen?: boolean
  onCloseMobile?: () => void
}) {
  const [tripDropdownOpen, setTripDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentTrip = trips.find(t => t.id === currentTripId) || trips[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTripDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { id: 'dashboard', label: 'Journal', Icon: IconGrid },
    { id: 'itinerary', label: 'Itinerary & Map', Icon: IconMap, badge: `${selectedDayStopsCount} stops` },
    { id: 'calendar', label: 'Trip Calendar', Icon: IconCalendar, badge: '7 Days' },
    { id: 'budget', label: 'Budget & Splits', Icon: IconWallet, badge: `${budgetPercentage}%`, badgeColor: budgetPercentage > 85 ? 'bg-amber-100/90 text-amber-800' : 'bg-[#EAE4D8] text-[#5A5245]' },
    { id: 'bookings', label: 'Bookings & Passes', Icon: IconTicket, badge: `${bookedCount}/${totalBookings}` },
    { id: 'group', label: 'Squad & Packing', Icon: IconUsers, badge: `${squadCount} travelers` },
  ] as const

  const handleNavClick = (screenId: Screen) => {
    onNavigate(screenId)
    if (onCloseMobile) onCloseMobile()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FAF8F5] select-none border-r border-[#EAE5DC]">
      {/* Brand & Mobile Close */}
      <div className="px-5 py-4 border-b border-[#EAE5DC] flex items-center justify-between bg-[#FAF8F5]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#182B49] text-[#FAF8F5] flex items-center justify-center shadow-xs border border-[#182B49]/40">
            <span className="font-display italic text-base font-bold">W</span>
          </div>
          <div>
            <span className="font-display font-bold text-[#1C1917] text-[17px] tracking-tight block leading-tight">Wayfarer</span>
            <span className="text-[10px] text-[#A06C42] font-semibold uppercase tracking-wider block">Field Guide & Journal</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              onOpenAI()
              if (onCloseMobile) onCloseMobile()
            }}
            title="Open Travel Concierge"
            className="w-7 h-7 rounded-lg bg-[#EFE9E0] hover:bg-[#E5DDCF] text-[#5C5346] flex items-center justify-center transition-colors cursor-pointer border border-[#E0D8CA]"
          >
            <IconBot size={15} />
          </button>

          {/* Close button for mobile drawer */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden w-7 h-7 rounded-lg bg-[#EFE9E0] hover:bg-[#E5DDCF] text-[#5C5346] flex items-center justify-center transition-colors cursor-pointer border border-[#E0D8CA]"
              title="Close menu"
            >
              <IconClose size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Upcoming Trips Switcher */}
      <div className="px-4 pt-3.5 pb-3 border-b border-[#EAE5DC] relative" ref={dropdownRef}>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <p className="text-[10px] font-bold text-[#8C8478] uppercase tracking-wider">Active Expedition</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            currentTrip.status === 'Confirmed' 
              ? 'text-[#2D5A43] bg-[#EAF2EC] border-[#CDE0D2]' 
              : 'text-[#8A5B20] bg-[#F9F3EA] border-[#EADAC5]'
          }`}>
            {currentTrip.status}
          </span>
        </div>

        {/* Selected Trip Button */}
        <button
          type="button"
          onClick={() => setTripDropdownOpen(prev => !prev)}
          className="w-full flex items-center gap-2.5 p-2 rounded-2xl bg-white hover:bg-[#F5F1E9] border border-[#E2DBD0] transition-all text-left cursor-pointer group shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-[#E8E2D7] border border-[#DDD5C7]">
            <img src={currentTrip.imageUrl} alt={currentTrip.destination} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold text-[#1C1917] leading-tight truncate flex items-center gap-1 font-display">
              <span>{currentTrip.destination}, {currentTrip.country}</span>
              <span>{currentTrip.flag}</span>
            </div>
            <div className="text-[10px] text-[#7D766D] mt-0.5 truncate">{currentTrip.dates}</div>
          </div>
          <div className={`text-[#8C8478] transition-transform duration-200 ${tripDropdownOpen ? 'rotate-180' : ''}`}>
            <IconChevronDown size={14} />
          </div>
        </button>

        {/* Dropdown Menu for Switching Between Trips */}
        {tripDropdownOpen && (
          <div className="absolute top-[calc(100%-4px)] left-3 right-3 z-30 bg-white rounded-2xl shadow-xl border border-[#DCD5C7] p-1.5 space-y-1 animate-fadeIn">
            <div className="px-2.5 py-1 text-[9px] font-bold text-[#8C8478] uppercase tracking-wider">
              Select Expedition
            </div>

            {trips.map(trip => {
              const isSelected = trip.id === currentTrip.id
              return (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => {
                    if (onSelectTrip) onSelectTrip(trip.id)
                    setTripDropdownOpen(false)
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F2EDE4] text-[#182B49] border border-[#D5CBC0]'
                      : 'hover:bg-[#FAF8F5] text-[#5A5245]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-[#E8E2D7]">
                    <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold leading-tight truncate flex items-center justify-between font-display">
                      <span>{trip.destination}, {trip.country} {trip.flag}</span>
                      {isSelected && <IconCheck size={11} color="#182B49" />}
                    </div>
                    <div className="text-[10px] text-[#8C8478] mt-0.5 flex items-center justify-between">
                      <span>{trip.dates}</span>
                      <span className={`text-[9px] font-bold ${trip.status === 'Confirmed' ? 'text-[#2D5A43]' : 'text-[#8A5B20]'}`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, Icon, badge, badgeColor }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id as Screen)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#182B49] text-white shadow-xs font-bold'
                  : 'text-[#5C554B] hover:bg-[#EFE9E0]/80 hover:text-[#1C1917]'
              }`}
            >
              <Icon size={17} color={isActive ? '#FFFFFF' : '#8C857B'} />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                  isActive ? 'bg-white/20 text-white' : badgeColor || 'bg-[#EAE4D8] text-[#5C554B]'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Travel Concierge Quick Launch Banner */}
      <div className="px-3 py-2 border-t border-[#EAE5DC]">
        <button
          onClick={() => {
            onOpenAI()
            if (onCloseMobile) onCloseMobile()
          }}
          className="w-full p-2.5 rounded-2xl bg-[#F4EFE6] hover:bg-[#EDE5D8] border border-[#DDD5C7] transition-all text-left flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#182B49] text-[#FAF8F5] flex items-center justify-center flex-shrink-0 shadow-xs">
            <IconBot size={14} color="#FAF8F5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-[#1C1917] group-hover:text-[#182B49] transition-colors font-display">
              Travel Concierge
            </div>
            <div className="text-[10px] text-[#7D766D] truncate">Recommendations & notes</div>
          </div>
        </button>
      </div>

      {/* User Profile & Accessibility */}
      <div className="p-3.5 border-t border-[#EAE5DC] bg-[#FAF8F5]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#182B49] flex items-center justify-center text-[#FAF8F5] text-[10px] font-bold shadow-xs border border-[#182B49]">
              SC
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold text-[#1C1917] leading-tight">Sarah Chen</div>
              <div className="text-[10px] text-[#8C8478]">Lead Organizer</div>
            </div>
          </div>
          <button
            onClick={() => {
              onOpenShare()
              if (onCloseMobile) onCloseMobile()
            }}
            title="Trip Settings & Accessibility"
            className="p-1.5 rounded-lg text-[#8C8478] hover:text-[#182B49] hover:bg-[#EFE9E0] transition-colors cursor-pointer"
          >
            <IconShare size={14} />
          </button>
        </div>

        <button
          onClick={() => {
            onOpenShare()
            if (onCloseMobile) onCloseMobile()
          }}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F5F1E9] border border-[#E2DBD0] text-left transition-colors cursor-pointer shadow-xs"
        >
          <span className="text-[10px] text-[#5C554B] font-semibold flex items-center gap-1.5">
            <span>♿</span> Accessibility Active
          </span>
          <span className="text-[9px] font-bold text-[#A06C42] uppercase tracking-wider">View</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (lg and above) */}
      <aside className="hidden lg:flex w-[260px] flex-shrink-0 flex-col h-screen sticky top-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Below lg) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-[#262320]/40 backdrop-blur-xs transition-opacity animate-fadeIn"
          />

          {/* Sliding Drawer Container */}
          <div className="relative w-[280px] max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
