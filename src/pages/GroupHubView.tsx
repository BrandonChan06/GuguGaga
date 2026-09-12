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
          <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1C1917] tracking-tight font-display">
            Travel Squad, Polling & Field Packing
          </h1>
          <p className="text-[11px] sm:text-[12px] text-[#7D766D] mt-0.5">
            Collaborate in real-time, vote on excursions, share wishlists & prepare climate gear
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#5C554B] border border-[#EAE5DC] text-[11px] sm:text-[12px] font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <IconShare size={14} /> Invite & Share Link
          </button>
        </div>
      </div>

      {/* Squad Member Profiles with Accessibility Notes */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-[#EAE5DC]">
          <h3 className="text-[11px] sm:text-[12px] font-bold text-[#8C8478] uppercase tracking-wider">
            Travel Squad Profiles ({squad.length} Companions)
          </h3>
          <button onClick={onOpenShare} className="text-[11px] text-[#182B49] font-bold hover:underline cursor-pointer">
            Manage Access & Profiles →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {squad.map(m => (
            <div key={m.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] hover:border-[#DDD5C7] transition-all space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl bg-[#182B49] flex items-center justify-center text-[#FAF8F5] font-bold text-[13px] shadow-xs flex-shrink-0 font-display`}>
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-[#1C1917] truncate font-display">{m.name}</div>
                  <div className="text-[10px] text-[#8C8478] font-medium">{m.role}</div>
                </div>
              </div>

              {/* Accessibility badges */}
              <div className="space-y-1 text-[10px]">
                {m.accessibility.mobility && (
                  <div className="px-2 py-0.5 rounded bg-[#FAF6F0] text-[#8C5E28] font-semibold truncate border border-[#F3E7D5]">
                    ♿ {m.accessibility.mobility}
                  </div>
                )}
                {m.accessibility.dietary && (
                  <div className="px-2 py-0.5 rounded bg-[#EAF2EC] text-[#2D5A43] font-semibold truncate border border-[#CDE0D2]">
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
        
        {/* Activity Voting Candidate List */}
        <div className="bg-white rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC]">
            <div>
              <h3 className="text-[15px] font-bold text-[#1C1917] font-display">Activity Polling Board</h3>
              <p className="text-[11px] text-[#7D766D]">Vote to prioritize experiences for the itinerary</p>
            </div>
            <button
              onClick={onOpenAddVote}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#C25934] text-white text-[11px] font-bold rounded-xl hover:bg-[#A94A28] transition-colors cursor-pointer shadow-xs"
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
                  <div key={v.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2.5 hover:border-[#DDD5C7] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5">{v.emoji}</span>
                        <div>
                          <div className="text-[13px] font-bold text-[#1C1917] leading-tight font-display">{v.name}</div>
                          <div className="text-[11px] text-[#7D766D] mt-0.5">{v.desc}</div>
                          <div className="text-[10px] text-[#8C8478] mt-1">
                            Suggested by {v.suggestedBy} · <strong className="text-[#1C1917]">{v.price}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => onVote(v.id, 'up')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                            v.myVote === 'up'
                              ? 'bg-[#2D5A43] text-white border-[#2D5A43] shadow-xs'
                              : 'bg-[#EAF2EC] text-[#2D5A43] border-[#CDE0D2] hover:bg-[#DFECE1]'
                          }`}
                        >
                          <IconThumbUp size={12} color={v.myVote === 'up' ? 'white' : '#2D5A43'} /> {v.up}
                        </button>

                        <button
                          onClick={() => onVote(v.id, 'down')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                            v.myVote === 'down'
                              ? 'bg-[#C25934] text-white border-[#C25934] shadow-xs'
                              : 'bg-[#FDF6ED] text-[#8C4828] border-[#F2DECE] hover:bg-[#F9ECE0]'
                          }`}
                        >
                          <IconThumbDown size={12} color={v.myVote === 'down' ? 'white' : '#C25934'} /> {v.down}
                        </button>

                        <button
                          onClick={() => onDeleteVote(v.id)}
                          title="Delete Option"
                          className="p-1 text-[#B4ADA1] hover:text-[#C25934] ml-0.5 cursor-pointer"
                        >
                          <IconTrash size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-[#F0EBE1] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2D5A43] rounded-full transition-all duration-300" style={{ width: `${upPercent}%` }} />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-[#8C8478] space-y-1">
                <p className="text-[13px] font-semibold text-[#1C1917] font-display">No activity voting items yet</p>
                <p className="text-[11px]">Add ideas for group excursions, day trips, or dinners.</p>
              </div>
            )}
          </div>
        </div>

        {/* Want-To-Go Member Preferences & Specifications */}
        <div className="bg-white rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC]">
            <div>
              <h3 className="text-[15px] font-bold text-[#1C1917] font-display">Wishlist & Must-Sees</h3>
              <p className="text-[11px] text-[#7D766D]">Landmarks & photo spots submitted by travelers</p>
            </div>
            <button
              onClick={onOpenAddWantToGo}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#182B49] text-white text-[11px] font-bold rounded-xl hover:bg-[#122138] transition-colors cursor-pointer shadow-xs"
            >
              <IconPlus size={12} color="white" /> Add Wishlist
            </button>
          </div>

          <div className="space-y-3">
            {wantToGo.length > 0 ? (
              wantToGo.map(w => (
                <div key={w.id} className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-start justify-between gap-3 hover:border-[#DDD5C7] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#182B49] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5">
                      {w.memberInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#1C1917] font-display">{w.title}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F4EFE6] text-[#5C5346] border border-[#DDD5C7]">
                          {w.type}
                        </span>
                      </div>
                      {w.notes && <p className="text-[11px] text-[#7D766D] mt-1 leading-relaxed">{w.notes}</p>}
                      <div className="text-[10px] text-[#8C8478] mt-1">Requested by {w.member} · Priority: {w.priority}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteWantToGo(w.id)}
                    title="Delete item"
                    className="p-1 text-[#B4ADA1] hover:text-[#C25934] flex-shrink-0 cursor-pointer"
                  >
                    <IconTrash size={13} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#8C8478] space-y-1">
                <p className="text-[13px] font-semibold text-[#1C1917] font-display">No wishlist items yet</p>
                <p className="text-[11px]">Let travelers add their dream photo spots & bucket list items.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Climate-Aware Packing List */}
      <div className="bg-white rounded-3xl border border-[#EAE5DC] shadow-[0_2px_12px_rgba(38,35,32,0.03)] p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE5DC]">
          <div>
            <div className="flex items-center gap-2">
              <IconBot size={18} color="#182B49" />
              <h3 className="text-[16px] font-bold text-[#1C1917] font-display">Climate-Aware Field Packing Guide</h3>
            </div>
            <p className="text-[11px] text-[#7D766D] mt-0.5">Optimized for travel weather & local cultural guidelines</p>
          </div>

          <button
            onClick={onGenerateAIPacking}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#FAF8F5] text-[#182B49] hover:bg-[#F2EDE4] text-[11px] sm:text-[12px] font-bold border border-[#EAE5DC] transition-colors cursor-pointer shadow-xs"
          >
            <IconBot size={14} /> Regenerate with Concierge
          </button>
        </div>

        {Object.keys(packing).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(packing).map(([cat, items]) => {
              const completed = items.filter(i => i.checked).length
              return (
                <div key={cat} className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                    <span className="text-[12px] font-bold text-[#1C1917] font-display">{cat}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#8C8478]">{completed}/{items.length} packed</span>
                      <button
                        onClick={() => onDeletePackingCategory(cat)}
                        title="Delete Category"
                        className="text-[#B4ADA1] hover:text-[#C25934] cursor-pointer"
                      >
                        <IconTrash size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {items.map(item => (
                      <div
                        key={item.id}
                        onClick={() => onTogglePackItem(cat, item.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-[11px] font-medium cursor-pointer transition-all ${
                          item.checked
                            ? 'bg-white/40 text-[#8C8478] line-through'
                            : 'bg-white text-[#262320] shadow-xs hover:bg-[#FDFBF7] border border-[#EAE5DC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                            item.checked ? 'bg-[#2D5A43] border-[#2D5A43] text-white' : 'border-[#DDD5C7] bg-white'
                          }`}>
                            {item.checked && <IconCheck size={10} color="white" />}
                          </div>
                          <span className="truncate">{item.item}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeletePackItem(cat, item.id) }}
                          className="text-[#B4ADA1] hover:text-[#C25934] p-0.5 cursor-pointer flex-shrink-0"
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
                      placeholder="+ Add item to checklist..."
                      value={newPackText[cat] || ''}
                      onChange={e => setNewPackText(prev => ({ ...prev, [cat]: e.target.value }))}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newPackText[cat]) {
                          onAddPackItem(cat, newPackText[cat])
                          setNewPackText(prev => ({ ...prev, [cat]: '' }))
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-[11px] text-[#262320] placeholder:text-[#9E978C] focus:outline-none focus:ring-1 focus:ring-[#182B49]"
                    />
                    <button
                      onClick={() => {
                        if (newPackText[cat]) {
                          onAddPackItem(cat, newPackText[cat])
                          setNewPackText(prev => ({ ...prev, [cat]: '' }))
                        }
                      }}
                      className="px-3 py-1.5 bg-[#182B49] text-white text-[11px] font-bold rounded-xl hover:bg-[#122138] transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-[#8C8478] space-y-2">
            <p className="text-[13px] font-semibold text-[#1C1917] font-display">No packing checklist generated yet</p>
            <button
              onClick={onGenerateAIPacking}
              className="px-4 py-2 bg-[#182B49] hover:bg-[#122138] text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Generate Packing Guide
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
