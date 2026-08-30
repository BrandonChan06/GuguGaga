import { useState, useMemo } from 'react'
import { Screen, ItineraryItem, ExpenseItem, BookingItem, VoteItem, WantToGoItem, SquadMember } from './types'
import {
  INITIAL_MEMBERS,
  INITIAL_ITINERARY,
  INITIAL_EXPENSES,
  INITIAL_BOOKINGS,
  INITIAL_VOTES,
  INITIAL_WANT_TO_GO,
  INITIAL_PACKING,
  EXCHANGE_RATES
} from './data/mockData'

// Components & Modals
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import {
  ModalAddItinerary,
  ModalAddExpense,
  ModalAddBooking,
  ModalAddVote,
  ModalAddWantToGo,
  ModalCurrencyConverter,
  ModalShareAndAccessibility,
  ModalAIAssistant,
  ModalReceiptViewer
} from './components/Modals'

// Page Views
import DashboardView from './pages/DashboardView'
import ItineraryView from './pages/ItineraryView'
import CalendarView from './pages/CalendarView'
import BudgetView from './pages/BudgetView'
import BookingsView from './pages/BookingsView'
import GroupHubView from './pages/GroupHubView'

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  
  // State for dynamic lists
  const [squad] = useState<SquadMember[]>(INITIAL_MEMBERS)
  const [itinerary, setItinerary] = useState<Record<string, ItineraryItem[]>>(INITIAL_ITINERARY)
  const [selectedDay, setSelectedDay] = useState<string>('day1')
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES)
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS)
  const [votes, setVotes] = useState<VoteItem[]>(INITIAL_VOTES)
  const [wantToGo, setWantToGo] = useState<WantToGoItem[]>(INITIAL_WANT_TO_GO)
  const [packing, setPacking] = useState(INITIAL_PACKING)
  
  // Quick tools & Modals state
  const [homeCurrency, setHomeCurrency] = useState<string>('USD')
  const [planBOpen, setPlanBOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [receiptViewerModal, setReceiptViewerModal] = useState<string | null>(null)
  
  // CRUD Modals state
  const [showAddItineraryModal, setShowAddItineraryModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showAddBookingModal, setShowAddBookingModal] = useState(false)
  const [showAddVoteModal, setShowAddVoteModal] = useState(false)
  const [showAddWantToGoModal, setShowAddWantToGoModal] = useState(false)
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)

  // ── Currency Conversion Helpers ──────────────────────────────────────────

  const convertEURTo = (amountEUR: number, targetCurr: string = homeCurrency): string => {
    const info = EXCHANGE_RATES[targetCurr] || EXCHANGE_RATES.USD
    const converted = amountEUR * info.rate
    return `${info.symbol}${Math.round(converted).toLocaleString()}`
  }

  // ── Budget & Splitting Dynamic Calculations ──────────────────────────────

  const totalSpentEUR = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amountEUR, 0)
  }, [expenses])

  const totalBudgetEUR = 8000
  const budgetPercentage = Math.min(100, Math.round((totalSpentEUR / totalBudgetEUR) * 100))

  // Calculate debt settlements dynamically based on expenses
  const settlements = useMemo(() => {
    const balances: Record<string, number> = {}
    squad.forEach(m => { balances[m.name] = 0 })

    expenses.forEach(exp => {
      const splitCount = exp.splitWith.length || squad.length
      const perPerson = exp.amountEUR / splitCount
      balances[exp.paidBy] = (balances[exp.paidBy] || 0) + exp.amountEUR
      exp.splitWith.forEach(name => {
        balances[name] = (balances[name] || 0) - perPerson
      })
    })

    const debtors: { name: string; amount: number }[] = []
    const creditors: { name: string; amount: number }[] = []

    Object.entries(balances).forEach(([name, bal]) => {
      if (bal < -1) debtors.push({ name, amount: -bal })
      else if (bal > 1) creditors.push({ name, amount: bal })
    })

    debtors.sort((a, b) => b.amount - a.amount)
    creditors.sort((a, b) => b.amount - a.amount)

    const transfers: { from: string; to: string; amount: number }[] = []
    let d = 0, c = 0
    while (d < debtors.length && c < creditors.length) {
      const debt = debtors[d].amount
      const cred = creditors[c].amount
      const settled = Math.min(debt, cred)
      transfers.push({ from: debtors[d].name, to: creditors[c].name, amount: Math.round(settled) })
      debtors[d].amount -= settled
      creditors[c].amount -= settled
      if (debtors[d].amount < 1) d++
      if (creditors[c].amount < 1) c++
    }
    return transfers
  }, [expenses, squad])

  // ── Handlers for Adding & Deleting across lists ──────────────────────────

  // Itinerary Handlers
  const deleteItineraryItem = (day: string, id: string) => {
    setItinerary(prev => ({
      ...prev,
      [day]: (prev[day] || []).filter(item => item.id !== id)
    }))
  }

  const addItineraryItem = (newItem: Omit<ItineraryItem, 'id'>) => {
    const id = 'it_' + Date.now()
    setItinerary(prev => ({
      ...prev,
      [newItem.day]: [...(prev[newItem.day] || []), { ...newItem, id }]
    }))
    setShowAddItineraryModal(false)
  }

  const swapPlanBActivity = (alt: { name: string; emoji: string; time: string; price: string }) => {
    const newStop: ItineraryItem = {
      id: 'it_alt_' + Date.now(),
      day: selectedDay,
      time: '15:00',
      endTime: '17:30',
      name: alt.name + ' (Plan B Indoor Alternative)',
      emoji: alt.emoji,
      loc: 'Central Rome Indoor Venue',
      note: 'Swapped into itinerary to stay dry during rain forecast.',
      cost: alt.price,
      travelTime: '10 min metro',
      travelMode: 'metro',
      pin: { x: 45, y: 40 },
      colorClass: 'bg-amber-50 border-amber-300'
    }
    setItinerary(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newStop]
    }))
    setPlanBOpen(false)
  }

  // Expense Handlers
  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const addExpense = (newExp: Omit<ExpenseItem, 'id' | 'badgeClass'>) => {
    const badgeMap: Record<string, string> = {
      Transport: 'bg-blue-50 text-blue-700',
      Hotel: 'bg-emerald-50 text-emerald-700',
      Activities: 'bg-amber-50 text-amber-700',
      Dining: 'bg-rose-50 text-rose-700',
      Shopping: 'bg-purple-50 text-purple-700',
      Other: 'bg-gray-50 text-gray-700'
    }
    const item: ExpenseItem = {
      ...newExp,
      id: 'exp_' + Date.now(),
      badgeClass: badgeMap[newExp.category] || 'bg-blue-50 text-blue-700'
    }
    setExpenses(prev => [item, ...prev])
    setShowAddExpenseModal(false)
  }

  // Booking Handlers
  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  const toggleBookingStatus = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'booked' ? 'pending' : 'booked' } : b))
  }

  const addBooking = (newB: Omit<BookingItem, 'id'>) => {
    const item: BookingItem = { ...newB, id: 'b_' + Date.now() }
    setBookings(prev => [item, ...prev])
    setShowAddBookingModal(false)
  }

  // Voting Handlers
  const handleVote = (id: string, type: 'up' | 'down') => {
    setVotes(prev => prev.map(v => {
      if (v.id !== id) return v
      if (v.myVote === type) {
        return {
          ...v,
          up: type === 'up' ? v.up - 1 : v.up,
          down: type === 'down' ? v.down - 1 : v.down,
          myVote: null
        }
      }
      const prevVote = v.myVote
      return {
        ...v,
        up: type === 'up' ? v.up + 1 : prevVote === 'up' ? v.up - 1 : v.up,
        down: type === 'down' ? v.down + 1 : prevVote === 'down' ? v.down - 1 : v.down,
        myVote: type
      }
    }))
  }

  const deleteVote = (id: string) => {
    setVotes(prev => prev.filter(v => v.id !== id))
  }

  const addVoteItem = (newItem: Omit<VoteItem, 'id' | 'up' | 'down' | 'myVote'>) => {
    const item: VoteItem = {
      ...newItem,
      id: 'v_' + Date.now(),
      up: 1,
      down: 0,
      myVote: 'up'
    }
    setVotes(prev => [item, ...prev])
    setShowAddVoteModal(false)
  }

  // Want-to-Go Handlers
  const deleteWantToGo = (id: string) => {
    setWantToGo(prev => prev.filter(w => w.id !== id))
  }

  const addWantToGo = (newItem: Omit<WantToGoItem, 'id'>) => {
    const item: WantToGoItem = { ...newItem, id: 'w_' + Date.now() }
    setWantToGo(prev => [item, ...prev])
    setShowAddWantToGoModal(false)
  }

  // Packing List Handlers
  const togglePackItem = (cat: string, itemId: string) => {
    setPacking(prev => ({
      ...prev,
      [cat]: (prev[cat] || []).map(i => i.id === itemId ? { ...i, checked: !i.checked } : i)
    }))
  }

  const deletePackItem = (cat: string, itemId: string) => {
    setPacking(prev => ({
      ...prev,
      [cat]: (prev[cat] || []).filter(i => i.id !== itemId)
    }))
  }

  const addPackItem = (cat: string, itemText: string) => {
    if (!itemText.trim()) return
    const newItem = { id: 'p_' + Date.now(), item: itemText.trim(), checked: false }
    setPacking(prev => ({
      ...prev,
      [cat]: [...(prev[cat] || []), newItem]
    }))
  }

  const deletePackingCategory = (cat: string) => {
    setPacking(prev => {
      const next = { ...prev }
      delete next[cat]
      return next
    })
  }

  const generateAIPackingList = () => {
    setPacking({
      '👔 Smart Climate Clothing (28°C Rome)': [
        { id: 'gen1', item: 'Lightweight linen shirts & breathable tops × 6', checked: true },
        { id: 'gen2', item: 'Ultra-cushion walking trainers (18k steps/day)', checked: true },
        { id: 'gen3', item: 'Evening dinner chic blazer / wrap dress', checked: false },
        { id: 'gen4', item: 'Modest cathedral dress cover (knees + shoulders)', checked: true },
        { id: 'gen5', item: 'Compact UV sun protection umbrella / hat', checked: false },
      ],
      '🧴 Sun & Wellness Shield': [
        { id: 'gen6', item: 'Broad spectrum SPF 50+ face sunscreen', checked: true },
        { id: 'gen7', item: 'Electrolyte hydration tablets (for warm afternoons)', checked: true },
        { id: 'gen8', item: 'Compeed anti-friction blister relief pads', checked: true },
        { id: 'gen9', item: 'Insect repellent wipes for Tiber evening walks', checked: false },
      ],
      '⚡ Tech & Mobility Essentials': [
        { id: 'gen10', item: 'Dual EU fast-charging plug + 3-in-1 cable', checked: true },
        { id: 'gen11', item: 'High capacity magnetic power bank', checked: true },
        { id: 'gen12', item: 'AirTag tracking pucks in checked luggage', checked: true },
      ],
      '📋 Travel Insurance & Passes': [
        { id: 'gen13', item: 'Rome Pass & Colosseum digital QR vouchers', checked: true },
        { id: 'gen14', item: 'International EU health insurance card', checked: true },
        { id: 'gen15', item: 'Emergency contacts & accessibility card in Italian', checked: true },
      ]
    })
  }

  const bookedCount = bookings.filter(b => b.status === 'booked').length

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* ── Left Sidebar ───────────────────────────────────────────────────── */}
      <Sidebar
        active={screen}
        onNavigate={setScreen}
        selectedDayStopsCount={(itinerary[selectedDay] || []).length}
        budgetPercentage={budgetPercentage}
        bookedCount={bookedCount}
        totalBookings={bookings.length}
        squadCount={squad.length}
        homeCurrency={homeCurrency}
        setHomeCurrency={setHomeCurrency}
        onOpenCalculator={() => setShowCurrencyModal(true)}
        onOpenShare={() => setShareModalOpen(true)}
        onOpenAI={() => setAiAssistantOpen(true)}
      />

      {/* ── Main Content Area ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        
        {/* Global Top Header */}
        <TopHeader
          onOpenAI={() => setAiAssistantOpen(true)}
          onOpenShare={() => setShareModalOpen(true)}
          onNavigateToBookings={() => setScreen('bookings')}
        />

        {/* Active Screen View */}
        <main className={`flex-1 ${screen === 'itinerary' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          {screen === 'dashboard' && (
            <DashboardView
              itinerary={itinerary}
              expenses={expenses}
              bookings={bookings}
              totalSpentEUR={totalSpentEUR}
              totalBudgetEUR={totalBudgetEUR}
              budgetPercentage={budgetPercentage}
              homeCurrency={homeCurrency}
              convertEURTo={convertEURTo}
              onNavigate={setScreen}
              onOpenAI={() => setAiAssistantOpen(true)}
              onOpenReceipt={(receiptName) => setReceiptViewerModal(receiptName)}
            />
          )}

          {screen === 'itinerary' && (
            <ItineraryView
              itinerary={itinerary}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onDeleteItem={deleteItineraryItem}
              onOpenAddModal={() => setShowAddItineraryModal(true)}
              planBOpen={planBOpen}
              setPlanBOpen={setPlanBOpen}
              onSwapPlanB={swapPlanBActivity}
            />
          )}

          {screen === 'calendar' && (
            <CalendarView
              itinerary={itinerary}
              bookings={bookings}
              selectedDay={selectedDay}
              onSelectDay={(d) => { setSelectedDay(d); setScreen('itinerary') }}
              onOpenAddModal={() => setShowAddItineraryModal(true)}
            />
          )}

          {screen === 'budget' && (
            <BudgetView
              expenses={expenses}
              squad={squad}
              settlements={settlements}
              totalSpentEUR={totalSpentEUR}
              totalBudgetEUR={totalBudgetEUR}
              budgetPercentage={budgetPercentage}
              homeCurrency={homeCurrency}
              convertEURTo={convertEURTo}
              onDeleteExpense={deleteExpense}
              onOpenAddExpense={() => setShowAddExpenseModal(true)}
              onOpenReceipt={(name) => setReceiptViewerModal(name)}
              onOpenConverter={() => setShowCurrencyModal(true)}
            />
          )}

          {screen === 'bookings' && (
            <BookingsView
              bookings={bookings}
              onToggleStatus={toggleBookingStatus}
              onDeleteBooking={deleteBooking}
              onOpenAddBooking={() => setShowAddBookingModal(true)}
              onOpenReceipt={(r) => setReceiptViewerModal(r)}
            />
          )}

          {screen === 'group' && (
            <GroupHubView
              squad={squad}
              votes={votes}
              wantToGo={wantToGo}
              packing={packing}
              onVote={handleVote}
              onDeleteVote={deleteVote}
              onOpenAddVote={() => setShowAddVoteModal(true)}
              onDeleteWantToGo={deleteWantToGo}
              onOpenAddWantToGo={() => setShowAddWantToGoModal(true)}
              onTogglePackItem={togglePackItem}
              onDeletePackItem={deletePackItem}
              onAddPackItem={addPackItem}
              onDeletePackingCategory={deletePackingCategory}
              onGenerateAIPacking={generateAIPackingList}
              onOpenShare={() => setShareModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────── */}

      {showAddItineraryModal && (
        <ModalAddItinerary
          day={selectedDay}
          onClose={() => setShowAddItineraryModal(false)}
          onAdd={addItineraryItem}
        />
      )}

      {showAddExpenseModal && (
        <ModalAddExpense
          squad={squad}
          onClose={() => setShowAddExpenseModal(false)}
          onAdd={addExpense}
        />
      )}

      {showAddBookingModal && (
        <ModalAddBooking
          onClose={() => setShowAddBookingModal(false)}
          onAdd={addBooking}
        />
      )}

      {showAddVoteModal && (
        <ModalAddVote
          onClose={() => setShowAddVoteModal(false)}
          onAdd={addVoteItem}
        />
      )}

      {showAddWantToGoModal && (
        <ModalAddWantToGo
          squad={squad}
          onClose={() => setShowAddWantToGoModal(false)}
          onAdd={addWantToGo}
        />
      )}

      {showCurrencyModal && (
        <ModalCurrencyConverter
          homeCurrency={homeCurrency}
          onClose={() => setShowCurrencyModal(false)}
        />
      )}

      {shareModalOpen && (
        <ModalShareAndAccessibility
          squad={squad}
          onClose={() => setShareModalOpen(false)}
        />
      )}

      {aiAssistantOpen && (
        <ModalAIAssistant
          onClose={() => setAiAssistantOpen(false)}
          onAddDestination={(dest) => {
            alert(`AI Suggestion "${dest}" added to trip inspiration!`)
            setAiAssistantOpen(false)
          }}
        />
      )}

      {receiptViewerModal && (
        <ModalReceiptViewer
          receiptName={receiptViewerModal}
          onClose={() => setReceiptViewerModal(null)}
        />
      )}

    </div>
  )
}
