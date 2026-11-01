import React from 'react';

interface BuddhaAltarProps {
  auraIntensity: number;
  isGiftActive: boolean;
  activeGiftPrayer?: string | null;
}

export const BuddhaAltar: React.FC<BuddhaAltarProps> = ({
  auraIntensity,
  isGiftActive,
  activeGiftPrayer,
}) => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* 1. VẠN PHẬT GOLDEN NICHE BACKGROUND WALL (Bức tường Vạn Phật đúc vàng) */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden flex flex-col justify-start">
        <div className="w-full h-full grid grid-cols-10 sm:grid-cols-12 gap-1 p-1">
          {Array.from({ length: 96 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-7 rounded-t-sm border border-amber-600/30 bg-linear-to-b from-amber-700/40 via-amber-900/60 to-black/80 flex items-center justify-center"
            >
              {/* Miniature golden seated Buddha glyph */}
              <span className="text-[10px] text-amber-300/70 filter drop-shadow-[0_0_2px_#f59e0b]">
                ☸
              </span>
            </div>
          ))}
        </div>
        {/* Soft golden vignette gradient overlay */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-black/40 to-black/80" />
      </div>

      {/* 2. TWO COILED GOLDEN DRAGON PILLARS (Hai Cột Rồng Vàng Chạm Trổ) */}
      {/* Left Dragon Pillar */}
      <div className="absolute left-0 inset-y-0 w-8 sm:w-10 z-10 bg-linear-to-r from-[#2a0e06] via-[#632909] to-[#994709] border-r-2 border-amber-400/50 shadow-[5px_0_15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-around py-4">
        {/* Coiled dragon scales texture */}
        <div className="w-full h-full opacity-40 bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:6px_8px]" />
        {/* Dragon head relief SVG */}
        <div className="absolute top-1/4 w-full flex justify-center text-amber-300 text-xs font-bold drop-shadow-[0_0_5px_#ffd700]">
          🐲
        </div>
        <div className="absolute top-2/3 w-full flex justify-center text-amber-300 text-xs font-bold drop-shadow-[0_0_5px_#ffd700]">
          🐲
        </div>
      </div>

      {/* Right Dragon Pillar */}
      <div className="absolute right-0 inset-y-0 w-8 sm:w-10 z-10 bg-linear-to-l from-[#2a0e06] via-[#632909] to-[#994709] border-l-2 border-amber-400/50 shadow-[-5px_0_15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-around py-4">
        <div className="w-full h-full opacity-40 bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:6px_8px]" />
        <div className="absolute top-1/4 w-full flex justify-center text-amber-300 text-xs font-bold drop-shadow-[0_0_5px_#ffd700]">
          🐲
        </div>
        <div className="absolute top-2/3 w-full flex justify-center text-amber-300 text-xs font-bold drop-shadow-[0_0_5px_#ffd700]">
          🐲
        </div>
      </div>

      {/* 3. DYNAMIC ROTATING GOLDEN AURA RAYS (Hào Quang Phật Quang) */}
      <div
        className="absolute top-[55px] w-[360px] h-[360px] rounded-full transition-transform duration-700 ease-out flex items-center justify-center pointer-events-none"
        style={{
          transform: `scale(${1 + auraIntensity * 0.4})`,
          opacity: 0.85 + auraIntensity * 0.15,
        }}
      >
        {/* Sunbeam spikes */}
        <div
          className="absolute inset-0 rounded-full animate-spin-slow opacity-90"
          style={{
            background: `radial-gradient(circle, rgba(255,225,80,0.95) 0%, rgba(255,180,0,0.5) 40%, rgba(255,130,0,0) 70%)`,
            filter: `drop-shadow(0 0 ${25 + auraIntensity * 45}px rgba(255,215,0,0.95))`,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {Array.from({ length: 48 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 96 * Math.cos((i * 7.5 * Math.PI) / 180)}
                y2={100 + 96 * Math.sin((i * 7.5 * Math.PI) / 180)}
                stroke="#fff7cc"
                strokeWidth={i % 2 === 0 ? '1.8' : '1'}
                strokeOpacity={i % 3 === 0 ? 0.9 : 0.55}
              />
            ))}
          </svg>
        </div>

        {/* Inner pulsating glow halo */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full animate-pulse-gold"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,230,1) 0%, rgba(255,215,0,0.85) 45%, rgba(245,158,11,0.2) 75%, transparent 100%)',
          }}
        />
      </div>

      {/* 4. MAIN MAJESTIC GOLDEN BUDDHA STATUE */}
      <div
        className="relative z-10 w-[260px] h-[310px] mt-1 flex flex-col items-center justify-end transition-all duration-500"
        style={{
          filter: `drop-shadow(0 0 ${16 + auraIntensity * 30}px rgba(255, 215, 0, ${0.6 + auraIntensity * 0.4}))`,
        }}
      >
        <svg
          viewBox="0 0 240 310"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldBright" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9D2" />
              <stop offset="35%" stopColor="#FBD34D" />
              <stop offset="75%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="goldShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="30%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            <linearGradient id="lotusThroneGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>

          {/* Ushnisha & Flaming Jewel on crown */}
          <path
            d="M120 30 C114 30, 112 38, 120 44 C128 38, 126 30, 120 30 Z"
            fill="url(#goldBright)"
          />
          <circle cx="120" cy="27" r="4" fill="#FFFFFF" filter="drop-shadow(0 0 4px #ffd700)" />

          {/* Head & Tight Spiraled Curls */}
          <ellipse cx="120" cy="66" rx="28" ry="32" fill="url(#goldBright)" />
          <path
            d="M94 58 C96 46, 110 42, 120 42 C130 42, 144 46, 146 58 C138 54, 102 54, 94 58 Z"
            fill="#B45309"
          />

          {/* Facial Features (Serene, compassionate expression) */}
          <circle cx="120" cy="59" r="2.2" fill="#FFFFFF" />
          <path
            d="M105 64 Q 112 60 117 64 M123 64 Q 128 60 135 64"
            stroke="#5c2e0b"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M106 69 Q 112 73 117 68 M123 68 Q 128 73 134 69"
            stroke="#5c2e0b"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M120 66 L 119 78 Q 120 80 122 78"
            stroke="#78350f"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M113 85 Q 120 89 127 85"
            stroke="#78350f"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Elongated Earlobes */}
          <path d="M92 63 C90 72, 89 87, 95 91 C96 88, 96 70, 94 63 Z" fill="url(#goldBright)" />
          <path d="M148 63 C150 72, 151 87, 145 91 C144 88, 144 70, 146 63 Z" fill="url(#goldBright)" />

          {/* Neck with 3 auspicious beauty rings */}
          <path d="M108 94 C108 104, 132 104, 132 94 Z" fill="url(#goldBright)" />
          <line x1="110" y1="97" x2="130" y2="97" stroke="#78350f" strokeWidth="1" opacity="0.6" />
          <line x1="112" y1="100" x2="128" y2="100" stroke="#78350f" strokeWidth="1" opacity="0.6" />

          {/* Robe & Torso */}
          <path
            d="M82 118 C80 160, 74 195, 74 212 L166 212 C166 195, 160 160, 158 118 C144 108, 96 108, 82 118 Z"
            fill="url(#goldShine)"
          />

          {/* Elegant draped monastic robe folds */}
          <path
            d="M94 110 Q 124 132 154 168 L 158 184 Q 120 144 88 126 Z"
            fill="url(#goldBright)"
            opacity="0.9"
          />
          <path
            d="M84 136 Q 116 160 142 208 L 126 210 Q 100 172 80 152 Z"
            fill="url(#goldBright)"
            opacity="0.8"
          />

          {/* Meditating Hands in Dhyana Mudra with glowing jewel */}
          <ellipse cx="120" cy="200" rx="22" ry="9" fill="url(#goldBright)" />
          <circle cx="120" cy="198" r="4" fill="#FFFFFF" filter="drop-shadow(0 0 6px #ffd700)" />

          {/* Legs folded in Full Lotus Posture */}
          <path
            d="M48 212 C48 194, 76 200, 120 206 C164 200, 192 194, 192 212 C192 228, 160 234, 120 234 C80 234, 48 228, 48 212 Z"
            fill="url(#goldShine)"
          />

          {/* Tòa Sen Vàng Đa Tầng (Multi-tier Golden Lotus Base) */}
          <g>
            {[-3, -2, -1, 0, 1, 2, 3].map((pos) => {
              const cx = 120 + pos * 24;
              const y = 228 + Math.abs(pos) * 3;
              return (
                <path
                  key={pos}
                  d={`M${cx - 16} ${y + 12} Q ${cx} ${y - 10} ${cx + 16} ${y + 12} Q ${cx} ${y + 16} ${cx - 16} ${y + 12} Z`}
                  fill="url(#lotusThroneGold)"
                  stroke="#78350F"
                  strokeWidth="1"
                />
              );
            })}
          </g>

          {/* Second row of lotus petals */}
          <g>
            {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((pos) => {
              const cx = 120 + pos * 25;
              const y = 236 + Math.abs(pos) * 2;
              return (
                <path
                  key={pos}
                  d={`M${cx - 15} ${y + 10} Q ${cx} ${y - 7} ${cx + 15} ${y + 10} Q ${cx} ${y + 14} ${cx - 15} ${y + 10} Z`}
                  fill="url(#goldBright)"
                  stroke="#92400E"
                  strokeWidth="0.8"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* 5. ROW OF 5 MINI GOLDEN BUDDHAS IN ARCHED ALCOVES (5 Tượng Phật nhỏ dưới chân đài) */}
      <div className="absolute bottom-2 z-20 flex items-center justify-center gap-2 sm:gap-3 px-4">
        {[-2, -1, 0, 1, 2].map((idx) => (
          <div
            key={idx}
            className="w-8 h-11 sm:w-9 sm:h-12 rounded-t-full bg-linear-to-b from-[#6b350b] via-[#3d1902] to-black border border-amber-400/60 shadow-md flex flex-col items-center justify-center p-0.5"
          >
            {/* Small golden Buddha glyph inside niche */}
            <div className="text-sm filter drop-shadow-[0_0_4px_#f59e0b]">
              ☸
            </div>
            <div className="w-5 h-1 bg-amber-400/60 rounded-full mt-0.5" />
          </div>
        ))}
      </div>

      {/* Blooming lotus & offering light when gift is triggered */}
      {isGiftActive && (
        <div className="absolute bottom-14 z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-950/90 via-amber-800/90 to-amber-950/90 border border-amber-300 shadow-[0_0_25px_#f59e0b] animate-bounce">
          <span className="text-base">🪷</span>
          <span className="text-xs font-bold text-amber-200 tracking-wider uppercase">
            {activeGiftPrayer || 'Phật Quang Phổ Chiếu - Vạn Sự Bình An'}
          </span>
          <span className="text-base">🌹</span>
        </div>
      )}
    </div>
  );
};
