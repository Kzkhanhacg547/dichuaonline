import React, { useState } from 'react';
import {
  StreamConfig,
  GiftCategory,
  AiTrendReport,
  LeaderboardEntry,
  Devotee,
  CommentEvent,
} from '../types/temple';
import { soundEngine } from '../services/soundEngine';
import { DHARMA_LECTURES, DharmaLecture } from '../data/dharmaLectures';
import { LiveControlPanel } from './LiveControlPanel';

// Link for the TikTok LIVE Studio / OBS "Link" source. LIVE Studio refuses plain localhost, so it goes through
// lvh.me, a public name that points back to this computer (127.0.0.1); vite.config.ts allows that host.
const obsStageUrl = () => `http://lvh.me:${(typeof window !== 'undefined' && window.location.port) || '3000'}/?view=stage`;

interface StreamerDeckProps {
  config: StreamConfig;
  onUpdateConfig: (newConfig: Partial<StreamConfig>) => void;
  onTriggerGift: (
    giftType: GiftCategory,
    giftName: string,
    prayerMeaning: string,
    username: string,
    countIncrement?: number,
    diamonds?: number
  ) => void;
  onAddComment: (username: string, comment: string) => void;
  onAddDevotee: (username: string) => void;
  onResetCrowd: () => void;
  leaderboardDonors: LeaderboardEntry[];
  devotees: Devotee[];
  comments: CommentEvent[];
  aiReport: AiTrendReport | null;
  isLoadingAi: boolean;
  onRefreshAiAnalysis: () => void;
  onStartDharma?: (lecture: DharmaLecture) => void;
  onStopDharma?: () => void;
  activeDharmaTitle?: string;
  activeDharmaText?: string;
  tikTokStatus?: import('../types/temple').TikTokLiveStatus;
  onConnectTikTok?: (username: string) => void;
  onDisconnectTikTok?: () => void;
}

export const StreamerDeck: React.FC<StreamerDeckProps> = ({
  config,
  onUpdateConfig,
  onTriggerGift,
  onAddComment,
  onAddDevotee,
  onResetCrowd,
  leaderboardDonors,
  devotees,
  comments,
  aiReport,
  isLoadingAi,
  onRefreshAiAnalysis,
  onStartDharma,
  onStopDharma,
  activeDharmaTitle,
  activeDharmaText,
  tikTokStatus,
  onConnectTikTok,
  onDisconnectTikTok,
}) => {
  const [activeTab, setActiveTab] = useState<'tiktok_obs' | 'simulator' | 'audio' | 'dharma' | 'ai' | 'report'>('tiktok_obs');
  const [tiktokUsernameInput, setTiktokUsernameInput] = useState(tikTokStatus?.username || '');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [customUser, setCustomUser] = useState('PhatTu123');
  const [customComment, setCustomComment] = useState('adidaphat');
  const [autoComboActive, setAutoComboActive] = useState(false);

  // Quick preset prayer comments
  const presetComments = [
    'adidaphat',
    'A di đà phật',
    'Cầu bình an cho gia đình',
    'Cầu con trúng số may mắn',
    'Cầu sức khỏe cho cha mẹ',
    'Cầu sớm có người yêu',
  ];

  const randomUsers = ['PhatTu123', 'ARC.195', 'Cheesecake', 'Lương Minh', 'Cây Nấm Rơm', 'Thanh Mai'];
  const getRandomUser = () => randomUsers[Math.floor(Math.random() * randomUsers.length)];

  // Rapid Auto Combo Simulator (runs 5 consecutive gifts)
  const handleAutoCombo = (giftType: GiftCategory, name: string, prayer: string, diamonds: number) => {
    if (autoComboActive) return;
    setAutoComboActive(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      onTriggerGift(giftType, name, prayer, customUser || 'PhatTu123', 1, diamonds);
      if (step >= 5) {
        clearInterval(interval);
        setAutoComboActive(false);
      }
    }, 600);
  };

  // Export Daily Performance Report
  const handleExportReport = () => {
    const reportData = {
      streamTitle: `${config.liveTitle} - ${config.channelName}`,
      exportDate: new Date().toISOString(),
      summary: {
        totalKneelingDevotees: devotees.length,
        totalCommentsCount: comments.length,
        topBenefactorsCount: leaderboardDonors.length,
        totalDiamondsContributed: leaderboardDonors.reduce((acc, d) => acc + d.diamonds, 0),
      },
      topBenefactors: leaderboardDonors.slice(0, 10),
      aiTrendSummary: aiReport ? aiReport.sentimentSummary : 'N/A',
      recentCommentsSample: comments.slice(-15),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TamTinhTamAn_LiveReport_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#120806] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-200">
      {/* DECK HEADER / CONNECTION SETTINGS */}
      <div className="p-3.5 border-b border-stone-800 bg-stone-900/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
            ⚙
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wide uppercase">
              Bảng Điều Khiển Live: {config.liveTitle}
            </h3>
            <span className="text-[11px] text-stone-400">
              Giọng Nữ Phật Giáo · Đồ họa Vạn Phật & Bảng Công Đức
            </span>
          </div>
        </div>

        {/* Channel Name & Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1">
            <span className="text-xs text-amber-400 font-bold mr-1">Tên Kênh:</span>
            <input
              type="text"
              value={config.channelName}
              onChange={(e) => onUpdateConfig({ channelName: e.target.value })}
              placeholder="Thích Tâm An..."
              className="bg-transparent text-xs text-white focus:outline-none w-28 font-medium"
            />
          </div>

          <button
            onClick={() => onUpdateConfig({ isConnected: !config.isConnected })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
              config.isConnected
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                config.isConnected ? 'bg-white' : 'bg-stone-500'
              }`}
            />
            {config.isConnected ? 'Đang Live' : 'Kết Nối Live'}
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-stone-800 bg-stone-950/40 px-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tiktok_obs')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'tiktok_obs'
              ? 'border-amber-400 text-amber-300 bg-amber-950/30'
              : 'border-transparent text-stone-300 hover:text-white'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {tikTokStatus?.isConnected ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-500"></span>
            )}
          </span>
          <span>📡</span> TikTok LIVE & OBS (Trực Tiếp)
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'border-amber-400 text-amber-300 bg-amber-950/20'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>🎁</span> Giả Lập Quà & Cầu An
        </button>

        <button
          onClick={() => setActiveTab('audio')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'audio'
              ? 'border-amber-400 text-amber-300 bg-amber-950/20'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>🎙</span> Nhạc Phật Giáo & Giọng Đọc
        </button>

        <button
          onClick={() => setActiveTab('dharma')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'dharma'
              ? 'border-amber-400 text-amber-300 bg-amber-950/20'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>📜</span> Thuyết Giảng Phật Pháp
          {config.isDharmaLectureActive && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'ai'
              ? 'border-amber-400 text-amber-300 bg-amber-950/20'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>🧠</span> AI Dự Báo Tâm Nguyện
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'report'
              ? 'border-amber-400 text-amber-300 bg-amber-950/20'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>📊</span> Báo Cáo
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="p-4 flex-1 overflow-y-auto">
        {/* TAB 0: TIKTOK LIVE & OBS INTEGRATION */}
        {activeTab === 'tiktok_obs' && (
          <div className="space-y-4">
            <LiveControlPanel />

            {/* 1. REAL TIKTOK LIVE CONNECTOR BOX */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-amber-500/30 shadow-lg space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔴</span>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Kết Nối Phòng Live TikTok Thật (Webcast Real-time)
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Bắt cmt "adidaphat", quà cúng dường & người xem trực tiếp từ TikTok app
                    </p>
                  </div>
                </div>

                {/* Connection Status Badge */}
                <div className="flex items-center gap-2">
                  {tikTokStatus?.isConnected ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Đang Live: @{tikTokStatus.username}
                    </span>
                  ) : tikTokStatus?.isConnecting ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 border border-amber-500/50 text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-spin" />
                      Đang kết nối...
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-800 text-stone-400 border border-stone-700">
                      ⚪ Chưa kết nối
                    </span>
                  )}
                </div>
              </div>

              {/* Input Username & Action */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="flex-1 flex items-center bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 focus-within:border-amber-400 transition-colors">
                  <span className="text-sm font-bold text-amber-400 mr-1.5">@</span>
                  <input
                    type="text"
                    value={tiktokUsernameInput}
                    onChange={(e) => setTiktokUsernameInput(e.target.value.replace(/^@/, ''))}
                    placeholder="Nhập username TikTok của bạn (không cần @)"
                    className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-full font-medium"
                  />
                </div>

                {tikTokStatus?.isConnected ? (
                  <button
                    onClick={() => onDisconnectTikTok?.()}
                    className="px-4 py-2 bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>⏹</span> Ngắt Kết Nối
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (tiktokUsernameInput.trim() && onConnectTikTok) {
                        onConnectTikTok(tiktokUsernameInput.trim());
                      }
                    }}
                    disabled={tikTokStatus?.isConnecting || !tiktokUsernameInput.trim()}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-50 text-stone-950 rounded-lg text-xs font-black transition-all whitespace-nowrap shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>🔴</span> Bắt Đầu Kết Nối Live Thật
                  </button>
                )}
              </div>

              {/* Live Room Stats when connected */}
              {tikTokStatus?.isConnected && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2 rounded-lg bg-stone-950/70 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">Người Xem (Viewers)</span>
                    <span className="text-sm font-black text-amber-300">
                      👥 {tikTokStatus.viewerCount ?? 0}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-950/70 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">Lượt Thích (Likes)</span>
                    <span className="text-sm font-black text-rose-400">
                      ❤️ {tikTokStatus.totalLikes ?? 0}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-950/70 border border-stone-800 text-center">
                    <span className="text-[10px] text-stone-400 block">Mã Phòng Live</span>
                    <span className="text-[11px] font-mono font-bold text-stone-300 truncate block">
                      {tikTokStatus.roomId ? `#${tikTokStatus.roomId.slice(-6)}` : 'Đang đồng bộ'}
                    </span>
                  </div>
                </div>
              )}

              {/* Error Message if any */}
              {tikTokStatus?.error && (
                <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800/60 text-[11px] text-red-200 flex items-start gap-2">
                  <span className="text-base shrink-0">⚠️</span>
                  <div>
                    <strong className="font-bold">Lưu ý kết nối: </strong>
                    {tikTokStatus.error}
                    <div className="mt-1 text-[10px] text-stone-400">
                      💡 Mẹo: Hãy mở app TikTok trên điện thoại hoặc TikTok LIVE Studio trên PC, bấm <strong>Phát trực tiếp (Go LIVE)</strong> trước, sau đó bấm Kết Nối lại tại đây!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. OBS & TIKTOK LIVE STUDIO BROWSER SOURCE URL */}
            <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎥</span>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    Link Màn Hình OBS Studio & TikTok LIVE Studio (Tỷ Lệ 9:16 Dọc)
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Chuẩn 1080 x 1920
                </span>
              </div>

              {/* URL Display with Copy Button */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 px-3 py-2 bg-stone-950 border border-stone-700 rounded-lg text-xs font-mono text-amber-200 select-all overflow-x-auto whitespace-nowrap">
                  {obsStageUrl()}
                </div>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(obsStageUrl());
                      setCopiedUrl(true);
                      setTimeout(() => setCopiedUrl(false), 3000);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    copiedUrl
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <span>{copiedUrl ? '✓' : '📋'}</span>
                  <span>{copiedUrl ? 'Đã Sao Chép!' : 'Sao Chép Link OBS'}</span>
                </button>
                <a
                  href="/?view=stage"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>👁️</span> Mở Tab Tràn Viền
                </a>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {/* Method 1: TikTok LIVE Studio */}
                <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <span>📱</span> Cách 1: Dùng TikTok LIVE Studio (Khuyên Dùng)
                  </div>
                  <ol className="text-[11px] text-stone-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>Mở phần mềm <strong>TikTok LIVE Studio</strong> trên máy tính.</li>
                    <li>Trong mục Nguồn (Sources), bấm <strong>Thêm Nguồn (Add Source)</strong> &rarr; Chọn <strong>Trình duyệt (Browser)</strong>.</li>
                    <li>Dán link OBS ở trên vào ô <strong>URL</strong>.</li>
                    <li>Đặt kích thước: Rộng <strong>1080</strong>, Cao <strong>1920</strong> (Tỷ lệ 9:16 dọc).</li>
                    <li>Tích chọn <strong>Điều khiển âm thanh</strong> (Control audio via OBS/Studio) để phát tiếng chuông mõ & kinh Niệm Phật qua Live!</li>
                  </ol>
                </div>

                {/* Method 2: OBS Studio */}
                <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <span>🎬</span> Cách 2: Dùng OBS Studio
                  </div>
                  <ol className="text-[11px] text-stone-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>Mở <strong>OBS Studio</strong> &rarr; Tại khung <strong>Sources (+)</strong> &rarr; Chọn <strong>Browser</strong>.</li>
                    <li>Dán URL ở trên vào &rarr; Đặt Width: <strong>1080</strong>, Height: <strong>1920</strong>, FPS: <strong>60</strong>.</li>
                    <li>Đánh dấu tích vào ô <strong>Control audio via OBS</strong>.</li>
                    <li>Bấm <strong>Start Virtual Camera (Khởi động Camera ảo)</strong> nếu bạn dùng TikTok trên điện thoại, hoặc nhập <strong>Stream Key</strong> TikTok vào Settings &rarr; Stream!</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 3. EXPLANATION: CÁCH HOẠT ĐỘNG VỚI USER & QUÀ THẬT */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2.5">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>💡</span> Cơ Chế Hoạt Động Khi User Thật Vào Tương Tác
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px] text-stone-300">
                <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="font-bold text-amber-200 flex items-center gap-1">
                    <span>💬</span> Bình luận thật trên TikTok:
                  </div>
                  <p className="leading-relaxed text-stone-300">
                    Khi người xem gõ <strong className="text-white">"adidaphat"</strong> hoặc <strong className="text-white">"a di đà phật"</strong> trên ứng dụng TikTok, hình ảnh phật tử quỳ lạy sẽ xuất hiện ngay lập tức trên Chánh điện cùng lời cầu nguyện trên đầu! Chuông mõ sẽ ngân vang và giọng nữ Phật giáo chào mừng!
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="font-bold text-amber-200 flex items-center gap-1">
                    <span>🎁</span> Tặng quà thật trên TikTok:
                  </div>
                  <p className="leading-relaxed text-stone-300">
                    Khán giả tặng Hoa hồng, Hoa sen, Tim, Tiền xu... màn hình Chánh điện sẽ kích hoạt hiệu ứng hoa sen rơi bừng sáng, cộng dồn điểm vào <strong>BẢNG CÔNG ĐỨC</strong>, và giọng nữ miền Bắc thanh tịnh đọc cảm niệm công đức (Dù tặng x1 hay combo x5 cũng chỉ đọc 1 lần trang nghiêm).
                  </p>
                </div>
              </div>

              <div className="p-2 rounded bg-amber-900/30 border border-amber-600/30 text-[10px] text-amber-200 flex items-center gap-2">
                <span>🔔</span>
                <span>
                  <strong>Quy tắc tôn kính:</strong> Khi streamer bật tab <strong>"Thuyết Giảng Phật Pháp"</strong>, hệ thống sẽ tự động tắt đọc quà của phật tử để bài pháp thoại không bị phân tâm.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: TEST SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-4">
            {/* Quick Gift Triggers Matching The Left Panel */}
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span>🎁</span> Bắn Sự Kiện Cúng Dường (Ý Nghĩa Cúng)
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-stone-300">
                  <span>Thí chủ:</span>
                  <input
                    type="text"
                    value={customUser}
                    onChange={(e) => setCustomUser(e.target.value)}
                    className="w-28 px-1.5 py-0.5 rounded bg-stone-950 border border-stone-700 text-amber-300 font-bold text-xs"
                  />
                </div>
              </div>

              {/* 5 Gift Buttons matching screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {/* 1. Hoa hồng -> Cầu bình an */}
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base">🌹</span>
                    <span className="text-[10px] text-cyan-300 font-bold">💎1</span>
                  </div>
                  <div className="text-[10px] font-bold text-rose-200">Hoa Hồng</div>
                  <span className="text-[8.5px] text-amber-200">Cầu Bình An</span>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() =>
                        onTriggerGift('dang_huong', 'Hoa hồng', 'Cầu Bình An', customUser, 1, 1)
                      }
                      className="flex-1 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[10px] font-bold"
                    >
                      +1
                    </button>
                    <button
                      onClick={() =>
                        handleAutoCombo('dang_huong', 'Hoa hồng', 'Cầu Bình An', 1)
                      }
                      disabled={autoComboActive}
                      className="px-1.5 py-1 bg-rose-900 text-rose-200 rounded text-[10px] font-bold"
                    >
                      x5
                    </button>
                  </div>
                </div>

                {/* 2. TikTok -> Cầu sức khỏe */}
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base">🎵</span>
                    <span className="text-[10px] text-cyan-300 font-bold">💎1</span>
                  </div>
                  <div className="text-[10px] font-bold text-cyan-200">TikTok</div>
                  <span className="text-[8.5px] text-amber-200">Cầu Sức Khỏe</span>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() =>
                        onTriggerGift('le_phat', 'TikTok', 'Cầu Sức Khỏe', customUser, 1, 1)
                      }
                      className="flex-1 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[10px] font-bold"
                    >
                      +1
                    </button>
                    <button
                      onClick={() =>
                        handleAutoCombo('le_phat', 'TikTok', 'Cầu Sức Khỏe', 1)
                      }
                      disabled={autoComboActive}
                      className="px-1.5 py-1 bg-cyan-900 text-cyan-200 rounded text-[10px] font-bold"
                    >
                      x5
                    </button>
                  </div>
                </div>

                {/* 3. Quả Đào -> Cầu gia đình bình an */}
                <div className="p-2.5 rounded-lg bg-orange-950/40 border border-orange-800/40 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base">🍑</span>
                    <span className="text-[10px] text-cyan-300 font-bold">💎1</span>
                  </div>
                  <div className="text-[10px] font-bold text-orange-200">Quả Đào</div>
                  <span className="text-[8.5px] text-amber-200">Cầu Gia Đình</span>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() =>
                        onTriggerGift('qua_dao', 'Quả Đào', 'Cầu Gia Đình Bình An', customUser, 1, 1)
                      }
                      className="flex-1 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded text-[10px] font-bold"
                    >
                      +1
                    </button>
                    <button
                      onClick={() =>
                        handleAutoCombo('qua_dao', 'Quả Đào', 'Cầu Gia Đình Bình An', 1)
                      }
                      disabled={autoComboActive}
                      className="px-1.5 py-1 bg-orange-900 text-orange-200 rounded text-[10px] font-bold"
                    >
                      x5
                    </button>
                  </div>
                </div>

                {/* 4. Bắn Tim -> Cầu sớm có người yêu */}
                <div className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-800/40 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base">💖</span>
                    <span className="text-[10px] text-cyan-300 font-bold">💎1</span>
                  </div>
                  <div className="text-[10px] font-bold text-pink-200">Bắn Tim</div>
                  <span className="text-[8.5px] text-amber-200">Cầu Có Người Yêu</span>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() =>
                        onTriggerGift('ban_tim', 'Bắn Tim', 'Cầu Sớm Có Người Yêu', customUser, 1, 1)
                      }
                      className="flex-1 py-1 bg-pink-600 hover:bg-pink-500 text-white rounded text-[10px] font-bold"
                    >
                      +1
                    </button>
                    <button
                      onClick={() =>
                        handleAutoCombo('ban_tim', 'Bắn Tim', 'Cầu Sớm Có Người Yêu', 1)
                      }
                      disabled={autoComboActive}
                      className="px-1.5 py-1 bg-pink-900 text-pink-200 rounded text-[10px] font-bold"
                    >
                      x5
                    </button>
                  </div>
                </div>

                {/* 5. Hoa Sen -> Cầu bách gia trăm họ */}
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base">🪷</span>
                    <span className="text-[10px] text-cyan-300 font-bold">💎5</span>
                  </div>
                  <div className="text-[10px] font-bold text-amber-200">Hoa Sen</div>
                  <span className="text-[8.5px] text-amber-200">Bách Gia Trăm Họ</span>
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() =>
                        onTriggerGift('dang_hoa_sen', 'Hoa Sen', 'Cầu Bách Gia Trăm Họ', customUser, 1, 5)
                      }
                      className="flex-1 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded text-[10px] font-bold"
                    >
                      +1
                    </button>
                    <button
                      onClick={() =>
                        handleAutoCombo('dang_hoa_sen', 'Hoa Sen', 'Cầu Bách Gia Trăm Họ', 5)
                      }
                      disabled={autoComboActive}
                      className="px-1.5 py-1 bg-amber-900 text-amber-200 rounded text-[10px] font-bold"
                    >
                      x5
                    </button>
                  </div>
                </div>

                {/* 6. VIP gift -> read aloud */}
                <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-400/60 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base">👑</span>
                    <span className="text-[10px] text-cyan-300 font-bold">💎199</span>
                  </div>
                  <div className="text-[10px] font-bold text-amber-200">Quà VIP</div>
                  <span className="text-[8.5px] text-amber-200">Có giọng đọc cảm ơn</span>
                  <button
                    onClick={() =>
                      onTriggerGift('le_phat', 'Lễ Phật Đại Cúng Dường', 'Đại Công Đức Thập Phương', customUser, 1, 199)
                    }
                    className="mt-1 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-[10px] font-bold"
                  >
                    Tặng thử
                  </button>
                </div>
              </div>
            </div>

            {/* Comment & "adidaphat" Entry Spawner */}
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>💬</span> Gõ "adidaphat" & Bình Luận Cầu An
              </h4>

              <div className="flex flex-wrap gap-1.5">
                {presetComments.map((txt) => (
                  <button
                    key={txt}
                    onClick={() => {
                      const user = getRandomUser();
                      onAddComment(user, txt);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition ${
                      txt === 'adidaphat'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-300'
                    }`}
                  >
                    "{txt}"
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="text"
                  value={customComment}
                  onChange={(e) => setCustomComment(e.target.value)}
                  placeholder="Gõ adidaphat hoặc lời chúc..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => {
                    if (customComment.trim()) {
                      onAddComment(customUser || 'phat_tu', customComment);
                    }
                  }}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-sm"
                >
                  Gửi Bình Luận
                </button>
              </div>
            </div>

            {/* Crowd Quick Actions */}
            <div className="p-3 bg-stone-900/70 border border-stone-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">👥</span>
                <span className="text-xs text-stone-300">
                  Hiện có <strong className="text-amber-300">{devotees.length}</strong> phật tử trong chánh điện
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onAddDevotee(getRandomUser() + Math.floor(Math.random() * 90))}
                  className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 border border-stone-700"
                >
                  +1 Phật Tử
                </button>
                <button
                  onClick={onResetCrowd}
                  className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-stone-900 text-xs text-stone-400 border border-stone-800"
                >
                  Đặt Lại Hàng Quỳ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIETNAMESE BUDDHIST FEMALE VOICE & SOUND MIXER */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🎙</span> Giọng Nữ Phật Giáo (Dịu Dàng, Từ Bi)
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Tự động đọc cảm niệm công đức, tri ân thí chủ dâng hoa, dâng lễ cầu an
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoTts}
                    onChange={(e) => onUpdateConfig({ autoTts: e.target.checked })}
                    className="rounded border-stone-700 text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-xs font-semibold text-white">Tự Động Đọc</span>
                </label>
              </div>

              {/* Voice Gender Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-300 font-medium">Lựa Chọn Giọng:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdateConfig({ voiceGender: 'female', ttsPitch: 1.08 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      config.voiceGender === 'female'
                        ? 'bg-amber-400 text-stone-950 shadow-md'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    👩 Giọng Nữ Phật Giáo (Khuyên dùng)
                  </button>

                  <button
                    onClick={() => onUpdateConfig({ voiceGender: 'male', ttsPitch: 0.88 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      config.voiceGender === 'male'
                        ? 'bg-amber-400 text-stone-950 shadow-md'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    👨 Giọng Nam Thầy Trầm Ấm
                  </button>
                </div>
              </div>

              {/* Sliders for Speech Rate and Pitch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-400">Tốc Độ Đọc (Rate):</span>
                    <span className="font-bold text-amber-300">{config.ttsSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.15"
                    step="0.05"
                    value={config.ttsSpeed}
                    onChange={(e) => {
                      const rate = parseFloat(e.target.value);
                      onUpdateConfig({ ttsSpeed: rate });
                      // Also apply on the live stage page in TikTok LIVE Studio
                      fetch('/api/control', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'setRate', text: String(rate) }),
                      }).catch(() => {});
                    }}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-400">Cao Độ Giọng (Pitch):</span>
                    <span className="font-bold text-amber-300">{config.ttsPitch}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.25"
                    step="0.05"
                    value={config.ttsPitch}
                    onChange={(e) => onUpdateConfig({ ttsPitch: parseFloat(e.target.value) })}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Anti-spam notification note */}
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-600/30 text-[11px] text-amber-200 flex items-center gap-2">
                <span className="text-base">🔔</span>
                <span>
                  <strong>Quy chuẩn Live:</strong> Mọi quà đều được cảm ơn kèm câu chúc (combo chỉ đọc 1 lần, mỗi người tối đa 1 lần/30 giây, lúc đông thì bỏ qua quà nhỏ). Ngoài ra đọc khi có người follow, chào khách, chúc mong cầu và nhắc chia sẻ.
                </span>
              </div>

              {/* Sample Voice Test Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() =>
                    soundEngine.readGiftAcknowledgment(
                      customUser || 'PhatTu123',
                      'Hoa sen',
                      1
                    )
                  }
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>🪷</span> Thử Giọng Nữ Dịu Dàng (Chuẩn Hoa Sen Mặc Định)
                </button>

                <button
                  onClick={() =>
                    soundEngine.readFollowThanks(customUser || 'PhatTu123')
                  }
                  className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-amber-600/30"
                >
                  <span>☸</span> Thử Cảm Ơn Follow
                </button>

                <button
                  onClick={() => soundEngine.readShareReminder([...new Set(comments.slice(-10).map((c) => c.displayName))].slice(-3))}
                  className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-amber-600/30"
                >
                  <span>📣</span> Thử Nhắc Chia Sẻ
                </button>
              </div>
            </div>

            {/* NHẠC PHẬT GIÁO THẬT PHÁT LIÊN TỤC ALWAYS */}
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🎵</span> Nhạc Phật Giáo Chánh Điện (Phát Liên Tục Always)
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Nhạc niệm Phật và sáo trúc thiền môn thanh tịnh (Đã loại bỏ hoàn toàn sóng âm gây đau đầu)
                  </p>
                </div>

                <button
                  onClick={() => onUpdateConfig({ bgmEnabled: !config.bgmEnabled })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    config.bgmEnabled
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${config.bgmEnabled ? 'bg-white animate-pulse' : 'bg-stone-500'}`} />
                  {config.bgmEnabled ? 'Đang Phát Nhạc Phật' : 'Đã Tắt Nhạc'}
                </button>
              </div>

              {/* Real Buddhist Track Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs text-stone-300 font-medium">Lựa Chọn Bài Nhạc Phật Giáo:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onUpdateConfig({ buddhistMusicTrack: 'chill' });
                      soundEngine.switchBgmTrack('chill');
                    }}
                    className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2.5 ${
                      config.buddhistMusicTrack === 'chill'
                        ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-lg">🍃</span>
                    <div>
                      <div className="text-xs font-bold">Chill Thư Giãn</div>
                      <div className="text-[10px] text-amber-400/90">Piano, sáo nhẹ, không lời</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateConfig({ buddhistMusicTrack: 'sao_truc' });
                      soundEngine.switchBgmTrack('sao_truc');
                    }}
                    className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2.5 ${
                      config.buddhistMusicTrack === 'sao_truc'
                        ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-lg">🎋</span>
                    <div>
                      <div className="text-xs font-bold">Sáo Trúc & Đàn Tranh</div>
                      <div className="text-[10px] text-amber-400/90">Dịu nhẹ, trong trẻo, năng lượng tích cực</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateConfig({ buddhistMusicTrack: 'niem_phat' });
                      soundEngine.switchBgmTrack('niem_phat');
                    }}
                    className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2.5 ${
                      config.buddhistMusicTrack === 'niem_phat'
                        ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-lg">🪷</span>
                    <div>
                      <div className="text-xs font-bold">Niệm Phật 6 Chữ</div>
                      <div className="text-[10px] text-stone-400">Thầy Trí Thoát · Chuông mõ chùa</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateConfig({ buddhistMusicTrack: 'khuc_thien_dao' });
                      soundEngine.switchBgmTrack('khuc_thien_dao');
                    }}
                    className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2.5 ${
                      config.buddhistMusicTrack === 'khuc_thien_dao'
                        ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-lg">🎶</span>
                    <div>
                      <div className="text-xs font-bold">Khúc Thiền Đạo</div>
                      <div className="text-[10px] text-stone-400">Guzheng & Tiêu thanh tịnh</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-400">Âm Lượng Nhạc Nền:</span>
                  <span className="font-bold text-amber-300">{Math.round(config.bgmVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.bgmVolume}
                  onChange={(e) => onUpdateConfig({ bgmVolume: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Sacred Temple Sounds */}
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                Âm Thanh Nhạc Cụ Thiền
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => soundEngine.playTempleBell(1.0)}
                  className="p-3 bg-stone-950 rounded-lg border border-stone-800 hover:border-amber-500/50 text-left transition flex items-center gap-2"
                >
                  <span className="text-xl">🔔</span>
                  <div>
                    <div className="text-xs font-bold text-white">Chuông U Minh (8 Giây)</div>
                    <div className="text-[10px] text-stone-400">Ngân sâu trầm ấm</div>
                  </div>
                </button>

                <button
                  onClick={() => soundEngine.playMuoGong(1.4)}
                  className="p-3 bg-stone-950 rounded-lg border border-stone-800 hover:border-amber-500/50 text-left transition flex items-center gap-2"
                >
                  <span className="text-xl">🪵</span>
                  <div>
                    <div className="text-xs font-bold text-amber-300">Mõ Gia Trì (Cốc Cốc)</div>
                    <div className="text-[10px] text-stone-400">Âm vang thùng gỗ rỗng</div>
                  </div>
                </button>

                <button
                  onClick={() => soundEngine.playLotusBloom(1.2)}
                  className="p-3 bg-stone-950 rounded-lg border border-stone-800 hover:border-amber-500/50 text-left transition flex items-center gap-2"
                >
                  <span className="text-xl">🪷</span>
                  <div>
                    <div className="text-xs font-bold text-amber-300">Chuông Sen Nở (Khánh Đồng)</div>
                    <div className="text-[10px] text-stone-400">Thanh thoát, ngân vang</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: THUYẾT GIẢNG PHẬT PHÁP */}
        {activeTab === 'dharma' && (
          <div className="space-y-4">
            {/* Auto-Mute Notice Banner */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50 text-stone-200 space-y-1.5 shadow-md">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wide">
                <span>🟢</span>
                <span>Tự Động Tắt Đọc Dâng Quà Khi Thuyết Giảng</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Khi thời thuyết giảng Phật pháp bắt đầu, hệ thống sẽ <strong>tự động tắt tiếng đọc quà của phật tử</strong> để đảm bảo không khí trang nghiêm thanh tịnh. Quà cúng dường của phật tử vẫn hiện số combo và hoa sen trên màn hình để ghi nhận công đức.
              </p>
            </div>

            {/* Currently Active Dharma Lecture Bar */}
            {config.isDharmaLectureActive ? (
              <div className="p-4 bg-stone-900/90 border border-amber-400 rounded-xl space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-amber-300 uppercase">
                      Đang Thuyết Giảng: {activeDharmaTitle}
                    </span>
                  </div>

                  <button
                    onClick={onStopDharma}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition"
                  >
                    ⏹ Dừng Thuyết Giảng
                  </button>
                </div>

                {activeDharmaText && (
                  <div className="p-3 rounded-lg bg-stone-950 border border-amber-500/30 text-stone-200 text-xs italic leading-relaxed">
                    "{activeDharmaText}"
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📜</span>
                  <span className="text-xs text-stone-300">
                    Chưa có bài thuyết giảng nào đang phát. Hãy chọn 1 bài dưới đây để bắt đầu.
                  </span>
                </div>
              </div>
            )}

            {/* Curated Dharma Lectures List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>📚</span> Tuyển Tập Pháp Thoại & Lời Phật Dạy Ngắn
              </h4>

              <p className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-600/30 text-[11px] text-amber-200">
                Bấm <strong>Bắt đầu</strong> ở bài nào thì màn hình live đọc bài đó. Trong lúc giảng, giọng chỉ đọc bài giảng (trừ "Đọc ngay").
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {DHARMA_LECTURES.map((lec) => {
                  const isCurrent = config.isDharmaLectureActive && config.activeDharmaId === lec.id;
                  return (
                    <div
                      key={lec.id}
                      className={`p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-950/40 border-amber-400 shadow-md'
                          : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {lec.topic}
                          </span>
                          <h5 className="text-xs font-bold text-white">{lec.title}</h5>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-2">
                          {lec.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isCurrent ? (
                          <button
                            onClick={onStopDharma}
                            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition"
                          >
                            ⏹ Dừng Lại
                          </button>
                        ) : (
                          <button
                            onClick={() => onStartDharma && onStartDharma(lec)}
                            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition flex items-center gap-1"
                          >
                            <span>▶</span> Phát Bài Giảng
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI LIVE TREND & SENTIMENT */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🧠</span> Trí Tuệ Nhân Tạo (Gemini 3.8 Flash)
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Phân tích tâm nguyện đại chúng và dự báo loại quà sắp tăng
                  </p>
                </div>

                <button
                  onClick={onRefreshAiAnalysis}
                  disabled={isLoadingAi}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs"
                >
                  {isLoadingAi ? 'Đang Phân Tích...' : 'Cập Nhật Phân Tích'}
                </button>
              </div>

              {aiReport ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-lg bg-stone-950/80 border border-amber-500/30">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                      Không Khí Đại Chúng
                    </span>
                    <p className="text-xs text-stone-200 mt-1 italic">
                      "{aiReport.sentimentSummary}"
                    </p>
                  </div>

                  {/* Prayer Bars */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Cầu Bình An & Giải Hạn</span>
                      <span className="text-amber-300 font-bold">
                        {aiReport.prayerBreakdown.peace}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${aiReport.prayerBreakdown.peace}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Cầu Tài Lộc & May Mắn</span>
                      <span className="text-emerald-300 font-bold">
                        {aiReport.prayerBreakdown.wealth}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${aiReport.prayerBreakdown.wealth}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-bold">
                        Lời Chúc Hồi Hướng Giọng Nữ
                      </span>
                      <p className="text-xs text-stone-100 font-medium mt-0.5">
                        "{aiReport.suggestedBlessing}"
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        soundEngine.speakPreferredBuddhistVoice(aiReport.suggestedBlessing)
                      }
                      className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold shrink-0 ml-3"
                    >
                      Đọc Lời Chúc
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-stone-400 text-xs italic">
                  Nhấn "Cập Nhật Phân Tích" để AI phân tích.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: BẢNG CÔNG ĐỨC & REPORT */}
        {activeTab === 'report' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-stone-900/70 border border-stone-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    Bảng Công Đức & Thống Kê Phiên Live
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Tổng kết phật tử cúng dường và danh sách thí chủ
                  </p>
                </div>

                <button
                  onClick={handleExportReport}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <span>📥</span> Xuất Báo Cáo (JSON)
                </button>
              </div>

              {/* Benefactors Table */}
              <div className="bg-stone-950 rounded-lg border border-stone-800 overflow-hidden">
                <div className="grid grid-cols-12 text-[10px] text-stone-400 font-semibold uppercase px-3 py-2 border-b border-stone-800 bg-stone-900/40">
                  <span className="col-span-2">Hạng</span>
                  <span className="col-span-7">Thí Chủ (TikTok)</span>
                  <span className="col-span-3 text-right">Kim Cương</span>
                </div>

                <div className="divide-y divide-stone-800/60 max-h-48 overflow-y-auto">
                  {leaderboardDonors.map((donor, idx) => (
                    <div
                      key={donor.username + idx}
                      className="grid grid-cols-12 text-xs text-stone-200 px-3 py-2 items-center"
                    >
                      <span className="col-span-2 font-bold text-amber-400">
                        #{idx + 1}
                      </span>
                      <span className="col-span-7 truncate font-medium">
                        {donor.displayName || donor.username}
                      </span>
                      <span className="col-span-3 text-right font-bold text-amber-300 tabular-nums">
                        💎 {donor.diamonds}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
