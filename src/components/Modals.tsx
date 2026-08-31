import { useState } from 'react'
import { ItineraryItem, ExpenseItem, BookingItem, VoteItem, WantToGoItem, SquadMember } from '../types'
import { EXCHANGE_RATES } from '../data/mockData'
import { IconClose, IconBot } from './icons'

export function ModalAddItinerary({
  day,
  onClose,
  onAdd
}: {
  day: string
  onClose: () => void
  onAdd: (item: Omit<ItineraryItem, 'id'>) => void
}) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('10:00')
  const [endTime, setEndTime] = useState('12:00')
  const [loc, setLoc] = useState('')
  const [emoji, setEmoji] = useState('🏛️')
  const [note, setNote] = useState('')
  const [cost, setCost] = useState('€15')
  const [travelTime, setTravelTime] = useState('15 min walk')

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[480px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-extrabold text-slate-900">Add Itinerary Activity ({day.toUpperCase()})</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3 text-[12px]">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Activity Name & Icon</label>
            <div className="flex gap-2">
              <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-12 text-center text-lg p-2 rounded-xl bg-slate-50 border border-slate-200" />
              <input type="text" placeholder="e.g. Borghese Gallery Tour" value={name} onChange={e => setName(e.target.value)} className="flex-1 p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Start Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">End Time</label>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Location Address</label>
            <input type="text" placeholder="e.g. Piazzale Scipione Borghese 5" value={loc} onChange={e => setLoc(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Estimated Cost</label>
              <input type="text" placeholder="e.g. €28" value={cost} onChange={e => setCost(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Transit Time to Next Stop</label>
              <input type="text" placeholder="e.g. 15 min walk" value={travelTime} onChange={e => setTravelTime(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Notes & Confirmation Details</label>
            <textarea rows={2} placeholder="e.g. Priority skip-the-line entrance tickets booked" value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-600 font-bold text-[12px]">Cancel</button>
          <button onClick={() => {
            if (!name.trim()) return
            onAdd({
              day,
              name,
              time,
              endTime,
              loc: loc || 'Rome City Center',
              emoji: emoji || '📍',
              note,
              cost,
              travelTime,
              travelMode: 'walk',
              pin: { x: 45 + Math.random() * 20, y: 35 + Math.random() * 25 },
              colorClass: 'bg-blue-50 border-blue-200'
            })
          }} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm">
            Add to Itinerary
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalAddExpense({
  squad,
  onClose,
  onAdd
}: {
  squad: SquadMember[]
  onClose: () => void
  onAdd: (item: Omit<ExpenseItem, 'id' | 'badgeClass'>) => void
}) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('50')
  const [category, setCategory] = useState<ExpenseItem['category']>('Dining')
  const [paidBy, setPaidBy] = useState(squad[0]?.name || 'Sarah Chen')
  const [splitWith, setSplitWith] = useState<string[]>(squad.map(s => s.name))
  const [receiptName, setReceiptName] = useState('dinner-receipt.pdf')

  const toggleSplit = (name: string) => {
    if (splitWith.includes(name)) {
      setSplitWith(splitWith.filter(n => n !== name))
    } else {
      setSplitWith([...splitWith, name])
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[460px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-extrabold text-slate-900">Add New Expense</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3 text-[12px]">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Expense Description</label>
            <input type="text" placeholder="e.g. Gelato & Coffee near Pantheon" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Amount in EUR (€)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as ExpenseItem['category'])} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                <option value="Dining">Dining 🍝</option>
                <option value="Activities">Activities 🏛️</option>
                <option value="Transport">Transport ✈️</option>
                <option value="Hotel">Hotel 🏨</option>
                <option value="Shopping">Shopping 🛍️</option>
                <option value="Other">Other 📦</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Paid By</label>
            <select value={paidBy} onChange={e => setPaidBy(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200">
              {squad.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Split With ({splitWith.length} people)</label>
            <div className="flex flex-wrap gap-2">
              {squad.map(m => {
                const checked = splitWith.includes(m.name)
                return (
                  <button key={m.id} type="button" onClick={() => toggleSplit(m.name)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                      checked ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                    {m.name.split(' ')[0]} {checked ? '✓' : '+'}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Attach Receipt Filename</label>
            <input type="text" placeholder="e.g. receipt-image.pdf" value={receiptName} onChange={e => setReceiptName(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-600 font-bold text-[12px]">Cancel</button>
          <button onClick={() => {
            if (!name.trim()) return
            const parsed = parseFloat(amount) || 0
            onAdd({
              name,
              amountEUR: parsed,
              category,
              emoji: category === 'Dining' ? '🍝' : category === 'Transport' ? '✈️' : category === 'Hotel' ? '🏨' : '🏛️',
              date: new Date().toISOString().split('T')[0],
              paidBy,
              splitWith: splitWith.length ? splitWith : [paidBy],
              receiptName: receiptName.trim() || undefined
            })
          }} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm">
            Save Expense
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalAddBooking({
  onClose,
  onAdd
}: {
  onClose: () => void
  onAdd: (b: Omit<BookingItem, 'id'>) => void
}) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<BookingItem['type']>('Activity')
  const [provider, setProvider] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('REF-' + Math.floor(10000 + Math.random() * 90000))
  const [date, setDate] = useState('Sep 14, 2026')
  const [price, setPrice] = useState('€75')
  const [status, setStatus] = useState<'booked' | 'pending'>('booked')
  const [notes, setNotes] = useState('')

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[460px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-extrabold text-slate-900">Add Booking / Pass</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3 text-[12px]">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Booking Title</label>
            <input type="text" placeholder="e.g. Trenitalia High-Speed Florence Pass" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value as BookingItem['type'])} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200">
                <option value="Flight">Flight ✈️</option>
                <option value="Hotel">Hotel 🏨</option>
                <option value="Activity">Activity 🏛️</option>
                <option value="Transit">Transit 🚄</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as 'booked' | 'pending')} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-blue-600">
                <option value="booked">Booked & Confirmed ✅</option>
                <option value="pending">Pending / Need to Book ⏳</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Provider</label>
              <input type="text" placeholder="e.g. Trenitalia / Booking.com" value={provider} onChange={e => setProvider(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Total Price</label>
              <input type="text" placeholder="e.g. €120" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Date & Time</label>
              <input type="text" placeholder="e.g. Sep 14, 2026" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Confirmation Code</label>
              <input type="text" value={confirmationCode} onChange={e => setConfirmationCode(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-mono" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Notes & Reference Details</label>
            <textarea rows={2} placeholder="e.g. Show QR code at platform turnstile" value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-600 font-bold text-[12px]">Cancel</button>
          <button onClick={() => {
            if (!title.trim()) return
            onAdd({
              title,
              type,
              emoji: type === 'Flight' ? '✈️' : type === 'Hotel' ? '🏨' : type === 'Transit' ? '🚄' : '🏛️',
              provider: provider || 'Direct Provider',
              confirmationCode,
              date,
              price,
              status,
              notes,
              receiptUrl: 'voucher-' + confirmationCode.toLowerCase() + '.pdf'
            })
          }} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm">
            Save Booking
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalAddVote({
  onClose,
  onAdd
}: {
  onClose: () => void
  onAdd: (v: Omit<VoteItem, 'id' | 'up' | 'down' | 'myVote'>) => void
}) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🛵')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('€50/person')
  const [category, setCategory] = useState('Tour')

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[420px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-extrabold text-slate-900">Suggest Activity for Voting</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3 text-[12px]">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Emoji & Name</label>
            <div className="flex gap-2">
              <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-12 text-center text-lg p-2 rounded-xl bg-slate-50 border border-slate-200" />
              <input type="text" placeholder="e.g. Sunset Boat Cruise along Tiber" value={name} onChange={e => setName(e.target.value)} className="flex-1 p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Description</label>
            <textarea rows={2} placeholder="e.g. 90-minute scenic river cruise with wine & snacks" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Estimated Price</label>
              <input type="text" placeholder="e.g. €45/person" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <input type="text" placeholder="e.g. Cruise / Food" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-600 font-bold text-[12px]">Cancel</button>
          <button onClick={() => {
            if (!name.trim()) return
            onAdd({
              name,
              emoji: emoji || '✨',
              desc,
              price,
              suggestedBy: 'Sarah C.',
              category: category || 'Activity'
            })
          }} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px]">
            Add Option
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalAddWantToGo({
  squad,
  onClose,
  onAdd
}: {
  squad: SquadMember[]
  onClose: () => void
  onAdd: (w: Omit<WantToGoItem, 'id'>) => void
}) {
  const [member, setMember] = useState(squad[0]?.name || 'Sarah Chen')
  const [title, setTitle] = useState('')
  const [type, setType] = useState<WantToGoItem['type']>('Must-See')
  const [notes, setNotes] = useState('')
  const [priority, setPriority] = useState<WantToGoItem['priority']>('High')

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[420px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-extrabold text-slate-900">Add Want-To-Go Wishlist Item</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3 text-[12px]">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Requested By</label>
            <select value={member} onChange={e => setMember(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200">
              {squad.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Place or Experience Name</label>
            <input type="text" placeholder="e.g. Try Trapizzino in Trastevere" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value as WantToGoItem['type'])} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200">
                <option value="Must-See">Must-See 🏛️</option>
                <option value="Food & Drink">Food & Drink 🍝</option>
                <option value="Experience">Experience 🎭</option>
                <option value="Photo Spot">Photo Spot 📸</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value as WantToGoItem['priority'])} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold">
                <option value="High">High Priority 🔥</option>
                <option value="Medium">Medium Priority ✨</option>
                <option value="Nice to have">Nice to have 💫</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Specific Details / Recommendations</label>
            <textarea rows={2} placeholder="e.g. Famous stuffed pizza pockets, best after 2 PM" value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-600 font-bold text-[12px]">Cancel</button>
          <button onClick={() => {
            if (!title.trim()) return
            const memObj = squad.find(m => m.name === member) || squad[0]
            onAdd({
              member,
              memberInitials: memObj.initials,
              memberGrad: memObj.grad,
              title,
              type,
              notes,
              priority
            })
          }} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12px]">
            Add Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalCurrencyConverter({
  homeCurrency,
  onClose
}: {
  homeCurrency: string
  onClose: () => void
}) {
  const [amount, setAmount] = useState('100')
  const [fromCurr, setFromCurr] = useState('EUR')
  const [toCurr, setToCurr] = useState(homeCurrency)

  const parsed = parseFloat(amount) || 0
  const fromRate = EXCHANGE_RATES[fromCurr]?.rate || 1
  const toRate = EXCHANGE_RATES[toCurr]?.rate || 1
  const converted = (parsed / fromRate) * toRate

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[420px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[16px] font-extrabold text-slate-900">Live Currency Calculator</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3 text-[12px]">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Enter Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-black text-slate-900" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">From</label>
              <select value={fromCurr} onChange={e => setFromCurr(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold">
                {Object.keys(EXCHANGE_RATES).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">To</label>
              <select value={toCurr} onChange={e => setToCurr(e.target.value)} className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-blue-600">
                {Object.keys(EXCHANGE_RATES).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 text-center space-y-1 mt-2">
            <div className="text-[11px] font-bold text-blue-600 uppercase">Converted Result</div>
            <div className="text-2xl font-black text-blue-800">
              {EXCHANGE_RATES[toCurr]?.symbol}{converted.toFixed(2)} {toCurr}
            </div>
            <div className="text-[10px] text-slate-500">Rate: 1 {fromCurr} = {(toRate / fromRate).toFixed(4)} {toCurr}</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[12px]">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalShareAndAccessibility({
  squad,
  onClose
}: {
  squad: SquadMember[]
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[520px] w-full p-6 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-[16px] font-extrabold text-slate-900">Trip Sharing & Accessibility Suite</h3>
            <p className="text-[11px] text-slate-400">Collaborative link sharing + traveler accessibility profiles</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        {/* Share Link & QR */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Collaborator Invite Link</span>
          <div className="flex items-center gap-2">
            <input type="text" readOnly value="https://wayfarer.app/trip/rome-2026-squad-sc89"
              className="flex-1 p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-700 select-all" />
            <button onClick={() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }} className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold">
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Permissions: <strong>Editor (Can vote & add items)</strong></span>
            <button onClick={() => alert('PDF export generated!')} className="text-blue-600 font-bold hover:underline">
              Export PDF Itinerary
            </button>
          </div>
        </div>

        {/* Accessibility Profiles List */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
            Traveler Accessibility Profiles ({squad.length})
          </span>

          {squad.map(m => (
            <div key={m.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${m.grad} flex items-center justify-center text-white text-[10px] font-bold`}>
                    {m.initials}
                  </div>
                  <span className="text-[12px] font-bold text-slate-900">{m.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{m.role}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                  <span className="text-[9px] font-bold text-violet-600 uppercase block">Mobility / Transit</span>
                  <span className="text-slate-700">{m.accessibility.mobility || 'Step-free transit enabled'}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                  <span className="text-[9px] font-bold text-emerald-600 uppercase block">Dietary Preferences</span>
                  <span className="text-slate-700">{m.accessibility.dietary || 'No dietary restrictions'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-[12px]">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModalAIAssistant({
  onClose,
  onAddDestination
}: {
  onClose: () => void
  onAddDestination: (d: string) => void
}) {
  const [activeTab, setActiveTab] = useState<'concierge' | 'explore' | 'tools'>('concierge')
  const [selectedVibe, setSelectedVibe] = useState('Coastal & Warm')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "Ciao Sarah! I'm your AI Travel Concierge for Rome. I can help with restaurant picks, skip-the-line tips, weather adjustments, or walking routes. How can I help today?"
    }
  ])

  const recommendations = [
    {
      title: 'Maldives · Baa Atoll Biosphere',
      score: '99% Match',
      vibe: 'Coastal & Warm',
      reviewsSummary: 'Ranked #1 for tranquility & relaxation. Crystal lagoon waters, overwater villas with private reef access, and zero crowds for post-city recharge.',
      bestMonths: 'Nov – Apr',
      estBudget: '€850/person'
    },
    {
      title: 'Kyoto & Hakone, Japan',
      score: '96% Match',
      vibe: 'Cultural & Historic',
      reviewsSummary: 'Traditional ryokan hot springs with Mount Fuji views, bamboo groves, and world-renowned kaiseki culinary scene.',
      bestMonths: 'Oct – Nov',
      estBudget: '€920/person'
    },
    {
      title: 'Reykjavik & South Coast, Iceland',
      score: '93% Match',
      vibe: 'Adventure & Aurora',
      reviewsSummary: 'Geothermal Blue Lagoon baths, majestic cascading waterfalls, and peak northern lights viewing windows.',
      bestMonths: 'Sep – Mar',
      estBudget: '€780/person'
    }
  ]

  const quickPrompts = [
    'Best carbonara near Piazza Navona?',
    'What is Vatican dress code?',
    'Day 4 rain alternatives in Rome',
    'Colosseum skip-the-line tips'
  ]

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || chatInput
    if (!q.trim()) return

    const userMsg = q.trim()
    setChatInput('')

    let reply = "Here's what I found for Rome: The best timing is early morning before 10 AM or late afternoon after 4 PM to avoid crowds. Don't forget comfortable walking shoes!"
    if (userMsg.toLowerCase().includes('carbonara') || userMsg.toLowerCase().includes('restaurant') || userMsg.toLowerCase().includes('food')) {
      reply = "Top pick: 'Trattoria Da Enzo al 29' in Trastevere or 'Roscioli Salumeria con Cucina'. Arrive 15 mins before opening or book well in advance!"
    } else if (userMsg.toLowerCase().includes('vatican') || userMsg.toLowerCase().includes('dress')) {
      reply = "Strict Vatican & Basilica rule: Shoulders and knees must be fully covered for all travelers. Pack a lightweight linen scarf in your day bag."
    } else if (userMsg.toLowerCase().includes('rain') || userMsg.toLowerCase().includes('plan b')) {
      reply = "For rainy weather in Rome: Visit the Capitoline Museums, explore Galleria Borghese (booking required), or enjoy a pasta masterclass indoors in Campo de' Fiori."
    } else if (userMsg.toLowerCase().includes('colosseum')) {
      reply = "Colosseum entry requires matching photo ID with the ticket name. Enter via the Stern gate for booked group skip-the-line access."
    }

    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: userMsg },
      { role: 'assistant', text: reply }
    ])
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[620px] w-full p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <IconBot size={16} color="white" />
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-slate-900">Ask Wayfarer AI</h3>
              <p className="text-[11px] text-slate-400">Intelligent travel assistant, recommendations & concierge</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><IconClose size={18} /></button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-[12px] font-bold flex-shrink-0">
          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'concierge' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🏛️ Rome Concierge & Tips
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'explore' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🏝️ Explore Destinations
          </button>
        </div>

        {/* Tab 1: Concierge & Q&A */}
        {activeTab === 'concierge' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-hidden">
            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap gap-1.5 flex-shrink-0">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 min-h-[220px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-[12px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
              <input
                type="text"
                placeholder="Ask about Rome tickets, restaurants, routes, tips..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Explore Destinations */}
        {activeTab === 'explore' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {/* Vibe Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                Filter Inspiration by Vibe
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Coastal & Warm', 'Cultural & Historic', 'Adventure & Aurora'].map(v => (
                  <button
                    key={v}
                    onClick={() => setSelectedVibe(v)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      selectedVibe === v ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination cards */}
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:border-indigo-300 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-extrabold text-slate-900">{rec.title}</h4>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                      {rec.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                    ⭐ <strong>AI Summary:</strong> {rec.reviewsSummary}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">
                      Season: <strong className="text-slate-700">{rec.bestMonths}</strong> · Est: <strong className="text-slate-700">{rec.estBudget}</strong>
                    </span>
                    <button
                      onClick={() => onAddDestination(rec.title)}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold cursor-pointer"
                    >
                      + Save to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[12px] cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export function ModalReceiptViewer({
  receiptName,
  onClose
}: {
  receiptName: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[500px] w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <div>
              <h3 className="text-[15px] font-extrabold text-slate-900">{receiptName}</h3>
              <p className="text-[10px] text-slate-400">Verified digital voucher & expense proof</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><IconClose size={18} /></button>
        </div>

        {/* Document Simulation Mockup */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <div>
            <div className="text-[14px] font-bold text-slate-900">Official Confirmation Document</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Stored with 256-bit encryption in Wayfarer Vault</div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-left text-[11px] w-full font-mono text-slate-600 space-y-1">
            <div>FILE_NAME: {receiptName}</div>
            <div>STATUS: VERIFIED & CONFIRMED</div>
            <div>TIMESTAMP: 2026-09-12T08:15:00Z</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button onClick={() => alert(`Downloading ${receiptName}...`)}
            className="text-[11px] font-bold text-blue-600 hover:underline">
            Download File (PDF)
          </button>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-[12px]">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  )
}
