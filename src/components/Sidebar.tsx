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
    { id: 'dashboard', label: 'Dashboard', Icon: IconGrid },
    { id: 'itinerary', label: 'Itinerary', Icon: IconMap, badge: `${selectedDayStopsCount} stops` },
    { id: 'calendar', label: 'Calendar', Icon: IconCalendar, badge: '7 Days' },
    { id: 'budget', label: 'Budget', Icon: IconWallet, badge: `${budgetPercentage}%`, badgeColor: budgetPercentage > 85 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700' },
    { id: 'bookings', label: 'Bookings', Icon: IconTicket, badge: `${bookedCount}/${totalBookings}` },
    { id: 'group', label: 'Group', Icon: IconUsers, badge: `${squadCount} active` },
  ] as const

  const handleNavClick = (screenId: Screen) => {
    onNavigate(screenId)
    if (onCloseMobile) onCloseMobile()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand & Mobile Close */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white text-base font-black tracking-tight">W</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 text-[16px] tracking-tight block leading-tight">Wayfarer</span>
            <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Travel Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              onOpenAI()
              if (onCloseMobile) onCloseMobile()
            }}
            title="Ask Wayfarer AI"
            className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <IconBot size={15} />
          </button>

          {/* Close button for mobile drawer */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Close menu"
            >
              <IconClose size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Upcoming Trips Switcher */}
      <div className="px-4 pt-3.5 pb-3 border-b border-slate-100 relative" ref={dropdownRef}>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Trips</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            currentTrip.status === 'Confirmed' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
          }`}>
            {currentTrip.status}
          </span>
        </div>

        {/* Selected Trip Button */}
        <button
          type="button"
          onClick={() => setTripDropdownOpen(prev => !prev)}
          className="w-full flex items-center gap-2.5 p-2 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 transition-all text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 shadow-xs">
            <img src={currentTrip.imageUrl} alt={currentTrip.destination} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold text-slate-900 leading-tight truncate flex items-center gap-1">
              <span>{currentTrip.destination}, {currentTrip.country}</span>
              <span>{currentTrip.flag}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">{currentTrip.dates}</div>
          </div>
          <div className={`text-slate-400 transition-transform duration-200 ${tripDropdownOpen ? 'rotate-180' : ''}`}>
            <IconChevronDown size={14} />
          </div>
        </button>

        {/* Dropdown Menu for Switching Between Trips */}
        {tripDropdownOpen && (
          <div className="absolute top-[calc(100%-4px)] left-3 right-3 z-30 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 space-y-1 animate-fadeIn">
            <div className="px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Switch Planning Trip
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
                      ? 'bg-blue-50/80 text-blue-900 border border-blue-200/60'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                    <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold leading-tight truncate flex items-center justify-between">
                      <span>{trip.destination}, {trip.country} {trip.flag}</span>
                      {isSelected && <IconCheck size={11} color="#2563EB" />}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span>{trip.dates}</span>
                      <span className={`text-[9px] font-bold ${trip.status === 'Confirmed' ? 'text-emerald-600' : 'text-amber-600'}`}>
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

      {/* Simplified Navigation (6 core items) */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, Icon, badge, badgeColor }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id as Screen)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <Icon size={17} color={isActive ? 'white' : '#64748B'} />
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

      {/* Ask Wayfarer AI Quick Launch Banner */}
      <div className="px-3 py-2 border-t border-slate-100">
        <button
          onClick={() => {
            onOpenAI()
            if (onCloseMobile) onCloseMobile()
          }}
          className="w-full p-2.5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/80 hover:from-indigo-100/80 hover:to-blue-100/80 border border-indigo-100 transition-all text-left flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <IconBot size={14} color="white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-indigo-950 group-hover:text-indigo-600 transition-colors">
              Ask Wayfarer AI
            </div>
            <div className="text-[10px] text-indigo-600/80 truncate">Concierge & recommendations</div>
          </div>
        </button>
      </div>

      {/* User Profile & Accessibility */}
      <div className="p-3.5 border-t border-slate-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
              SC
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold text-slate-900 leading-tight">Sarah Chen</div>
              <div className="text-[10px] text-slate-400">Lead Organizer</div>
            </div>
          </div>
          <button
            onClick={() => {
              onOpenShare()
              if (onCloseMobile) onCloseMobile()
            }}
            title="Trip Settings & Accessibility"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <IconShare size={14} />
          </button>
        </div>

        <button
          onClick={() => {
            onOpenShare()
            if (onCloseMobile) onCloseMobile()
          }}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-violet-50/70 border border-slate-100 text-left transition-colors cursor-pointer"
        >
          <span className="text-[10px] text-slate-600 font-semibold flex items-center gap-1.5">
            <span>♿</span> Accessibility Active
          </span>
          <span className="text-[9px] font-bold text-violet-600 uppercase">View</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (lg and above) */}
      <aside className="hidden lg:flex w-[260px] flex-shrink-0 border-r border-slate-100 flex-col h-screen sticky top-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Below lg) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn"
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
