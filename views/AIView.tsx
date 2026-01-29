
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Brain, Lightbulb, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

const AIView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // 模拟从后端获取分析建议，后续可替换为真实的 Gemini API 调用
  const fetchMockInsights = async () => {
    setLoading(true);
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuggestions([
      {
        id: '1',
        title: '整理建议',
        content: '检测到桌面右侧有三个空水杯，建议将其移至厨房清洗。',
        type: 'cleanup',
        impact: '提升整洁度 15%'
      },
      {
        id: '2',
        title: '拿取提醒',
        content: '你即将在下午3点进行线上会议，耳机已在监控视野左下方，请注意取用。',
        type: 'reminder',
        impact: '准备效率提升'
      },
      {
        id: '3',
        title: '空间优化',
        content: '桌面中间的书籍堆放略显凌乱，建议竖向排列以节省 20% 的可用面积。',
        type: 'optimize',
        impact: '空间利用率提升'
      }
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMockInsights();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-blue-400" size={24} />
            <h2 className="text-lg font-bold">智能大脑分析中</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">分析过去 2 小时的桌面活动情况...</p>
          <button 
            onClick={fetchMockInsights}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
          >
            {loading ? '分析中...' : '重新分析'}
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-20">
          <Brain size={160} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-500" />
          针对性建议
        </h3>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 animate-pulse h-28" />
            ))}
          </div>
        ) : (
          suggestions.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${item.type === 'cleanup' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                </div>
                <p className="text-sm text-slate-600 leading-snug">{item.content}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
                    {item.impact}
                  </span>
                  <button className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    执行建议 <CheckCircle2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
        <AlertCircle className="text-amber-500 shrink-0" size={20} />
        <div className="text-xs text-amber-800 leading-relaxed">
          <b>专家小贴士：</b> 根据你的使用习惯，保持桌面右侧 20cm 为空，可以显著降低工作焦虑感。
        </div>
      </div>
    </div>
  );
};

export default AIView;
