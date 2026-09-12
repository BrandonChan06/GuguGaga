import { useState } from 'react'
import { ItineraryItem } from '../types'

export default function InteractiveSVGMap({ stops }: { stops: ItineraryItem[] }) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null)

  return (
    <div className="relative w-full h-full bg-[#F5F2EA] overflow-hidden select-none border border-[#E2DBD0]">
      
      {/* Zoom / Navigation Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
        <button onClick={() => setZoomLevel(z => Math.min(1.6, z + 0.15))}
          className="w-8 h-8 rounded-xl bg-white shadow-sm border border-[#DDD5C7] text-[#262320] font-bold text-base flex items-center justify-center hover:bg-[#FAF8F5] transition-colors cursor-pointer">
          +
        </button>
        <button onClick={() => setZoomLevel(z => Math.max(0.85, z - 0.15))}
          className="w-8 h-8 rounded-xl bg-white shadow-sm border border-[#DDD5C7] text-[#262320] font-bold text-base flex items-center justify-center hover:bg-[#FAF8F5] transition-colors cursor-pointer">
          −
        </button>
        <button onClick={() => setZoomLevel(1)}
          title="Reset View"
          className="w-8 h-8 rounded-xl bg-white shadow-sm border border-[#DDD5C7] text-[#7D766D] font-bold text-[10px] flex items-center justify-center hover:bg-[#FAF8F5] transition-colors cursor-pointer">
          100%
        </button>
      </div>

      {/* Location Badge */}
      <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#1C1917] shadow-sm border border-[#E0D8CB] flex items-center gap-2 font-display">
        <span className="w-2 h-2 rounded-full bg-[#C25934]" />
        <span>Rome Field Cartography · {stops.length} Waypoints</span>
      </div>

      {/* SVG Canvas */}
      <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
        preserveAspectRatio="xMidYMid slice">
        
        {/* Background & Terrain */}
        <rect width="100" height="100" fill="#F5F2EA" />
        
        {/* Subtle grid pattern for vintage map feel */}
        <defs>
          <pattern id="mapGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#EAE4D8" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#mapGrid)" opacity="0.6" />

        {/* Tiber River (Fiume Tevere) */}
        <path d="M33 0 Q31 15 29 30 Q27 48 29 63 Q31 78 27 100" stroke="#8EAFCE" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M33 0 Q31 15 29 30 Q27 48 29 63 Q31 78 27 100" stroke="#799EC1" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* Parks & Green zones (Villa Borghese, Palatine) */}
        <ellipse cx="50" cy="18" rx="11" ry="7" fill="#D6E4CF" opacity="0.85" stroke="#C3D6BB" strokeWidth="0.5" />
        <ellipse cx="74" cy="68" rx="8" ry="5.5" fill="#D6E4CF" opacity="0.85" stroke="#C3D6BB" strokeWidth="0.5" />
        <ellipse cx="14" cy="54" rx="6" ry="8" fill="#D6E4CF" opacity="0.85" stroke="#C3D6BB" strokeWidth="0.5" />
        <ellipse cx="58" cy="78" rx="7" ry="4" fill="#D6E4CF" opacity="0.75" stroke="#C3D6BB" strokeWidth="0.5" />

        {/* City Blocks & Historic Districts */}
        {[
          [40,42,11,7],[56,40,10,6],[62,52,7,9],[50,62,9,7],[38,60,7,5],
          [70,38,8,7],[73,53,6,7],[80,64,7,6],[20,30,8,6],[19,42,6,7],
          [34,24,9,5],[68,80,8,5],[42,82,7,5],[25,65,8,6],[46,50,6,8]
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill="#FFFFFF" opacity="0.85" stroke="#DDD5C7" strokeWidth="0.5" />
        ))}

        {/* Main Historical Avenues */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="#E5DDD0" strokeWidth="2.2" opacity="0.9" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#E5DDD0" strokeWidth="2.2" opacity="0.9" />
        <line x1="0" y1="28" x2="100" y2="28" stroke="#E8E1D5" strokeWidth="1.4" opacity="0.8" />
        <line x1="0" y1="72" x2="100" y2="72" stroke="#E8E1D5" strokeWidth="1.4" opacity="0.8" />
        <line x1="28" y1="0" x2="28" y2="100" stroke="#E8E1D5" strokeWidth="1.4" opacity="0.8" />
        <line x1="72" y1="0" x2="72" y2="100" stroke="#E8E1D5" strokeWidth="1.4" opacity="0.8" />
        <line x1="20" y1="60" x2="65" y2="30" stroke="#E8E1D5" strokeWidth="1.2" opacity="0.7" />

        {/* Dynamic Route Polyline */}
        {stops.length > 1 && (
          <polyline
            points={stops.map(s => `${s.pin.x},${s.pin.y}`).join(' ')}
            fill="none"
            stroke="#182B49"
            strokeWidth="1.6"
            strokeDasharray="3.5 2.5"
            opacity="0.85"
          />
        )}
      </svg>

      {/* Clickable Heritage Waypoint Pins Overlay */}
      {stops.map((stop, i) => {
        const isHovered = activePinIndex === i
        return (
          <div key={stop.id}
            onMouseEnter={() => setActivePinIndex(i)}
            onMouseLeave={() => setActivePinIndex(null)}
            className="absolute flex flex-col items-center cursor-pointer transition-transform duration-200 z-20"
            style={{
              left: `${stop.pin.x}%`,
              top: `${stop.pin.y}%`,
              transform: `translate(-50%, -100%) scale(${isHovered ? 1.18 : 1})`
            }}>
            
            {/* Tooltip on hover */}
            {isHovered && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-[#1C1917] text-[#FAF8F5] text-[11px] font-bold shadow-lg whitespace-nowrap animate-fadeIn flex items-center gap-1.5 pointer-events-none border border-[#3E3832]">
                <span>{stop.emoji}</span>
                <span>{stop.name} ({stop.time})</span>
              </div>
            )}

            {/* Custom Heritage Pin */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transition-colors ${
              isHovered 
                ? 'bg-[#C25934] text-white scale-110 shadow-[0_4px_12px_rgba(194,89,52,0.4)]' 
                : 'bg-[#182B49] text-white'
            }`}>
              {i + 1}
            </div>

            {/* Subtle pin needle dot */}
            <div className="w-1.5 h-1.5 bg-[#182B49] rounded-full mt-0.5" />
          </div>
        )
      })}
    </div>
  )
}
