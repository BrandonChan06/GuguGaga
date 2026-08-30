import { useState } from 'react'
import { ItineraryItem } from '../types'

export default function InteractiveSVGMap({ stops }: { stops: ItineraryItem[] }) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null)

  return (
    <div className="relative w-full h-full bg-[#EBF1F6] overflow-hidden select-none">
      
      {/* Zoom / Navigation Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
        <button onClick={() => setZoomLevel(z => Math.min(1.6, z + 0.15))}
          className="w-8 h-8 rounded-xl bg-white shadow-md text-slate-700 font-bold text-base flex items-center justify-center hover:bg-slate-50 transition-colors">
          +
        </button>
        <button onClick={() => setZoomLevel(z => Math.max(0.85, z - 0.15))}
          className="w-8 h-8 rounded-xl bg-white shadow-md text-slate-700 font-bold text-base flex items-center justify-center hover:bg-slate-50 transition-colors">
          −
        </button>
        <button onClick={() => setZoomLevel(1)}
          title="Reset View"
          className="w-8 h-8 rounded-xl bg-white shadow-md text-slate-500 font-bold text-[10px] flex items-center justify-center hover:bg-slate-50 transition-colors">
          100%
        </button>
      </div>

      {/* Location Badge */}
      <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-700 shadow-sm border border-slate-200/80 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-600" />
        <span>Rome City Center Map · {stops.length} Geo Waypoints</span>
      </div>

      {/* SVG Canvas */}
      <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
        preserveAspectRatio="xMidYMid slice">
        
        {/* Background & Terrain */}
        <rect width="100" height="100" fill="#EBF1F6" />
        
        {/* Tiber River (Fiume Tevere) */}
        <path d="M33 0 Q31 15 29 30 Q27 48 29 63 Q31 78 27 100" stroke="#9EC5EE" strokeWidth="5" fill="none" strokeLinecap="round" />
        
        {/* Parks & Green zones */}
        <ellipse cx="50" cy="18" rx="11" ry="7" fill="#C5ECD5" opacity="0.85" />
        <ellipse cx="74" cy="68" rx="8" ry="5.5" fill="#C5ECD5" opacity="0.85" />
        <ellipse cx="14" cy="54" rx="6" ry="8" fill="#C5ECD5" opacity="0.85" />
        <ellipse cx="58" cy="78" rx="7" ry="4" fill="#C5ECD5" opacity="0.75" />

        {/* City Blocks & Historic Districts */}
        {[
          [40,42,11,7],[56,40,10,6],[62,52,7,9],[50,62,9,7],[38,60,7,5],
          [70,38,8,7],[73,53,6,7],[80,64,7,6],[20,30,8,6],[19,42,6,7],
          [34,24,9,5],[68,80,8,5],[42,82,7,5],[25,65,8,6],[46,50,6,8]
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill="white" opacity="0.75" stroke="#CBD5E1" strokeWidth="0.4" />
        ))}

        {/* Main Road Avenues */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="2" opacity="0.95" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="2" opacity="0.95" />
        <line x1="0" y1="28" x2="100" y2="28" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="0" y1="72" x2="100" y2="72" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="28" y1="0" x2="28" y2="100" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="72" y1="0" x2="72" y2="100" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="20" y1="60" x2="65" y2="30" stroke="white" strokeWidth="1" opacity="0.7" />

        {/* Dynamic Route Polyline */}
        {stops.length > 1 && (
          <polyline
            points={stops.map(s => `${s.pin.x},${s.pin.y}`).join(' ')}
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeDasharray="3 2"
            opacity="0.8"
          />
        )}
      </svg>

      {/* Clickable Interactive Pins Overlay */}
      {stops.map((stop, i) => {
        const isHovered = activePinIndex === i
        return (
          <div key={stop.id}
            onMouseEnter={() => setActivePinIndex(i)}
            onMouseLeave={() => setActivePinIndex(null)}
            className="absolute flex flex-col items-center cursor-pointer transition-transform duration-150 z-20"
            style={{
              left: `${stop.pin.x}%`,
              top: `${stop.pin.y}%`,
              transform: `translate(-50%, -100%) scale(${isHovered ? 1.2 : 1})`
            }}>
            
            {/* Tooltip on hover */}
            {isHovered && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-bold shadow-xl whitespace-nowrap animate-fadeIn flex items-center gap-1.5 pointer-events-none">
                <span>{stop.emoji}</span>
                <span>{stop.name} ({stop.time})</span>
              </div>
            )}

            {/* Pin Badge */}
            <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-[12px] font-black">
              {i + 1}
            </div>
            <div className="w-1 h-2 bg-blue-600 rounded-b" />
          </div>
        )
      })}
    </div>
  )
}
