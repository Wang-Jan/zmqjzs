
import React from 'react';
import { DeviceStatus } from '../types';
import { ShieldCheck, Zap, Activity, ChevronRight, Bell } from 'lucide-react';

const StatusCard: React.FC<{ title: string; status: DeviceStatus; color: string; icon: React.ReactNode }> = ({ title, status, color, icon }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all active:scale-95">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2.5 rounded-2xl ${color} bg-opacity-10`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${color} bg-opacity-10 border border-current border-opacity-20`}>
        {status}
      </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
  </div>
);

const HomeView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* 顶部状态通知 */}
      <div className="bg-blue-600 dark:bg-blue-700 rounded-3xl p-5 text-white shadow-lg shadow-blue-200 dark:shadow-none flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">系统运行良好</h2>
          <p className="text-blue-100 text-xs mt-1">所有设备已连接，环境整洁</p>
        </div>
        <div className="relative">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border-2 border-blue-600 dark:border-blue-700" />
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <StatusCard 
          title="监控摄像头" 
          status={DeviceStatus.ONLINE} 
          color="text-green-600 dark:text-green-400"
          icon={<ShieldCheck className="text-green-600 dark:text-green-400" size={20} />}
        />
        <StatusCard 
          title="清理机器人" 
          status={DeviceStatus.IDLE} 
          color="text-blue-600 dark:text-blue-400"
          icon={<Zap className="text-blue-600 dark:text-blue-400" size={20} />}
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-slate-800 dark:text-slate-100 text-base flex items-center gap-2">
            <Activity size={18} className="text-blue-500 dark:text-blue-400" />
            最近动态
          </h2>
          <button className="text-xs text-slate-400 dark:text-slate-500 font-bold flex items-center">
            查看全部 <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          {[
            { time: '10:30', event: '检测到桌面咖啡渍', action: '已生成清理任务', type: 'warn' },
            { time: '09:15', event: '桌面整洁度评分：A', action: '环境良好', type: 'info' },
            { time: '昨天', event: '机器人完成常规清理', action: '耗时5分钟', type: 'success' }
          ].map((item, i) => (
            <div key={i} className="p-4 border-b border-slate-50 dark:border-slate-800 last:border-0 flex gap-4 active:bg-slate-50 dark:active:bg-slate-800 transition-colors">
              <div className="text-[10px] font-bold text-slate-300 dark:text-slate-600 w-10 pt-1 uppercase">{item.time}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.event}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.action}</div>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full mt-2 ${item.type === 'warn' ? 'bg-orange-400' : 'bg-green-400'}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
          <Activity className="text-slate-300 dark:text-slate-600" size={24} />
        </div>
        <h3 className="text-slate-400 dark:text-slate-500 text-sm font-bold">等待新任务</h3>
        <p className="text-slate-300 dark:text-slate-600 text-xs mt-1">AI 正在持续监控您的桌面环境</p>
      </section>
    </div>
  );
};

export default HomeView;
