import { useState } from 'react'
import { SquadMember, VoteItem, WantToGoItem } from '../types'
import { IconShare, IconPlus, IconTrash, IconThumbUp, IconThumbDown, IconCheck, IconBot } from '../components/icons'

export default function GroupHubView({
  squad,
  votes,
  wantToGo,
  packing,
  onVote,
  onDeleteVote,
  onOpenAddVote,
  onDeleteWantToGo,
  onOpenAddWantToGo,
  onTogglePackItem,
  onDeletePackItem,
  onAddPackItem,
  onDeletePackingCategory,
  onGenerateAIPacking,
  onOpenShare
}: {
  squad: SquadMember[]
  votes: VoteItem[]
  wantToGo: WantToGoItem[]
  packing: Record<string, { id: string; item: string; checked: boolean }[]>
  onVote: (id: string, type: 'up' | 'down') => void
  onDeleteVote: (id: string) => void
  onOpenAddVote: () => void
  onDeleteWantToGo: (id: string) => void
  onOpenAddWantToGo: () => void
  onTogglePackItem: (cat: string, id: string) => void
  onDeletePackItem: (cat: string, id: string) => void
  onAddPackItem: (cat: string, text: string) => void
  onDeletePackingCategory: (cat: string) => void
  onGenerateAIPacking: () => void
  onOpenShare: () => void
}) {
  const [newPackText, setNewPackText] = useState<Record<string, string>>({})

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1240px] mx-auto space-y-6 sm:space-y-7 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 tracking-tight">
            Group Hub, Voting & Packing
          </h1>
          <p className="text-[11px] sm:text-[12px] text-slate-500 mt-0.5">
            Collaborate in real-time, vote on activities, share wishlists & generate climate packing checklists
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] sm:text-[12px] font-bold rounded-xl transition-all cursor-pointer"
          >
            <IconShare size={14} /> Invite & Share
          </button>
        </div>
      </div>

      {/* Squad Member Profiles with Accessibility Notes */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] sm:text-[12px] font-bold text-slate-400 uppercase tracking-wide">
            Travel Squad Profiles ({squad.length} Travelers)
          </h3>
          <button onClick={onOpenShare} className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer">
            Manage Access & Profiles →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {squad.map(m => (
            <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-all space-y-2.5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${m.grad} flex items-center justify-center text-white font-extrabold text-[13px] shadow-xs flex-shrink-0`}>
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 truncate">{m.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{m.role}</div>
                </div>
              </div>

              {/* Accessibility badges */}
              <div className="space-y-1 text-[10px]">
                {m.accessibility.mobility && (
                  <div className="px-2 py-0.5 rounded bg-violet-100/70 text-violet-800 font-semibold truncate">
                    ♿ {m.accessibility.mobility}
                  </div>
                )}
                {m.accessibility.dietary && (
                  <div className="px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800 font-semibold truncate">
                    🥗 {m.accessibility.dietary}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split: Activity Voting & Want-To-Go Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Activity Voting Candidate List (Add / Delete) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900">Activity Voting Board</h3>
              <p className="text-[11px] text-slate-400">Vote to prioritize experiences for the itinerary</p>
            </div>
            <button
              onClick={onOpenAddVote}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <IconPlus size={12} color="white" /> Add Option
            </button>
          </div>

          <div className="space-y-3">
            {votes.length > 0 ? (
              votes.map(v => {
                const totalVotes = v.up + v.down
                const upPercent = totalVotes > 0 ? (v.up / totalVotes) * 100 : 50
                return (
                  <div key={v.id} className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 hover:bg-slate-100/40 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5">{v.emoji}</span>
                        <div>
                          <div className="text-[13px] font-bold text-slate-900 leading-tight">{v.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{v.desc}</div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            Suggested by {v.suggestedBy} · <strong className="text-slate-700">{v.price}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => onVote(v.id, 'up')}
                          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                            v.myVote === 'up'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          <IconThumbUp size={12} color={v.myVote === 'up' ? 'white' : '#059669'} /> {v.up}
                        </button>

                        <button
                          onClick={() => onVote(v.id, 'down')}
                          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                            v.myVote === 'down'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          <IconThumbDown size={12} color={v.myVote === 'down' ? 'white' : '#E11D48'} /> {v.down}
                        </button>

                        <button
                          onClick={() => onDeleteVote(v.id)}
                          title="Delete Option"
                          className="p-1 text-slate-300 hover:text-red-500 ml-0.5 cursor-pointer"
                        >
                          <IconTrash size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${upPercent}%` }} />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-slate-400 space-y-1">
                <p className="text-[13px] font-semibold text-slate-600">No activity voting items yet</p>
                <p className="text-[11px]">Add ideas for group excursions, day trips, or dinners.</p>
              </div>
            )}
          </div>
        </div>

        {/* Want-To-Go Member Preferences & Specifications (Add / Delete) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900">Want-To-Go Wishlist</h3>
              <p className="text-[11px] text-slate-400">Must-sees, photo spots & dining submitted by travelers</p>
            </div>
            <button
              onClick={onOpenAddWantToGo}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <IconPlus size={12} color="white" /> Add Wishlist
            </button>
          </div>

          <div className="space-y-3">
            {wantToGo.length > 0 ? (
              wantToGo.map(w => (
                <div key={w.id} className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 hover:bg-slate-100/40 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${w.memberGrad} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5`}>
                      {w.memberInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-slate-900">{w.title}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                          {w.type}
                        </span>
                      </div>
                      {w.notes && <p className="text-[11px] text-slate-500 mt-1 leading-snug">{w.notes}</p>}
                      <div className="text-[10px] text-slate-400 mt-1">Requested by {w.member} · Priority: {w.priority}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteWantToGo(w.id)}
                    title="Delete item"
                    className="p-1 text-slate-300 hover:text-red-500 flex-shrink-0 cursor-pointer"
                  >
                    <IconTrash size={13} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 space-y-1">
                <p className="text-[13px] font-semibold text-slate-600">No wishlist items yet</p>
                <p className="text-[11px]">Let travelers add their dream photo spots & bucket list items.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* AI Generated Packing List (Add / Delete / Categorize) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <IconBot size={18} color="#4F46E5" />
              <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900">AI Climate-Aware Packing List</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Optimized for travel weather & local cultural guidelines</p>
          </div>

          <button
            onClick={onGenerateAIPacking}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-[11px] sm:text-[12px] font-bold border border-indigo-200/80 transition-colors cursor-pointer"
          >
            <IconBot size={14} /> Regenerate with AI
          </button>
        </div>

        {Object.keys(packing).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(packing).map(([cat, items]) => {
              const completed = items.filter(i => i.checked).length
              return (
                <div key={cat} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                    <span className="text-[12px] font-extrabold text-slate-800">{cat}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500">{completed}/{items.length} packed</span>
                      <button
                        onClick={() => onDeletePackingCategory(cat)}
                        title="Delete Category"
                        className="text-slate-300 hover:text-red-500 cursor-pointer"
                      >
                        <IconTrash size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {items.map(item => (
                      <div
                        key={item.id}
                        onClick={() => onTogglePackItem(cat, item.id)}
                        className={`flex items-center justify-between p-2 rounded-xl text-[11px] font-medium cursor-pointer transition-all ${
                          item.checked
                            ? 'bg-white/40 text-slate-400 line-through'
                            : 'bg-white text-slate-700 shadow-2xs hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                            item.checked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {item.checked && <IconCheck size={10} color="white" />}
                          </div>
                          <span className="truncate">{item.item}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeletePackItem(cat, item.id) }}
                          className="text-slate-300 hover:text-red-500 p-0.5 cursor-pointer flex-shrink-0"
                        >
                          <IconTrash size={11} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Custom Item to Category */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      placeholder="+ Add item..."
                      value={newPackText[cat] || ''}
                      onChange={e => setNewPackText(prev => ({ ...prev, [cat]: e.target.value }))}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newPackText[cat]) {
                          onAddPackItem(cat, newPackText[cat])
                          setNewPackText(prev => ({ ...prev, [cat]: '' }))
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        if (newPackText[cat]) {
                          onAddPackItem(cat, newPackText[cat])
                          setNewPackText(prev => ({ ...prev, [cat]: '' }))
                        }
                      }}
                      className="px-2.5 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 space-y-2">
            <p className="text-[13px] font-semibold text-slate-600">No packing checklist generated yet</p>
            <button
              onClick={onGenerateAIPacking}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Generate AI Packing List
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
