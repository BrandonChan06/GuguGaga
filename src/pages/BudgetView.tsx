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
    <div className="p-4 sm:p-6 md:p-8 max-w-[1240px] mx-auto space-y-6 sm:space-y-7 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 tracking-tight">
            Budget, Expenses & Cost Splitting
          </h1>
          <p className="text-[11px] sm:text-[12px] text-slate-500 mt-0.5">
            {squad.length} Travelers · Live Base: EUR · Converted: {homeCurrency}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            onClick={onOpenConverter}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer"
          >
            Currency Calculator
          </button>
          <button
            onClick={onOpenAddExpense}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-blue-600 text-white text-[11px] sm:text-[12px] font-bold rounded-xl shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <IconPlus size={13} color="white" /> Add Expense
          </button>
        </div>
      </div>

      {/* 3 Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Total Budget Progress */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Budget</span>
              <span className="text-[11px] font-bold text-blue-600">€{(totalBudgetEUR / 1000).toFixed(0)}k Cap</span>
            </div>
            <div className="flex items-center justify-center my-4">
              <div className="relative w-32 sm:w-36 h-32 sm:h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
                  <circle cx="50" cy="50" r="40" stroke="#2563EB" strokeWidth="10" fill="transparent"
                    strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * budgetPercentage) / 100}
                    strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{budgetPercentage}%</span>
                  <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">UTILIZED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-blue-50 text-center">
              <div className="text-[9px] font-bold text-blue-600 uppercase">Total Spent</div>
              <div className="text-[13px] sm:text-[14px] font-black text-blue-700">€{totalSpentEUR.toLocaleString()}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">≈ {convertEURTo(totalSpentEUR)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-center">
              <div className="text-[9px] font-bold text-emerald-600 uppercase">Remaining</div>
              <div className="text-[13px] sm:text-[14px] font-black text-emerald-700">€{Math.max(0, totalBudgetEUR - totalSpentEUR).toLocaleString()}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">≈ {convertEURTo(Math.max(0, totalBudgetEUR - totalSpentEUR))}</div>
            </div>
          </div>
        </div>

        {/* Group Cost Splitting Debt Matrix */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Automated Debt Settlements</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">FairSplit Active</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Calculated minimum cash transfers to balance all shared expenses</p>

            <div className="space-y-2">
              {settlements.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-[12px] italic">
                  All accounts balanced · No pending settlements!
                </div>
              ) : (
                settlements.map((s, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{s.from}</span>
                      <span className="text-slate-400 text-xs">owes</span>
                      <span className="font-bold text-slate-800">{s.to}</span>
                    </div>
                    <span className="font-black text-blue-600 text-[12px]">€{s.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-500 text-center mt-3">
            💡 Supports automated Venmo / Revolut QR instant settlement links
          </div>
        </div>

        {/* Category Breakdown Progress */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Category Breakdown</span>
              <span className="text-[10px] font-bold text-slate-500">{expenses.length} Records</span>
            </div>

            <div className="space-y-3">
              {[
                { cat: 'Hotel', color: 'bg-emerald-500', barBg: 'bg-emerald-100' },
                { cat: 'Dining', color: 'bg-rose-500', barBg: 'bg-rose-100' },
                { cat: 'Transport', color: 'bg-blue-500', barBg: 'bg-blue-100' },
                { cat: 'Activities', color: 'bg-amber-500', barBg: 'bg-amber-100' },
                { cat: 'Shopping', color: 'bg-purple-500', barBg: 'bg-purple-100' }
              ].map(({ cat, color, barBg }) => {
                const totalInCat = expenses.filter(e => e.category === cat).reduce((a, b) => a + b.amountEUR, 0)
                const percent = totalSpentEUR > 0 ? Math.round((totalInCat / totalSpentEUR) * 100) : 0
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">{cat}</span>
                      <span className="font-bold text-slate-900">€{totalInCat} ({percent}%)</span>
                    </div>
                    <div className={`h-1.5 ${barBg} rounded-full overflow-hidden`}>
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-[10px] text-slate-400 font-medium">Auto-categorized from uploaded receipt snapshots</span>
          </div>
        </div>

      </div>

      {/* Itemized Expenses Table with Category Filter & Receipt Attachment Viewer */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">Itemized Expense Log</h3>
            <p className="text-[11px] text-slate-400">Click any receipt button to preview stored documents</p>
          </div>

          {/* Category Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {['All', 'Transport', 'Hotel', 'Dining', 'Activities', 'Shopping'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredExpenses.length > 0 ? (
          <div className="divide-y divide-slate-50 overflow-x-auto">
            {filteredExpenses.map(exp => (
              <div key={exp.id} className="p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl w-7 sm:w-8 text-center flex-shrink-0">{exp.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 truncate">{exp.name}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5 sm:gap-2 mt-0.5 truncate">
                      <span>{exp.date}</span>
                      <span>· Paid by <strong className="text-slate-700">{exp.paidBy}</strong></span>
                      <span className="hidden sm:inline">· Split with {exp.splitWith.length} travelers</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                  {exp.receiptName && (
                    <button
                      onClick={() => onOpenReceipt(exp.receiptName!)}
                      className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      📄 <span className="hidden sm:inline">{exp.receiptName}</span><span className="sm:hidden">Receipt</span>
                    </button>
                  )}

                  <div className="text-right">
                    <div className="text-[13px] sm:text-[14px] font-black text-slate-900">€{exp.amountEUR.toLocaleString()}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400">≈ {convertEURTo(exp.amountEUR)}</div>
                  </div>

                  <button
                    onClick={() => onDeleteExpense(exp.id)}
                    title="Delete Expense"
                    className="p-1 sm:p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center text-slate-400 space-y-2">
            <div className="text-2xl">💳</div>
            <p className="text-[14px] font-bold text-slate-700">No expenses recorded yet</p>
            <p className="text-[12px] text-slate-500 max-w-[340px] mx-auto">
              Track flights, hotels, dining, and shared activities with automated squad debt settlements.
            </p>
            <button
              onClick={onOpenAddExpense}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              + Add First Expense
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
