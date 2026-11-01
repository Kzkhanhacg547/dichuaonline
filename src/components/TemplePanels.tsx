import React from 'react';
import { LeaderboardEntry } from '../types/temple';

interface TemplePanelsProps {
  topDonors: LeaderboardEntry[];
  onSelectGift: (giftType: any, giftName: string, prayer: string) => void;
}

export const TemplePanels: React.FC<TemplePanelsProps> = ({
  topDonors,
  onSelectGift,
}) => {
  const giftMeanings = [
    {
      type: 'dang_huong',
      name: 'Hoa Hồng',
      icon: '🌹',
      diamonds: 1,
      meaning: 'Cầu Bình An',
    },
    {
      type: 'le_phat',
      name: 'TikTok',
      icon: '🎵',
      diamonds: 1,
      meaning: 'Cầu Sức Khỏe',
    },
    {
      type: 'qua_dao',
      name: 'Quả Đào',
      icon: '🍑',
      diamonds: 1,
      meaning: 'Cầu Gia Đình Bình An',
    },
    {
      type: 'ban_tim',
      name: 'Bắn Tim',
      icon: '💖',
      diamonds: 1,
      meaning: 'Cầu Sớm Có Người Yêu',
    },
    {
      type: 'dang_hoa_sen',
      name: 'Hoa Sen',
      icon: '🪷',
      diamonds: 5,
      meaning: 'Cầu Bách Gia Trăm Họ',
    },
  ];

  return (
    <div className="w-full flex items-start justify-between px-2 sm:px-3 pt-1 pointer-events-auto z-20">
      {/* 1. LEFT TABLET: Ý NGHĨA CÚNG DƯỜNG */}
      <div className="w-[145px] sm:w-[160px] p-2 rounded-xl bg-black/60 border border-amber-500/40 shadow-xl backdrop-blur-md flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider pb-1 border-b border-amber-500/20 flex items-center justify-between">
          <span>Ý Nghĩa Cúng</span>
          <span className="text-[9px] text-stone-400">💎 Lễ</span>
        </div>

        <div className="flex flex-col gap-1">
          {giftMeanings.map((item) => (
            <button
              key={item.type}
              onClick={() => onSelectGift(item.type, item.name, item.meaning)}
              className="flex items-center justify-between p-1 rounded-md hover:bg-amber-950/40 text-left transition-colors group"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9.5px] font-semibold text-stone-200 truncate">
                    {item.name}
                  </span>
                  <span className="text-[8.5px] text-amber-200/80 truncate leading-none">
                    → {item.meaning}
                  </span>
                </div>
              </div>

              <span className="text-[9px] font-bold text-cyan-300 flex items-center gap-0.5 shrink-0 pl-1">
                💎{item.diamonds}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. RIGHT TABLET: BẢNG CÔNG ĐỨC */}
      <div className="w-[145px] sm:w-[160px] p-2 rounded-xl bg-black/60 border border-amber-500/40 shadow-xl backdrop-blur-md flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider pb-1 border-b border-amber-500/20 text-center flex items-center justify-center gap-1">
          <span>☸</span>
          <span>BẢNG CÔNG ĐỨC</span>
        </div>

        <div className="flex flex-col gap-1 max-h-[145px] overflow-y-auto pr-0.5">
          {topDonors.slice(0, 5).map((donor, idx) => (
            <div
              key={donor.username + idx}
              className="flex items-center justify-between p-1 rounded-md bg-stone-900/50 hover:bg-stone-800/60 text-left transition-colors"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                {/* Circular Avatar */}
                <div className="w-5 h-5 rounded-full bg-linear-to-tr from-amber-600 to-yellow-300 p-0.5 shrink-0">
                  <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-[8px] font-bold text-amber-200 uppercase overflow-hidden">
                    {donor.username.slice(0, 1)}
                  </div>
                </div>

                <span className="text-[9.5px] font-medium text-stone-200 truncate max-w-[65px]">
                  {donor.displayName || donor.username}
                </span>
              </div>

              <div className="flex items-center gap-0.5 shrink-0 pl-1">
                <span className="text-[9px] text-cyan-300">💎</span>
                <span className="text-[10px] font-bold text-amber-300 tabular-nums">
                  {donor.diamonds}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
