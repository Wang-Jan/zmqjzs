import React, { useRef, useState } from 'react';
import { AlertCircle, ArrowRight, Brain, CheckCircle2, Lightbulb, Settings2, Sparkles, Upload, X } from 'lucide-react';

const suggestions = [
  { label: '线缆隐藏', desc: '将插排后方的 3 根充电线整理到束线器中，减少桌面凌乱感。', impact: '整洁度 +5' },
  { label: '物品归位', desc: '将水杯移动到固定杯垫区域，避免液体倾倒影响键盘。', impact: '安全性 +10' },
  { label: '空间利用', desc: '左侧空余区域可以放置常用文具盒，提升取用效率。', impact: '效率 +8' },
] as const;

const AIView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startAnalysis = () => {
    setLoading(true);
    setShowResult(false);

    window.setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setShowResult(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 p-4 pb-24">
      <section className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">桌面智能分析</h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">Garden VLM 诊断系统</p>
        </div>
        <button
          type="button"
          onClick={() => setShowConfig((value) => !value)}
          className={`rounded-xl p-2 transition-all ${
            showConfig
              ? 'bg-blue-600 text-white shadow-lg'
              : 'border border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <Settings2 size={20} />
        </button>
      </section>

      {showConfig && (
        <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">后端开发者选项</p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Garden API 地址"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
              defaultValue="http://192.168.1.100:23328/v1"
            />
          </div>
        </div>
      )}

      {!selectedImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group flex aspect-square w-full flex-col items-center justify-center rounded-[2.5rem] border-4 border-dashed border-slate-200 bg-white transition-all active:scale-95 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 transition-transform group-hover:scale-110 dark:bg-blue-900/20">
            <Upload className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">拍摄或上传桌面照片</span>
          <p className="mt-2 px-10 text-center text-xs text-slate-400">
            AI 会识别杂物、液体风险和摆放位置，
            <br />
            并生成清洁与整理建议。
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white bg-slate-200 shadow-2xl dark:border-slate-800">
            <img src={selectedImage} alt="桌面预览" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            >
              <X size={20} />
            </button>

            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-600/20 backdrop-blur-[2px]">
                <div className="relative">
                  <div className="h-20 w-20 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                  <Brain className="absolute inset-0 m-auto animate-pulse text-white" size={32} />
                </div>
                <p className="mt-4 text-sm font-bold tracking-widest text-white">GARDEN 正在扫描...</p>
              </div>
            )}
          </div>

          {!loading && !showResult && (
            <button
              type="button"
              onClick={startAnalysis}
              className="flex w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 py-5 text-lg font-black text-white shadow-xl shadow-blue-200 transition-all active:scale-95 hover:bg-blue-500 dark:shadow-none"
            >
              <Sparkles size={24} />
              立即开始 AI 诊断
            </button>
          )}
        </div>
      )}

      {showResult && (
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-green-500/5" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">整洁度评分</h3>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black italic text-slate-800 dark:text-slate-100">82</span>
                  <span className="mb-2 font-bold text-slate-400">/ 100</span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  状态：良好
                </div>
                <p className="text-[10px] leading-tight text-slate-400">优于近期 78% 的历史记录</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-900 dark:text-blue-100">核心优势</span>
              </div>
              <p className="text-[10px] font-medium leading-relaxed text-blue-700 dark:text-blue-300">
                物品摆放总体有序，未检测到大面积液体污染和高风险障碍物。
              </p>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-orange-600" />
                <span className="text-xs font-bold text-orange-900 dark:text-orange-100">优化建议</span>
              </div>
              <p className="text-[10px] font-medium leading-relaxed text-orange-700 dark:text-orange-300">
                右侧区域存在少量线缆缠绕，建议补充束线或固定走线。
              </p>
            </div>
          </section>

          <section>
            <h3 className="mb-4 flex items-center gap-2 px-1 text-sm font-black text-slate-800 dark:text-slate-100">
              <Lightbulb size={18} className="text-yellow-500" />
              Garden 深度优化方案
            </h3>
            <div className="space-y-3">
              {suggestions.map((item, index) => (
                <div
                  key={item.label}
                  className="group flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-4 transition-all active:scale-95 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 font-black text-slate-300 dark:bg-slate-800">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.label}</h4>
                      <p className="mt-0.5 text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-blue-600">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-3xl bg-slate-800 py-4 font-bold text-white dark:bg-slate-100 dark:text-slate-900"
          >
            保存诊断报告到本地
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      <div className="px-8 text-center">
        <p className="text-[10px] italic font-medium leading-relaxed text-slate-400">
          注：当前为 Garden VLM 演示模式。
          <br />
          正式版本可通过 vLLM 兼容接口接入你的自定义视觉模型。
        </p>
      </div>

      <input ref={fileInputRef} type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
    </div>
  );
};

export default AIView;
