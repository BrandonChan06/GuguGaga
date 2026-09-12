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
          <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1C1917] tracking-tight font-display">
            Expedition Ledger & Cost Balancing
          </h1>
          <p className="text-[11px] sm:text-[12px] text-[#7D766D] mt-0.5">
            {squad.length} Travelers · Base Currency: EUR · Converted: {homeCurrency}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            onClick={onOpenConverter}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#5C554B] border border-[#EAE5DC] text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer shadow-xs"
          >
            Currency Calculator
          </button>
          <button
            onClick={onOpenAddExpense}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#C25934] text-white text-[11px] sm:text-[12px] font-bold rounded-xl shadow-xs hover:bg-[#A94A28] transition-colors cursor-pointer"
          >
            <IconPlus size={13} color="white" /> Record Expense
          </button>
        </div>
      </div>

      {/* 3 Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Total Budget Progress */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider">Total Expedition Cap</span>
              <span className="text-[11px] font-bold text-[#182B49]">€{(totalBudgetEUR / 1000).toFixed(0)}k Cap</span>
            </div>
            <div className="flex items-center justify-center my-4">
              <div className="relative w-32 sm:w-36 h-32 sm:h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#F0EBE1" strokeWidth="10" fill="transparent" />
                  <circle cx="50" cy="50" r="40" stroke="#182B49" strokeWidth="10" fill="transparent"
                    strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * budgetPercentage) / 100}
                    strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl sm:text-2xl font-bold text-[#1C1917] font-display">{budgetPercentage}%</span>
                  <span className="text-[9px] text-[#8C8478] font-bold tracking-wider uppercase">UTILIZED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE5DC]">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] text-center border border-[#EAE5DC]">
              <div className="text-[9px] font-bold text-[#8C8478] uppercase tracking-wider">Total Spent</div>
              <div className="text-[14px] sm:text-[15px] font-bold text-[#182B49] font-display">€{totalSpentEUR.toLocaleString()}</div>
              <div className="text-[9px] text-[#8C8478] mt-0.5">≈ {convertEURTo(totalSpentEUR)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#EAF2EC] text-center border border-[#CDE0D2]">
              <div className="text-[9px] font-bold text-[#2D5A43] uppercase tracking-wider">Remaining</div>
              <div className="text-[14px] sm:text-[15px] font-bold text-[#2D5A43] font-display">€{Math.max(0, totalBudgetEUR - totalSpentEUR).toLocaleString()}</div>
              <div className="text-[9px] text-[#4A7D60] mt-0.5">≈ {convertEURTo(Math.max(0, totalBudgetEUR - totalSpentEUR))}</div>
            </div>
          </div>
        </div>

        {/* Group Cost Splitting Debt Matrix */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider">Settlement Matrix</span>
              <span className="text-[10px] font-bold text-[#2D5A43] bg-[#EAF2EC] border border-[#CDE0D2] px-2 py-0.5 rounded-full">FairShare Active</span>
            </div>
            <p className="text-[11px] text-[#7D766D] mb-3">Calculated minimum cash transfers to balance all shared expenses</p>

            <div className="space-y-2">
              {settlements.length === 0 ? (
                <div className="text-center py-6 text-[#8C8478] text-[12px] italic">
                  All accounts balanced · No pending settlements!
                </div>
              ) : (
                settlements.map((s, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1C1917]">{s.from}</span>
                      <span className="text-[#8C8478] text-xs">reimburses</span>
                      <span className="font-bold text-[#1C1917]">{s.to}</span>
                    </div>
                    <span className="font-bold text-[#182B49] text-[13px] font-display">€{s.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-[10px] text-[#7D766D] text-center mt-3">
            💡 Supports automated Venmo / Revolut QR instant settlement links
          </div>
        </div>

        {/* Category Breakdown Progress */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#8C8478] uppercase tracking-wider">Expense Categories</span>
              <span className="text-[10px] font-bold text-[#5C554B] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#EAE5DC]">{expenses.length} Records</span>
            </div>

            <div className="space-y-3">
              {[
                { cat: 'Hotel', color: 'bg-[#2D5A43]', barBg: 'bg-[#EAF2EC]' },
                { cat: 'Dining', color: 'bg-[#C25934]', barBg: 'bg-[#FDF6ED]' },
                { cat: 'Transport', color: 'bg-[#182B49]', barBg: 'bg-[#ECEFF3]' },
                { cat: 'Activities', color: 'bg-[#A06C42]', barBg: 'bg-[#F6F1EA]' },
                { cat: 'Shopping', color: 'bg-[#7C3AED]', barBg: 'bg-[#F3E8FF]' }
              ].map(({ cat, color, barBg }) => {
                const totalInCat = expenses.filter(e => e.category === cat).reduce((a, b) => a + b.amountEUR, 0)
                const percent = totalSpentEUR > 0 ? Math.round((totalInCat / totalSpentEUR) * 100) : 0
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#5C554B]">{cat}</span>
                      <span className="font-bold text-[#1C1917] font-display">€{totalInCat} ({percent}%)</span>
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
            <span className="text-[10px] text-[#8C8478] font-medium">Auto-categorized with stored digital vouchers</span>
          </div>
        </div>

      </div>

      {/* Itemized Expenses Table with Category Filter & Receipt Attachment Viewer */}
      <div className="bg-white rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#EAE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-[16px] font-bold text-[#1C1917] font-display">Itemized Expense Ledger</h3>
            <p className="text-[11px] text-[#7D766D]">Select any receipt to preview attached invoices</p>
          </div>

          {/* Category Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {['All', 'Transport', 'Hotel', 'Dining', 'Activities', 'Shopping'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#182B49] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5C554B] border border-[#EAE5DC] hover:bg-[#F2EDE4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredExpenses.length > 0 ? (
          <div className="divide-y divide-[#EAE5DC]/60 overflow-x-auto">
            {filteredExpenses.map(exp => (
              <div key={exp.id} className="p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-3 hover:bg-[#FAF8F5]/80 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl w-7 sm:w-8 text-center flex-shrink-0">{exp.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#1C1917] truncate font-display">{exp.name}</div>
                    <div className="text-[10px] sm:text-[11px] text-[#7D766D] flex items-center gap-1.5 sm:gap-2 mt-0.5 truncate">
                      <span>{exp.date}</span>
                      <span>· Paid by <strong className="text-[#1C1917]">{exp.paidBy}</strong></span>
                      <span className="hidden sm:inline">· Split with {exp.splitWith.length} travelers</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                  {exp.receiptName && (
                    <button
                      onClick={() => onOpenReceipt(exp.receiptName!)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#182B49] text-[10px] font-bold transition-colors cursor-pointer border border-[#EAE5DC]"
                    >
                      📄 <span className="hidden sm:inline">{exp.receiptName}</span><span className="sm:hidden">Receipt</span>
                    </button>
                  )}

                  <div className="text-right">
                    <div className="text-[14px] sm:text-[15px] font-bold text-[#1C1917] font-display">€{exp.amountEUR.toLocaleString()}</div>
                    <div className="text-[9px] sm:text-[10px] text-[#8C8478]">≈ {convertEURTo(exp.amountEUR)}</div>
                  </div>

                  <button
                    onClick={() => onDeleteExpense(exp.id)}
                    title="Delete Expense"
                    className="p-1 sm:p-1.5 rounded-lg text-[#B4ADA1] hover:text-[#C25934] hover:bg-[#FDF6ED] transition-colors cursor-pointer"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center text-[#8C8478] space-y-2">
            <div className="text-2xl">💳</div>
            <p className="text-[14px] font-bold text-[#1C1917] font-display">No expenses recorded yet</p>
            <p className="text-[12px] text-[#7D766D] max-w-[340px] mx-auto">
              Track flights, hotels, dining, and shared activities with automated squad debt settlements.
            </p>
            <button
              onClick={onOpenAddExpense}
              className="inline-block mt-2 px-4 py-2 bg-[#182B49] hover:bg-[#122138] text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              + Record First Expense
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
