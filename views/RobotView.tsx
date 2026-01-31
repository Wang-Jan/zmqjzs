
import React, { useState } from 'react';
import { Trash2, LayoutGrid, Play, Power, Loader2, Battery, Thermometer } from 'lucide-react';

const RobotView: React.FC = () => {
  const [taskStatus, setTaskStatus] = useState<'idle' | 'cleaning' | 'organizing'>('idle');

  const handleCommand = (type: 'cleaning' | 'organizing') => {
    setTaskStatus(type);
    setTimeout(() => {
      setTaskStatus('idle');
      alert(`任务: ${type === 'cleaning' ? '清理垃圾' : '整理桌面'} 已完成！`);
    }, 5000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* 状态看板 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center relative">
            <div className={`absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-2xl ${taskStatus !== 'idle' ? 'animate-ping' : ''}`} />
            <img 
              src="https://img.icons8.com/color/96/000000/roomba.png" 
              alt="robot" 
              className="w-12 h-12 relative z-10"
            />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100">ClearBot v2.1</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${taskStatus === 'idle' ? 'bg-green-500' : 'bg-blue-500 dark:bg-blue-400 animate-pulse'}`} />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {taskStatus === 'idle' ? '待命状态' : '正在执行任务...'}
              </span>
            </div>
          </div>
        </div>
        <button className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-2xl active:scale-90 transition-all">
          <Power size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Battery size={20} className="text-green-500" />
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">电量</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">88%</div>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Thermometer size={20} className="text-orange-500" />
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">温度</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">32°C</div>
          </div>
        </div>
      </div>

      {/* 核心功能指令区 */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 px-2">核心指令</h3>
        
        <button 
          onClick={() => handleCommand('cleaning')}
          disabled={taskStatus !== 'idle'}
          className={`w-full p-5 rounded-2xl flex items-center justify-between transition-all active:scale-95 shadow-md ${
            taskStatus === 'cleaning' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${taskStatus === 'cleaning' ? 'bg-white/20' : 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'}`}>
              <Trash2 size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold">收纳清理</div>
              <div className={`text-xs ${taskStatus === 'cleaning' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                收拾桌面及地面的垃圾
              </div>
            </div>
          </div>
          {taskStatus === 'cleaning' ? <Loader2 className="animate-spin" /> : <Play size={20} className="text-slate-300 dark:text-slate-600" />}
        </button>

        <button 
          onClick={() => handleCommand('organizing')}
          disabled={taskStatus !== 'idle'}
          className={`w-full p-5 rounded-2xl flex items-center justify-between transition-all active:scale-95 shadow-md ${
            taskStatus === 'organizing' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${taskStatus === 'organizing' ? 'bg-white/20' : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400'}`}>
              <LayoutGrid size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold">物品归位</div>
              <div className={`text-xs ${taskStatus === 'organizing' ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                检测异常并整理桌面物品
              </div>
            </div>
          </div>
          {taskStatus === 'organizing' ? <Loader2 className="animate-spin" /> : <Play size={20} className="text-slate-300 dark:text-slate-600" />}
        </button>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4 transition-colors">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-600 mb-2 uppercase tracking-wider">当前任务队列</h4>
        {taskStatus === 'idle' ? (
          <p className="text-sm text-slate-400 dark:text-slate-600 italic">暂无进行中的任务</p>
        ) : (
          <div className="flex items-center gap-3">
             <Loader2 size={16} className="text-blue-500 dark:text-blue-400 animate-spin" />
             <span className="text-sm font-medium text-slate-700 dark:text-slate-300">正在执行：{taskStatus === 'cleaning' ? '收拾垃圾' : '桌面整理'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RobotView;
