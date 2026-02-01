
import React, { useState, useRef } from 'react';
import { 
  Brain, 
  Upload, 
  Loader2, 
  X, 
  Settings2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  BarChart3,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const AIView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 模拟分析过程
  const startAnalysis = () => {
    setLoading(true);
    setShowResult(false);
    
    // 模拟 Garden 模型处理延迟
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setShowResult(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* 头部标题区 */}
      <section className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">桌面智能分析</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Garden VLM 诊断系统</p>
        </div>
        <button 
          onClick={() => setShowConfig(!showConfig)}
          className={`p-2 rounded-xl transition-all ${showConfig ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'}`}
        >
          <Settings2 size={20} />
        </button>
      </section>

      {/* 隐藏的 API 配置区 */}
      {showConfig && (
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">后端开发者选项</p>
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Garden API 地址" 
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs outline-none"
              defaultValue="http://192.168.1.100:23328/v1"
            />
          </div>
        </div>
      )}

      {/* 图片选择/预览区 */}
      {!selectedImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square w-full border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center bg-white dark:bg-slate-900/50 active:scale-95 transition-all group"
        >
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <span className="text-slate-800 dark:text-slate-200 font-bold">拍摄/上传桌面照片</span>
          <p className="text-slate-400 text-xs mt-2 text-center px-10">AI 将识别杂物、水渍及摆放位置<br/>并生成专属优化方案</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl aspect-square bg-slate-200">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            
            {loading && (
              <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px] flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <Brain className="absolute inset-0 m-auto text-white animate-pulse" size={32} />
                </div>
                <p className="text-white font-bold mt-4 text-sm tracking-widest">GARDEN 正在扫描...</p>
              </div>
            )}
          </div>

          {!loading && !showResult && (
            <button 
              onClick={startAnalysis}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
            >
              <Sparkles size={24} />
              立即开始 AI 诊断
            </button>
          )}
        </div>
      )}

      {/* 分析结果展示区 (Mock) */}
      {showResult && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6">
          {/* 评分卡片 */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16" />
             <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">整洁度评分</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-6xl font-black text-slate-800 dark:text-slate-100 italic">82</span>
                    <span className="text-slate-400 font-bold mb-2">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-black mb-2">
                    状态：优良
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">领先全国 78% 的桌面</p>
                </div>
             </div>
          </section>

          {/* 诊断详情 */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-3xl border border-blue-100 dark:border-blue-800">
               <div className="flex items-center gap-2 mb-2">
                 <CheckCircle2 size={16} className="text-blue-600" />
                 <span className="text-xs font-bold text-blue-900 dark:text-blue-100">核心优势</span>
               </div>
               <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-relaxed font-medium">物品摆放有序，未检测到大面积液体污渍。</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-3xl border border-orange-100 dark:border-orange-800">
               <div className="flex items-center gap-2 mb-2">
                 <AlertCircle size={16} className="text-orange-600" />
                 <span className="text-xs font-bold text-orange-900 dark:text-orange-100">优化建议</span>
               </div>
               <p className="text-[10px] text-orange-700 dark:text-orange-300 leading-relaxed font-medium">右侧存在 2 处线缆缠绕，建议使用理线器。</p>
            </div>
          </section>

          {/* 详细优化方案列表 */}
          <section>
            <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2 mb-4 px-1">
              <Lightbulb size={18} className="text-yellow-500" />
              Garden 深度优化方案
            </h3>
            <div className="space-y-3">
              {[
                { label: '线缆隐藏', desc: '将排插后方的 3 根充电线进行扎带捆绑。', impact: '整洁度 +5' },
                { label: '物品归位', desc: '将水杯移至桌面杯垫位置，避免倾倒风险。', impact: '安全性 +10' },
                { label: '空间利用', desc: '键盘左侧空余区域可放置一个小型绿植。', impact: '心情 +8' }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group active:scale-95 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-slate-300">
                      0{i+1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.label}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-blue-600">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 底部动作条 */}
          <button className="w-full bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-3xl font-bold flex items-center justify-center gap-2">
            保存诊断报告至本地
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* 底部说明 */}
      <div className="text-center px-8">
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
          注：当前为 Garden VLM 框架演示模式。
          正式版将通过 vLLM 接口接入自研多模态大模型。
        </p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default AIView;
