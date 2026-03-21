import React, { useState } from 'react';
import { Battery, LayoutGrid, Loader2, Play, Power, Thermometer, Trash2 } from 'lucide-react';

const RobotView: React.FC = () => {
  const [taskStatus, setTaskStatus] = useState<'idle' | 'cleaning' | 'organizing'>('idle');

  const handleCommand = (type: 'cleaning' | 'organizing') => {
    setTaskStatus(type);
    window.setTimeout(() => {
      setTaskStatus('idle');
      alert(`任务：${type === 'cleaning' ? '收纳清理' : '物品归位'} 已完成。`);
    }, 5000);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
            <div className={`absolute inset-0 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 ${taskStatus !== 'idle' ? 'animate-ping' : ''}`} />
            <img
              src="https://img.icons8.com/color/96/000000/roomba.png"
              alt="robot"
              className="relative z-10 h-12 w-12"
            />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100">ClearBot v2.1</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${taskStatus === 'idle' ? 'bg-green-500' : 'animate-pulse bg-blue-500 dark:bg-blue-400'}`} />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {taskStatus === 'idle' ? '待命状态' : '正在执行任务...'}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-red-50 p-3 text-red-500 transition-all active:scale-90 dark:bg-red-900/20 dark:text-red-400"
        >
          <Power size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
          <Battery size={20} className="text-green-500" />
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">电量</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">88%</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
          <Thermometer size={20} className="text-orange-500" />
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">温度</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">32°C</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="px-2 font-bold text-slate-800 dark:text-slate-200">核心指令</h3>

        <button
          type="button"
          onClick={() => handleCommand('cleaning')}
          disabled={taskStatus !== 'idle'}
          className={`flex w-full items-center justify-between rounded-2xl p-5 shadow-md transition-all active:scale-95 ${
            taskStatus === 'cleaning'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-xl p-3 ${taskStatus === 'cleaning' ? 'bg-white/20' : 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'}`}>
              <Trash2 size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold">收纳清理</div>
              <div className={`text-xs ${taskStatus === 'cleaning' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                收拢桌面和地面的小型垃圾与散落物件
              </div>
            </div>
          </div>
          {taskStatus === 'cleaning' ? <Loader2 className="animate-spin" /> : <Play size={20} className="text-slate-300 dark:text-slate-600" />}
        </button>

        <button
          type="button"
          onClick={() => handleCommand('organizing')}
          disabled={taskStatus !== 'idle'}
          className={`flex w-full items-center justify-between rounded-2xl p-5 shadow-md transition-all active:scale-95 ${
            taskStatus === 'organizing'
              ? 'bg-indigo-600 text-white'
              : 'border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-xl p-3 ${taskStatus === 'organizing' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'}`}>
              <LayoutGrid size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold">物品归位</div>
              <div className={`text-xs ${taskStatus === 'organizing' ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                检测异常摆放并重新整理常用桌面物品
              </div>
            </div>
          </div>
          {taskStatus === 'organizing' ? <Loader2 className="animate-spin" /> : <Play size={20} className="text-slate-300 dark:text-slate-600" />}
        </button>
      </div>

      <div className="rounded-2xl bg-slate-100 p-4 transition-colors dark:bg-slate-900">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">当前任务队列</h4>
        {taskStatus === 'idle' ? (
          <p className="text-sm italic text-slate-400 dark:text-slate-600">暂无正在执行的任务</p>
        ) : (
          <div className="flex items-center gap-3">
            <Loader2 size={16} className="animate-spin text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              正在执行：{taskStatus === 'cleaning' ? '收纳清理' : '物品归位'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RobotView;
