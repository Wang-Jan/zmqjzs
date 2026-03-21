import React from 'react';
import { Activity, Bell, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { DeviceStatus } from '../types';

const StatusCard: React.FC<{
  title: string;
  status: DeviceStatus;
  color: string;
  icon: React.ReactNode;
}> = ({ title, status, color, icon }) => (
  <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition-all active:scale-95 dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-2 flex items-start justify-between">
      <div className={`rounded-2xl p-2.5 ${color} bg-opacity-10`}>{icon}</div>
      <span className={`rounded-full border border-current border-opacity-20 px-2 py-1 text-[10px] font-bold ${color} bg-opacity-10`}>
        {status}
      </span>
    </div>
    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</h3>
  </div>
);

const activities = [
  { time: '10:30', event: '检测到桌面有咖啡渍', action: '已生成局部清洁任务', type: 'warn' },
  { time: '09:15', event: '桌面整洁度评分更新为 A', action: '当前环境保持良好', type: 'info' },
  { time: '昨天', event: '机器人完成例行桌面整理', action: '总耗时 5 分钟', type: 'success' },
] as const;

const HomeView: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between rounded-3xl bg-blue-600 p-5 text-white shadow-lg shadow-blue-200 dark:bg-blue-700 dark:shadow-none">
        <div>
          <h2 className="text-lg font-bold">系统运行良好</h2>
          <p className="mt-1 text-xs text-blue-100">所有设备已连接，桌面环境处于稳定状态。</p>
        </div>
        <div className="relative">
          <Bell size={24} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-blue-600 bg-red-400 dark:border-blue-700" />
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
          title="清洁机器人"
          status={DeviceStatus.IDLE}
          color="text-blue-600 dark:text-blue-400"
          icon={<Zap className="text-blue-600 dark:text-blue-400" size={20} />}
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-800 dark:text-slate-100">
            <Activity size={18} className="text-blue-500 dark:text-blue-400" />
            最近动态
          </h2>
          <button type="button" className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500">
            查看全部 <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {activities.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border-b border-slate-50 p-4 transition-colors last:border-0 active:bg-slate-50 dark:border-slate-800 dark:active:bg-slate-800"
            >
              <div className="w-10 pt-1 text-[10px] font-bold uppercase text-slate-300 dark:text-slate-600">{item.time}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.event}</div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.action}</div>
              </div>
              <div className={`mt-2 h-1.5 w-1.5 rounded-full ${item.type === 'warn' ? 'bg-orange-400' : 'bg-green-400'}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
          <Activity className="text-slate-300 dark:text-slate-600" size={24} />
        </div>
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500">等待新任务</h3>
        <p className="mt-1 text-xs text-slate-300 dark:text-slate-600">AI 正在持续监控你的桌面环境与设备状态。</p>
      </section>
    </div>
  );
};

export default HomeView;
