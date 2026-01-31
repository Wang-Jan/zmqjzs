
import React, { useState, useRef, useEffect } from 'react';
import { Brain, Lightbulb, CheckCircle2, AlertCircle, Upload, Send, Settings2, Loader2, X, Info, Terminal, Globe } from 'lucide-react';

const AIView: React.FC = () => {
  const [gardenLoading, setGardenLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("检测图像中所有可见的垃圾对象。");
  const [gardenResult, setGardenResult] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('garden_api_url') || "http://192.168.1.100:23328/v1");
  const [modelPath, setModelPath] = useState(() => localStorage.getItem('garden_model_path') || "garden-v1");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('garden_api_url', apiUrl);
    localStorage.setItem('garden_model_path', modelPath);
  }, [apiUrl, modelPath]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGardenResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const callGardenAI = async () => {
    if (!selectedImage) return;
    setGardenLoading(true);
    setGardenResult(null);

    try {
      const response = await fetch(`${apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer EMPTY"
        },
        body: JSON.stringify({
          model: modelPath,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: selectedImage } }
              ]
            }
          ],
          max_tokens: 1024
        })
      });

      if (!response.ok) throw new Error(`连接失败 (HTTP ${response.status})`);
      
      const data = await response.json();
      setGardenResult(data.choices[0].message.content);
    } catch (error: any) {
      setGardenResult(`❌ 无法访问 Garden 模型\n\n原因：${error.message}\n\n检查清单：\n1. 电脑是否启动了 vllm serve？\n2. 是否添加了 --allowed-origins "*"\n3. 手机和电脑是否在同一个 Wi-Fi？\n4. IP 地址是否填对？当前：${apiUrl}`);
    } finally {
      setGardenLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24 transition-colors">
      {/* 顶部控制面板 */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-5 shadow-xl border border-indigo-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 rounded-xl">
              <Brain className="text-indigo-400" size={20} />
            </div>
            <h2 className="text-white font-bold tracking-tight">Garden VLM 控制台</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowHelp(!showHelp)} className="p-2 text-indigo-300 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Info size={20} />
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-full transition-all ${showSettings ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50' : 'text-indigo-300 bg-white/5'}`}>
              <Settings2 size={20} />
            </button>
          </div>
        </div>

        {/* 快速帮助向导 */}
        {showHelp && (
          <div className="mb-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex gap-3">
              <Terminal size={18} className="text-blue-400 shrink-0 mt-1" />
              <div>
                <p className="text-white text-xs font-bold mb-1">第一步：启动服务端</p>
                <code className="block bg-black/40 p-2 rounded text-[10px] text-blue-200 break-all font-mono leading-relaxed">
                  vllm serve [PATH] --host 0.0.0.0 --port 23328 --allowed-origins "*"
                </code>
              </div>
            </div>
            <div className="flex gap-3">
              <Globe size={18} className="text-blue-400 shrink-0 mt-1" />
              <div>
                <p className="text-white text-xs font-bold mb-1">第二步：获取电脑 IP</p>
                <p className="text-blue-200/70 text-[10px]">在电脑命令行输入 <span className="text-blue-300 font-bold">ipconfig</span> (Win) 或 <span className="text-blue-300 font-bold">hostname -I</span> (Linux)，查找 192.168 开头的地址。</p>
              </div>
            </div>
          </div>
        )}

        {/* API 配置 */}
        {showSettings && (
          <div className="mb-4 p-4 bg-black/30 rounded-2xl border border-white/10 space-y-3 animate-in zoom-in-95">
            <div>
              <label className="text-indigo-300 text-[10px] font-bold uppercase block mb-1">后端 API 地址</label>
              <input 
                type="text" 
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://192.168.x.x:23328/v1"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="text-indigo-300 text-[10px] font-bold uppercase block mb-1">模型标识符 (Path)</label>
              <input 
                type="text" 
                value={modelPath}
                onChange={(e) => setModelPath(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* 交互区 */}
        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-400/30 rounded-2xl p-8 flex flex-col items-center justify-center bg-indigo-500/5 active:bg-indigo-500/10 transition-all cursor-pointer group"
          >
            <Upload className="text-indigo-400 mb-2 group-active:scale-110 transition-transform" size={32} />
            <p className="text-indigo-200 text-sm font-medium">点击上传照片分析</p>
            <p className="text-indigo-400/50 text-[10px] mt-1 text-center italic">手机上传将自动转为 Base64 发送至 Garden</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40 shadow-inner">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80">
                <X size={16} />
              </button>
            </div>

            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <label className="text-indigo-300 text-[10px] font-bold uppercase block mb-1">分析指令</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent text-white text-xs border-none focus:ring-0 p-0 resize-none h-12"
              />
            </div>

            <button 
              onClick={callGardenAI}
              disabled={gardenLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:active:scale-100"
            >
              {gardenLoading ? <><Loader2 size={18} className="animate-spin" /><span>推理中...</span></> : <><Send size={18} /><span>执行 Garden 分析</span></>}
            </button>
          </div>
        )}

        {gardenResult && (
          <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-indigo-300 text-[10px] font-bold uppercase mb-2">模型响应:</h4>
            <div className="text-sm text-slate-100 font-mono leading-relaxed whitespace-pre-wrap">
              {gardenResult}
            </div>
          </div>
        )}
      </section>

      {/* 注意事项 - 完善深色模式适配 */}
      <div className="px-2 space-y-4">
        <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
          <AlertCircle size={16} className="text-indigo-500" />
          注意事项
        </h3>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-3 transition-colors">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
            请确保手机和电脑连接的是<b>同一个 Wi-Fi</b>。如果是校园网或公司内网，可能存在相互隔离的情况导致无法连通。
          </p>
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
    </div>
  );
};

export default AIView;
