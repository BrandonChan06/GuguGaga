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
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[480px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Add Expedition Stop ({day.toUpperCase()})</h3>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3.5 text-[12px]">
          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Activity Name & Emblem</label>
            <div className="flex gap-2">
              <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-12 text-center text-lg p-2 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
              <input type="text" placeholder="e.g. Borghese Gallery Tour" value={name} onChange={e => setName(e.target.value)} className="flex-1 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Start Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] font-medium focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">End Time</label>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] font-medium focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Location Address</label>
            <input type="text" placeholder="e.g. Piazzale Scipione Borghese 5" value={loc} onChange={e => setLoc(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Estimated Cost</label>
              <input type="text" placeholder="e.g. €28" value={cost} onChange={e => setCost(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Transit Time</label>
              <input type="text" placeholder="e.g. 15 min walk" value={travelTime} onChange={e => setTravelTime(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Field Notes & Confirmation Details</label>
            <textarea rows={2} placeholder="e.g. Priority skip-the-line entrance tickets booked" value={note} onChange={e => setNote(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-[#7D766D] hover:text-[#1C1917] font-bold text-[12px] cursor-pointer">Cancel</button>
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
              colorClass: 'bg-[#FAF8F5] border-[#EAE5DC]'
            })
          }} className="px-5 py-2 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white font-bold text-[12px] shadow-sm cursor-pointer">
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
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[460px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Record Expense in Ledger</h3>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3.5 text-[12px]">
          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Expense Description</label>
            <input type="text" placeholder="e.g. Gelato & Espresso near Pantheon" value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Amount in EUR (€)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-bold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as ExpenseItem['category'])} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]">
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
            <label className="font-bold text-[#5C554B] block mb-1">Paid By</label>
            <select value={paidBy} onChange={e => setPaidBy(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]">
              {squad.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1.5">Split With ({splitWith.length} travelers)</label>
            <div className="flex flex-wrap gap-2">
              {squad.map(m => {
                const checked = splitWith.includes(m.name)
                return (
                  <button key={m.id} type="button" onClick={() => toggleSplit(m.name)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      checked 
                        ? 'bg-[#182B49] border-[#182B49] text-white shadow-xs' 
                        : 'bg-[#FAF8F5] border-[#DDD5C7] text-[#7D766D]'
                    }`}>
                    {m.name.split(' ')[0]} {checked ? '✓' : '+'}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Attach Receipt Filename</label>
            <input type="text" placeholder="e.g. receipt-image.pdf" value={receiptName} onChange={e => setReceiptName(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-mono text-[11px] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-[#7D766D] hover:text-[#1C1917] font-bold text-[12px] cursor-pointer">Cancel</button>
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
          }} className="px-5 py-2 rounded-xl bg-[#C25934] hover:bg-[#A94A28] text-white font-bold text-[12px] shadow-sm cursor-pointer">
            Save to Ledger
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
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[460px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Add Booking Pass</h3>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3.5 text-[12px]">
          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Booking Title</label>
            <input type="text" placeholder="e.g. Trenitalia High-Speed Florence Pass" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value as BookingItem['type'])} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]">
                <option value="Flight">Flight ✈️</option>
                <option value="Hotel">Hotel 🏨</option>
                <option value="Activity">Activity 🏛️</option>
                <option value="Transit">Transit 🚄</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Provider / Carrier</label>
              <input type="text" placeholder="e.g. Frecciarossa / Airbnb" value={provider} onChange={e => setProvider(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Confirmation Code</label>
              <input type="text" value={confirmationCode} onChange={e => setConfirmationCode(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-mono text-[#182B49] font-bold focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Date</label>
              <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Rate / Price</label>
              <input type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-bold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Current Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as 'booked' | 'pending')} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]">
                <option value="booked">Secured & Confirmed</option>
                <option value="pending">Pending Squad Approval</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Important Details / Notes</label>
            <textarea rows={2} placeholder="e.g. Coach 4, Seats 12A-12D. QR codes stored on mobile." value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-[#7D766D] hover:text-[#1C1917] font-bold text-[12px] cursor-pointer">Cancel</button>
          <button onClick={() => {
            if (!title.trim()) return
            onAdd({
              title,
              type,
              provider: provider || 'Official Provider',
              confirmationCode,
              date,
              price,
              status,
              emoji: type === 'Flight' ? '✈️' : type === 'Hotel' ? '🏨' : type === 'Transit' ? '🚄' : '🏛️',
              notes,
              receiptUrl: 'voucher-download.pdf'
            })
          }} className="px-5 py-2 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white font-bold text-[12px] shadow-sm cursor-pointer">
            Save Booking Pass
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
  onAdd: (v: Omit<VoteItem, 'id' | 'up' | 'down'>) => void
}) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('€25')
  const [emoji, setEmoji] = useState('🍷')
  const [suggestedBy, setSuggestedBy] = useState('Sarah')

  return (
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[440px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC]">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Propose Excursion Option</h3>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3.5 text-[12px]">
          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Experience Name & Emblem</label>
            <div className="flex gap-2">
              <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-12 text-center text-lg p-2 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7]" />
              <input type="text" placeholder="e.g. Frascati Wine Tasting Day Trip" value={name} onChange={e => setName(e.target.value)} className="flex-1 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-semibold text-[#1C1917]" />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Short Description</label>
            <textarea rows={2} placeholder="e.g. Scenic vineyard cellar visit & 4-course lunch in Castelli Romani hills" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Est. Price</label>
              <input type="text" placeholder="e.g. €45/person" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-bold text-[#1C1917]" />
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Proposed By</label>
              <input type="text" value={suggestedBy} onChange={e => setSuggestedBy(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917]" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-[#7D766D] hover:text-[#1C1917] font-bold text-[12px] cursor-pointer">Cancel</button>
          <button onClick={() => {
            if (!name.trim()) return
            onAdd({
              name,
              desc: desc || 'Squad activity suggestion',
              price: price || 'Free',
              emoji: emoji || '💡',
              suggestedBy: suggestedBy || 'Traveler'
            })
          }} className="px-5 py-2 rounded-xl bg-[#C25934] hover:bg-[#A94A28] text-white font-bold text-[12px] shadow-sm cursor-pointer">
            Add to Voting Board
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
  onAdd: (item: Omit<WantToGoItem, 'id'>) => void
}) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<WantToGoItem['type']>('Photo Spot')
  const [member, setMember] = useState(squad[0]?.name || 'Sarah Chen')
  const [priority, setPriority] = useState<WantToGoItem['priority']>('High')
  const [notes, setNotes] = useState('')

  const selectedSquad = squad.find(s => s.name === member) || squad[0]

  return (
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[440px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC]">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Add Wishlist Item</h3>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3.5 text-[12px]">
          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Location / Landmark Name</label>
            <input type="text" placeholder="e.g. Aventine Keyhole Viewpoint" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-semibold text-[#1C1917]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Category</label>
              <select value={type} onChange={e => setType(e.target.value as WantToGoItem['type'])} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917]">
                <option value="Photo Spot">Photo Spot 📸</option>
                <option value="Food & Drink">Food & Drink ☕</option>
                <option value="Cultural">Cultural 🏛️</option>
                <option value="Hidden Gem">Hidden Gem 💎</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value as WantToGoItem['priority'])} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917]">
                <option value="High">High (Must-See)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low (If time permits)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Requested By</label>
            <select value={member} onChange={e => setMember(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917]">
              {squad.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Why Visit? / Photography Notes</label>
            <textarea rows={2} placeholder="e.g. Best light at sunset. Unique view of St. Peter's dome through garden hedge keyhole." value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#1C1917]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-[#7D766D] hover:text-[#1C1917] font-bold text-[12px] cursor-pointer">Cancel</button>
          <button onClick={() => {
            if (!title.trim()) return
            onAdd({
              title,
              type,
              member,
              memberInitials: selectedSquad?.initials || 'SC',
              memberGrad: selectedSquad?.grad || 'from-[#182B49] to-[#2B3F61]',
              priority,
              notes
            })
          }} className="px-5 py-2 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white font-bold text-[12px] shadow-sm cursor-pointer">
            Save to Wishlist
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
  const [toCurr, setToCurr] = useState(homeCurrency || 'USD')

  const parsedAmount = parseFloat(amount) || 0
  const fromRate = EXCHANGE_RATES[fromCurr]?.rate || 1
  const toRate = EXCHANGE_RATES[toCurr]?.rate || 1.08
  const converted = (parsedAmount / fromRate) * toRate

  return (
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[420px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC]">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💱</span>
            <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Live Currency Calculator</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        <div className="space-y-3.5 text-[12px]">
          <div>
            <label className="font-bold text-[#5C554B] block mb-1">Amount to Convert</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-bold text-lg text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#182B49]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">From Currency</label>
              <select value={fromCurr} onChange={e => setFromCurr(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-bold text-[#1C1917]">
                {Object.keys(EXCHANGE_RATES).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold text-[#5C554B] block mb-1">To Currency</label>
              <select value={toCurr} onChange={e => setToCurr(e.target.value)} className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] font-bold text-[#182B49]">
                {Object.keys(EXCHANGE_RATES).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-center space-y-1 mt-2">
            <div className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider">Converted Result</div>
            <div className="text-2xl font-bold text-[#182B49] font-display">
              {EXCHANGE_RATES[toCurr]?.symbol}{converted.toFixed(2)} {toCurr}
            </div>
            <div className="text-[10px] text-[#8C8478]">Exchange Rate: 1 {fromCurr} = {(toRate / fromRate).toFixed(4)} {toCurr}</div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white font-bold text-[12px] cursor-pointer">
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
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[520px] w-full p-6 space-y-5 shadow-2xl border border-[#EAE5DC] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <div>
            <h3 className="text-[18px] font-bold text-[#1C1917] font-display">Expedition Access & Accessibility Suite</h3>
            <p className="text-[11px] text-[#7D766D]">Collaborative access permissions & mobility profiles</p>
          </div>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        {/* Share Link & QR */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-3">
          <span className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider block">Collaborator Invite Link</span>
          <div className="flex items-center gap-2">
            <input type="text" readOnly value="https://wayfarer.app/trip/rome-2026-squad-sc89"
              className="flex-1 p-2.5 rounded-xl bg-white border border-[#DDD5C7] text-[11px] font-mono text-[#182B49] select-all" />
            <button onClick={() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }} className="px-4 py-2.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white text-[11px] font-bold cursor-pointer">
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#7D766D] pt-1">
            <span>Access: <strong>Active Squad (Vote & add stops)</strong></span>
            <button onClick={() => alert('PDF field guide exported!')} className="text-[#C25934] font-bold hover:underline cursor-pointer">
              Export PDF Field Guide
            </button>
          </div>
        </div>

        {/* Accessibility Profiles List */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider block">
            Traveler Accessibility & Dietary Profiles ({squad.length})
          </span>

          {squad.map(m => (
            <div key={m.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full bg-[#182B49] flex items-center justify-center text-[#FAF8F5] text-[10px] font-bold`}>
                    {m.initials}
                  </div>
                  <span className="text-[13px] font-bold text-[#1C1917] font-display">{m.name}</span>
                </div>
                <span className="text-[10px] text-[#8C8478] font-medium">{m.role}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2.5 rounded-xl border border-[#EAE5DC]">
                  <span className="text-[9px] font-bold text-[#8C5E28] uppercase tracking-wider block">Mobility & Transit</span>
                  <span className="text-[#262320]">{m.accessibility.mobility || 'Step-free transit enabled'}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#EAE5DC]">
                  <span className="text-[9px] font-bold text-[#2D5A43] uppercase tracking-wider block">Dietary Preferences</span>
                  <span className="text-[#262320]">{m.accessibility.dietary || 'No dietary restrictions'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-3 border-t border-[#EAE5DC]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white font-bold text-[12px] cursor-pointer">
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
      text: "Ciao Sarah! I'm your Private Travel Concierge for Rome. I can assist with artisan trattoria bookings, Pantheon and Vatican dress codes, walking routes, or rain alternatives. How may I assist your expedition today?"
    }
  ])

  const recommendations = [
    {
      title: 'Maldives · Baa Atoll Biosphere',
      score: '99% Match',
      vibe: 'Coastal & Warm',
      reviewsSummary: 'Ranked #1 for tranquil ocean recharge. Azure coral lagoons, overwater wooden villas, and zero crowds for post-expedition relaxation.',
      bestMonths: 'Nov – Apr',
      estBudget: '€850/person'
    },
    {
      title: 'Kyoto & Hakone, Japan',
      score: '96% Match',
      vibe: 'Cultural & Historic',
      reviewsSummary: 'Traditional heritage ryokans, Mount Fuji geothermal springs, serene bamboo groves, and multi-course kaiseki dining.',
      bestMonths: 'Oct – Nov',
      estBudget: '€920/person'
    },
    {
      title: 'Reykjavik & South Coast, Iceland',
      score: '93% Match',
      vibe: 'Adventure & Aurora',
      reviewsSummary: 'Geothermal outdoor thermal baths, majestic cascading waterfalls, and peak northern lights viewing corridors.',
      bestMonths: 'Sep – Mar',
      estBudget: '€780/person'
    }
  ]

  const quickPrompts = [
    'Authentic carbonara near Piazza Navona?',
    'What is the Vatican dress code?',
    'Day 4 rain alternatives in Rome',
    'Colosseum skip-the-line tips'
  ]

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || chatInput
    if (!q.trim()) return

    const userMsg = q.trim()
    setChatInput('')

    let reply = "Here are my field notes for Rome: Optimal visiting windows are early morning before 10 AM or late afternoon after 4 PM to avoid peak midday sun and crowds. Wear comfortable leather walking shoes for cobblestones!"
    if (userMsg.toLowerCase().includes('carbonara') || userMsg.toLowerCase().includes('restaurant') || userMsg.toLowerCase().includes('food')) {
      reply = "Top concierge recommendation: 'Trattoria Da Enzo al 29' in historic Trastevere or 'Roscioli Salumeria con Cucina'. Arrive 15 minutes before opening or reserve your table in advance!"
    } else if (userMsg.toLowerCase().includes('vatican') || userMsg.toLowerCase().includes('dress')) {
      reply = "Strict Basilica & Vatican guideline: Both shoulders and knees must be fully covered for all travelers. Keep a light linen scarf in your day bag."
    } else if (userMsg.toLowerCase().includes('rain') || userMsg.toLowerCase().includes('plan b')) {
      reply = "For rainy afternoons in Rome: Head inside the Capitoline Museums, visit Galleria Borghese, or enjoy a fresh handmade pasta workshop in Campo de' Fiori."
    } else if (userMsg.toLowerCase().includes('colosseum')) {
      reply = "Colosseum entrance requires matching photo identification with your ticket name. Enter through the Stern gate for booked group priority access."
    }

    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: userMsg },
      { role: 'assistant', text: reply }
    ])
  }

  return (
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[640px] w-full p-6 space-y-4 shadow-2xl border border-[#EAE5DC] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#182B49] text-[#FAF8F5] flex items-center justify-center font-bold text-sm shadow-xs font-display">
              <IconBot size={16} color="#FAF8F5" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#1C1917] font-display">Wayfarer Private Concierge</h3>
              <p className="text-[11px] text-[#7D766D]">Bespoke local insights, curated tips & route assistance</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#FAF8F5] p-1 rounded-2xl text-[12px] font-bold flex-shrink-0 border border-[#EAE5DC]">
          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'concierge' ? 'bg-[#182B49] text-white shadow-xs' : 'text-[#5C554B] hover:text-[#1C1917]'
            }`}
          >
            🏛️ Rome Concierge & Advice
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'explore' ? 'bg-[#182B49] text-white shadow-xs' : 'text-[#5C554B] hover:text-[#1C1917]'
            }`}
          >
            🏝️ Destination Inspiration
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
                  className="px-3 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#5C554B] text-[10px] font-semibold transition-colors cursor-pointer border border-[#EAE5DC]"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] min-h-[220px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-[12px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#182B49] text-white font-medium shadow-xs'
                        : 'bg-white text-[#262320] border border-[#EAE5DC] shadow-xs'
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
                placeholder="Ask about landmark hours, trattoria picks, transit tips..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[12px] text-[#262320] placeholder:text-[#9E978C] focus:outline-none focus:ring-1 focus:ring-[#182B49]"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-2.5 bg-[#C25934] hover:bg-[#A94A28] text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
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
              <span className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider block">
                Filter Inspiration by Setting
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Coastal & Warm', 'Cultural & Historic', 'Adventure & Aurora'].map(v => (
                  <button
                    key={v}
                    onClick={() => setSelectedVibe(v)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      selectedVibe === v ? 'bg-[#182B49] text-white shadow-xs' : 'bg-[#FAF8F5] text-[#5C554B] border border-[#EAE5DC] hover:bg-[#F2EDE4]'
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
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2.5 hover:border-[#DDD5C7] transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-[#1C1917] font-display">{rec.title}</h4>
                    <span className="text-[10px] font-bold text-[#2D5A43] bg-[#EAF2EC] border border-[#CDE0D2] px-2.5 py-0.5 rounded-full">
                      {rec.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5C554B] leading-relaxed bg-white p-3 rounded-xl border border-[#EAE5DC]">
                    ⭐ <strong>Curator Dispatch:</strong> {rec.reviewsSummary}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-[#8C8478]">
                      Peak Season: <strong className="text-[#1C1917]">{rec.bestMonths}</strong> · Est: <strong className="text-[#1C1917]">{rec.estBudget}</strong>
                    </span>
                    <button
                      onClick={() => onAddDestination(rec.title)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#182B49] hover:bg-[#122138] text-white text-[10px] font-bold cursor-pointer"
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
        <div className="flex justify-end pt-3 border-t border-[#EAE5DC] flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#1C1917] border border-[#EAE5DC] font-bold text-[12px] cursor-pointer"
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
    <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-[500px] w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-[#EAE5DC] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <div>
              <h3 className="text-[16px] font-bold text-[#1C1917] font-display">{receiptName}</h3>
              <p className="text-[10px] text-[#7D766D]">Verified expedition voucher & expense document</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#8C8478] hover:text-[#1C1917] cursor-pointer"><IconClose size={18} /></button>
        </div>

        {/* Document Simulation Mockup */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF2EC] text-[#2D5A43] border border-[#CDE0D2] flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <div>
            <div className="text-[15px] font-bold text-[#1C1917] font-display">Official Confirmation Document</div>
            <div className="text-[11px] text-[#7D766D] mt-0.5">Stored with 256-bit encryption in Wayfarer Vault</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#EAE5DC] text-left text-[11px] w-full font-mono text-[#5C554B] space-y-1">
            <div>FILE_NAME: {receiptName}</div>
            <div>STATUS: VERIFIED & CONFIRMED</div>
            <div>TIMESTAMP: 2026-09-12T08:15:00Z</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-[#EAE5DC]">
          <button onClick={() => alert(`Downloading ${receiptName}...`)}
            className="text-[11px] font-bold text-[#C25934] hover:underline cursor-pointer">
            Download File (PDF)
          </button>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-[#182B49] text-white font-bold text-[12px] cursor-pointer hover:bg-[#122138]">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  )
}
