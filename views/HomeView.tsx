
import React from 'react';
import { DeviceStatus } from '../types';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

const StatusCard: React.FC<{ title: string; status: DeviceStatus; color: string; icon: React.ReactNode }> = ({ title, status, color, icon }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        {icon}
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color} bg-opacity-10`}>
        {status}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
  </div>
);

const HomeView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <section className="grid grid-cols-2 gap-4">
        <StatusCard 
          title="监控摄像头" 
          status={DeviceStatus.ONLINE} 
          color="text-green-600"
          icon={<ShieldCheck className="text-green-600" size={20} />}
        />
        <StatusCard 
          title="扫地机器人" 
          status={DeviceStatus.IDLE} 
          color="text-blue-600"
          icon={<Zap className="text-blue-600" size={20} />}
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Activity size={18} className="text-blue-500" />
            最近动态
          </h2>
          <button className="text-sm text-blue-600 font-medium">查看全部</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {[
            { time: '10:30', event: '检测到桌面咖啡渍', action: '已生成清理任务' },
            { time: '09:15', event: '桌面整洁度评分：A', action: '环境良好' },
            { time: '昨天', event: '机器人完成常规清理', action: '耗时5分钟' }
          ].map((item, i) => (
            <div key={i} className="p-4 border-b border-slate-50 last:border-0 flex gap-4">
              <div className="text-xs text-slate-400 w-12 pt-0.5">{item.time}</div>
              <div>
                <div className="text-sm font-semibold text-slate-800">{item.event}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.action}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
        <h3 className="text-lg font-bold mb-1">AI 效率周报</h3>
        <p className="text-blue-100 text-sm mb-4">本周桌面保持整洁时间提升了 24%</p>
        <div className="bg-white/20 h-2 rounded-full mb-4 overflow-hidden">
          <div className="bg-white h-full w-[85%]" />
        </div>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-bold w-full transition-transform active:scale-95">
          查看详情报告
        </button>
      </section>
    </div>
  );
};

export default HomeView;
