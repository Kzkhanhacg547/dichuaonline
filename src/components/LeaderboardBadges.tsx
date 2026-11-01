import React, { useState } from 'react';
import { LeaderboardEntry } from '../types/temple';

interface LeaderboardBadgesProps {
  roseScore: number;
  prayerScore: number;
  lotusScore: number;
  topRoseDonor?: LeaderboardEntry;
  topPrayerDonor?: LeaderboardEntry;
  topLotusDonor?: LeaderboardEntry;
  allDonors: LeaderboardEntry[];
}

export const LeaderboardBadges: React.FC<LeaderboardBadgesProps> = ({
  roseScore,
  prayerScore,
  lotusScore,
  topRoseDonor,
  topPrayerDonor,
  topLotusDonor,
  allDonors,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'dang_huong',
      title: 'Dân Hương',
      icon: '🌹',
      score: roseScore,
      topDonor: topRoseDonor,
      bgGrad: 'from-rose-950/80 to-rose-900/60',
      borderCol: 'border-rose-400/40',
      textColor: 'text-rose-200',
    },
    {
      id: 'le_phat',
      title: 'Lễ Phật',
      icon: '✋',
      score: prayerScore,
      topDonor: topPrayerDonor,
      bgGrad: 'from-amber-950/80 to-amber-900/60',
      borderCol: 'border-amber-400/40',
      textColor: 'text-amber-200',
    },
    {
      id: 'dang_hoa_sen',
      title: 'Dân Hoa Sen',
      icon: '🪷',
      score: lotusScore,
      topDonor: topLotusDonor,
      bgGrad: 'from-pink-950/80 to-pink-900/60',
      borderCol: 'border-pink-400/40',
      textColor: 'text-pink-200',
    },
  ];

  return (
    <div className="relative z-30 flex flex-col items-end gap-1.5 pointer-events-auto">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-linear-to-r ${cat.bgGrad} border ${cat.borderCol} shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 text-left`}
        >
          {/* Gift Icon */}
          <div className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center text-sm shadow-inner">
            {cat.icon}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase leading-none">
              {cat.title}
            </span>
            <span className={`text-xs font-bold ${cat.textColor} tabular-nums leading-tight`}>
              {cat.score.toLocaleString('vi-VN')}
            </span>
          </div>

          {/* Top Contributor Badge */}
          {cat.topDonor && (
            <div className="ml-1 pl-1.5 border-l border-white/10 flex flex-col">
              <span className="text-[8px] text-amber-300/80 uppercase font-medium">Top 1</span>
              <span className="text-[9.5px] font-semibold text-white max-w-[65px] truncate">
                {cat.topDonor.displayName || cat.topDonor.username}
              </span>
            </div>
          )}
        </button>
      ))}

      {/* Popover ranking modal if user clicks on category */}
      {selectedCategory && (
        <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-stone-900/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md z-40 text-stone-100 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="text-base">
                {selectedCategory === 'dang_huong'
                  ? '🌹'
                  : selectedCategory === 'le_phat'
                  ? '✋'
                  : '🪷'}
              </span>
              <h4 className="text-xs font-bold text-amber-300 uppercase">
                Bảng Vàng:{' '}
                {selectedCategory === 'dang_huong'
                  ? 'Dân Hương'
                  : selectedCategory === 'le_phat'
                  ? 'Lễ Phật'
                  : 'Dân Hoa Sen'}
              </h4>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-stone-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {allDonors.filter((d) => d.giftType === selectedCategory).length === 0 ? (
              <p className="text-[11px] text-stone-400 italic py-2 text-center">
                Chưa có thí chủ cúng dường mục này.
              </p>
            ) : (
              allDonors
                .filter((d) => d.giftType === selectedCategory)
                .sort((a, b) => (b.score ?? b.diamonds ?? 0) - (a.score ?? a.diamonds ?? 0))
                .slice(0, 5)
                .map((entry, idx) => (
                  <div
                    key={entry.username}
                    className="flex items-center justify-between px-2 py-1 bg-stone-800/60 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          idx === 0
                            ? 'bg-amber-400 text-stone-950'
                            : idx === 1
                            ? 'bg-slate-300 text-stone-950'
                            : idx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-stone-700 text-stone-300'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-medium text-stone-200 truncate max-w-[110px]">
                        {entry.displayName || entry.username}
                      </span>
                    </div>
                    <span className="font-bold text-amber-300 tabular-nums">
                      {(entry.score ?? entry.diamonds ?? 0).toLocaleString('vi-VN')}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
