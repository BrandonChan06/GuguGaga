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
    <div className="p-4 sm:p-6 md:p-8 max-w-[1240px] mx-auto space-y-5 sm:space-y-6 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1C1917] tracking-tight font-display">
            Vouchers, Passes & Live Pricing
          </h1>
          <p className="text-[11px] sm:text-[12px] text-[#7D766D] mt-0.5">
            Confirmation passes, ticket codes & live flight fare tracking
          </p>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Status filter toggle */}
          <div className="flex items-center bg-[#EFE9E0] p-1 rounded-xl text-[11px] sm:text-[12px] font-bold border border-[#E2DBD0]">
            {(['all', 'booked', 'pending'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  filterStatus === s ? 'bg-[#182B49] text-white shadow-xs' : 'text-[#5C554B] hover:text-[#1C1917]'
                }`}
              >
                {s === 'all' ? 'All Vouchers' : s === 'booked' ? 'Secured ✓' : 'Pending ⏳'}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAddBooking}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#C25934] text-white text-[11px] sm:text-[12px] font-bold rounded-xl shadow-xs hover:bg-[#A94A28] transition-colors cursor-pointer"
          >
            <IconPlus size={13} color="white" /> Add Booking Pass
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      {displayedBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedBookings.map(b => (
            <div key={b.id} className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] space-y-4 hover:shadow-[0_4px_18px_rgba(38,35,32,0.06)] transition-all relative overflow-hidden">
              {/* Subtle top edge accent */}
              <div className={`h-1 absolute top-0 left-0 right-0 ${
                b.status === 'booked' ? 'bg-[#2D5A43]' : 'bg-[#C25934]'
              }`} />

              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#FAF8F5] border border-[#E2DBD0] flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-xs">
                    {b.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#1C1917] leading-tight font-display">{b.title}</span>
                    </div>
                    <div className="text-[11px] text-[#7D766D] font-medium mt-0.5">{b.provider} · {b.date}</div>
                  </div>
                </div>

                {/* Status Switcher Badge */}
                <button
                  onClick={() => onToggleStatus(b.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                    b.status === 'booked'
                      ? 'bg-[#EAF2EC] text-[#2D5A43] border-[#CDE0D2]'
                      : 'bg-[#FDF6ED] text-[#8C4828] border-[#F2DECE]'
                  }`}
                >
                  {b.status === 'booked' ? 'Secured ✓' : 'Pending ⏳'}
                </button>
              </div>

              {/* Confirmation & Live Price Card */}
              <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-[11px]">
                <div>
                  <span className="text-[9px] font-bold text-[#8C8478] uppercase tracking-wider block">Pass Ref Code</span>
                  <span className="font-mono font-bold text-[#182B49] text-[12px] sm:text-[13px] tracking-wide">{b.confirmationCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-[#8C8478] uppercase tracking-wider block">Rate / Fare</span>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="font-bold text-[#1C1917] text-[13px] font-display">{b.price}</span>
                    {b.livePrice && (
                      <span className="text-[9px] font-bold text-[#2D5A43] bg-[#EAF2EC] px-1.5 py-0.5 rounded border border-[#CDE0D2]">
                        {b.livePrice.change}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {b.notes && (
                <p className="text-[11px] text-[#5C554B] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE5DC]">
                  {b.notes}
                </p>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#EAE5DC]">
                {b.receiptUrl ? (
                  <button
                    onClick={() => onOpenReceipt(b.receiptUrl!)}
                    className="text-[11px] text-[#182B49] font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    📄 View Digital Pass Voucher
                  </button>
                ) : (
                  <span className="text-[10px] text-[#8C8478]">No voucher uploaded</span>
                )}

                <button
                  onClick={() => onDeleteBooking(b.id)}
                  title="Delete Booking"
                  className="p-1.5 rounded-lg text-[#B4ADA1] hover:text-[#C25934] hover:bg-[#FDF6ED] transition-colors cursor-pointer"
                >
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center rounded-3xl bg-white border border-dashed border-[#DDD5C7] text-[#8C8478] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#8C8478] flex items-center justify-center text-2xl mx-auto border border-[#EAE5DC]">
            🎫
          </div>
          <h3 className="text-[15px] font-bold text-[#1C1917] font-display">No bookings or vouchers yet</h3>
          <p className="text-[12px] text-[#7D766D] max-w-[340px] mx-auto">
            Add your flights, hotel reservation codes, transit passes, or activity tickets to keep them organized.
          </p>
          <button
            onClick={onOpenAddBooking}
            className="px-4 py-2 bg-[#182B49] hover:bg-[#122138] text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            + Add First Booking
          </button>
        </div>
      )}
    </div>
  )
}
