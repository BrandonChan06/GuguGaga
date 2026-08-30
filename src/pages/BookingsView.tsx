import { useState, useMemo } from 'react'
import { BookingItem } from '../types'
import { IconPlus, IconTrash } from '../components/icons'

export default function BookingsView({
  bookings,
  onToggleStatus,
  onDeleteBooking,
  onOpenAddBooking,
  onOpenReceipt
}: {
  bookings: BookingItem[]
  onToggleStatus: (id: string) => void
  onDeleteBooking: (id: string) => void
  onOpenAddBooking: () => void
  onOpenReceipt: (r: string) => void
}) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'booked' | 'pending'>('all')

  const displayedBookings = useMemo(() => {
    if (filterStatus === 'all') return bookings
    return bookings.filter(b => b.status === filterStatus)
  }, [bookings, filterStatus])

  return (
    <div className="p-8 max-w-[1240px] mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight">Bookings, Vouchers & Live Pricing</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">Store confirmation codes, track live price trends & toggle Booked vs Pending status</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Status filter toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-[12px] font-bold">
            {(['all', 'booked', 'pending'] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  filterStatus === s ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}>
                {s === 'all' ? 'All Items' : s === 'booked' ? 'Booked ✅' : 'Pending ⏳'}
              </button>
            ))}
          </div>

          <button onClick={onOpenAddBooking}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-[12px] font-bold rounded-xl shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors cursor-pointer">
            <IconPlus size={13} color="white" /> Add Booking
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      {displayedBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedBookings.map(b => (
            <div key={b.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3.5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {b.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold text-slate-900">{b.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">{b.provider} · {b.date}</div>
                  </div>
                </div>

                {/* Status Switcher Badge */}
                <button onClick={() => onToggleStatus(b.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                    b.status === 'booked'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                  {b.status === 'booked' ? 'Confirmed ✅' : 'Pending Action ⏳'}
                </button>
              </div>

              {/* Confirmation & Live Price */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px]">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Ref Code</span>
                  <span className="font-mono font-bold text-slate-800">{b.confirmationCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Fare / Rate</span>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="font-extrabold text-slate-900 text-[12px]">{b.price}</span>
                    {b.livePrice && (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1 py-0.5 rounded">
                        {b.livePrice.change}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {b.notes && (
                <p className="text-[11px] text-slate-500 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                  {b.notes}
                </p>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                {b.receiptUrl ? (
                  <button onClick={() => onOpenReceipt(b.receiptUrl!)}
                    className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                    📄 View Document / Ticket
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400">No attachment</span>
                )}

                <button onClick={() => onDeleteBooking(b.id)}
                  title="Delete Booking"
                  className="p-1 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-slate-200 text-slate-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center text-2xl mx-auto">
            🎫
          </div>
          <h3 className="text-[15px] font-bold text-slate-800">No bookings or vouchers yet</h3>
          <p className="text-[12px] text-slate-500 max-w-[340px] mx-auto">
            Add your flights, hotel reservation codes, transit passes, or activity tickets to keep them organized.
          </p>
          <button
            onClick={onOpenAddBooking}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            + Add First Booking
          </button>
        </div>
      )}
    </div>
  )
}
