import React, { useState } from 'react';
import { Camera as CameraIcon, Maximize2, Radio, RefreshCw } from 'lucide-react';

const LiveView: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2 text-center text-slate-500">
            <Radio className="mx-auto animate-pulse text-red-500" size={48} />
            <p className="text-sm font-medium">正在连接实时视频流...</p>
          </div>
        </div>

        <div className="absolute left-4 top-4 flex items-center gap-1 rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          LIVE
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button type="button" className="rounded-lg bg-black/40 p-2 text-white backdrop-blur-md">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors active:bg-slate-50"
        >
          <RefreshCw size={18} className={`text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium text-slate-700">刷新画面</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors active:bg-slate-50"
        >
          <CameraIcon size={18} className="text-blue-500" />
          <span className="text-sm font-medium text-slate-700">截图保存</span>
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-800">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          智能边缘检测
        </h4>
        <p className="text-xs leading-relaxed text-blue-600">
          当前监控视野覆盖桌面主要区域，AI 正在后台分析物体摆放规律，发现异常后可进一步推送提醒或触发清洁任务。
        </p>
      </div>

      <div className="mt-2 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-10 text-slate-400">
        <p className="text-sm">这里预留给后续的实时识别标注层。</p>
      </div>
    </div>
  );
};

export default LiveView;
