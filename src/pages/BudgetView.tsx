import { useState, useMemo } from 'react'
import { ExpenseItem, SquadMember } from '../types'
import { IconPlus, IconTrash } from '../components/icons'

export default function BudgetView({
  expenses,
  squad,
  settlements,
  totalSpentEUR,
  totalBudgetEUR,
  budgetPercentage,
  homeCurrency,
  convertEURTo,
  onDeleteExpense,
  onOpenAddExpense,
  onOpenReceipt,
  onOpenConverter
}: {
  expenses: ExpenseItem[]
  squad: SquadMember[]
  settlements: { from: string; to: string; amount: number }[]
  totalSpentEUR: number
  totalBudgetEUR: number
  budgetPercentage: number
  homeCurrency: string
  convertEURTo: (eur: number) => string
  onDeleteExpense: (id: string) => void
  onOpenAddExpense: () => void
  onOpenReceipt: (name: string) => void
  onOpenConverter: () => void
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'All') return expenses
    return expenses.filter(e => e.category === selectedCategory)
  }, [expenses, selectedCategory])

  return (
    <div className="p-8 max-w-[1240px] mx-auto space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight">Budget, Expenses & Cost Splitting</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">Rome Trip · 4 Travelers · Live Currency: {homeCurrency}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={onOpenConverter}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold transition-all">
            Currency Calculator
          </button>
          <button onClick={onOpenAddExpense}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-[12px] font-bold rounded-xl shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors">
            <IconPlus size={13} color="white" /> Add Expense
          </button>
        </div>
      </div>

      {/* 3 Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Total Budget Progress */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Budget</span>
              <span className="text-[11px] font-bold text-blue-600">€8,000 Cap</span>
            </div>
            <div className="flex items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
                  <circle cx="50" cy="50" r="40" stroke="#2563EB" strokeWidth="10" fill="transparent"
                    strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * budgetPercentage) / 100}
                    strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900">{budgetPercentage}%</span>
                  <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">UTILIZED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-blue-50 text-center">
              <div className="text-[9px] font-bold text-blue-600 uppercase">Total Spent</div>
              <div className="text-[14px] font-black text-blue-700">€{totalSpentEUR.toLocaleString()}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">≈ {convertEURTo(totalSpentEUR)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-center">
              <div className="text-[9px] font-bold text-emerald-600 uppercase">Remaining</div>
              <div className="text-[14px] font-black text-emerald-700">€{(totalBudgetEUR - totalSpentEUR).toLocaleString()}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">≈ {convertEURTo(totalBudgetEUR - totalSpentEUR)}</div>
            </div>
          </div>
        </div>

        {/* Group Cost Splitting Debt Matrix */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Automated Debt Matrix</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Fair Split</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Calculated dynamically from paid expenses:</p>
            
            <div className="space-y-3">
              {settlements.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-[12px]">All balances currently settled!</div>
              ) : (
                settlements.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold text-slate-800">{s.from}</span>
                      <span className="text-[10px] text-slate-400">owes</span>
                      <span className="text-[11px] font-extrabold text-blue-600">{s.to}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-black text-slate-900">€{s.amount}</span>
                      <span className="text-[9px] text-slate-400 block">≈ {convertEURTo(s.amount)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button onClick={() => alert('Payment request links generated via Revolut / Venmo!')}
            style={{ backgroundColor: '#FF7F50' }}
            className="w-full py-2.5 rounded-xl text-white text-[12px] font-bold hover:opacity-95 transition-opacity shadow-sm mt-4">
            Send Payment Requests to Squad
          </button>
        </div>

        {/* Daily Spending Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-3">
              Daily Expense Distribution
            </span>
            <div className="space-y-3">
              {[
                { day: 'Sep 12', label: 'Flights & Hotel Check-in', amount: 3472, color: '#2563EB' },
                { day: 'Sep 13', label: 'Colosseum & Roscioli Dinner', amount: 299, color: '#10B981' },
                { day: 'Sep 14', label: 'Vatican & Gelato Tasting', amount: 154, color: '#F59E0B' },
                { day: 'Sep 15', label: 'Projected / Shopping', amount: 220, color: '#8B5CF6' },
              ].map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">{d.day} <span className="text-slate-400 font-normal">· {d.label}</span></span>
                    <span className="font-black text-slate-900">€{d.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, (d.amount / 3500) * 100)}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 mt-4 text-[10px] text-amber-800 leading-relaxed">
            💡 <strong>Smart Conversion Tip:</strong> Using home currency {homeCurrency}. All foreign card transactions tracked with 0% markup.
          </div>
        </div>

      </div>

      {/* Expenses Table with Filters & Delete */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">All Itemized Expenses ({filteredExpenses.length})</h3>
            <p className="text-[11px] text-slate-400">Click receipt icon to view stored PDF/image confirmations</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Transport', 'Hotel', 'Activities', 'Dining'].map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-50 overflow-x-auto">
          {filteredExpenses.map(exp => (
            <div key={exp.id} className="p-4 px-6 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl w-8 text-center flex-shrink-0">{exp.emoji}</span>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 truncate">{exp.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{exp.date}</span>
                    <span>· Paid by <strong className="text-slate-700">{exp.paidBy}</strong></span>
                    <span>· Split with {exp.splitWith.length} travelers</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {exp.receiptName && (
                  <button onClick={() => onOpenReceipt(exp.receiptName!)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold transition-colors">
                    📄 {exp.receiptName}
                  </button>
                )}

                <div className="text-right">
                  <div className="text-[14px] font-black text-slate-900">€{exp.amountEUR.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400">≈ {convertEURTo(exp.amountEUR)}</div>
                </div>

                <button onClick={() => onDeleteExpense(exp.id)}
                  title="Delete Expense"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
