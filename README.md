
# 桌面清理助手 (Desktop Cleaning Assistant) - zmqjzs

基于 Android 风格设计的智能桌面监控与机器人协作管理系统。

## 🌟 核心特性
- **双端自适应**: 专为手机端交互设计，完美适配深色/浅色模式。
- **Garden VLM 控制台**: 集成了对远程 Garden 大模型（基于 vLLM）的调用能力，支持实时图像识别与分析。
- **自动化部署**: 已针对 Vercel 平台优化，支持 CI/CD 自动同步。

## 🛠️ 后端连接指南 (vLLM)
如果你需要使用“分析”页面的 AI 推理功能，请在你的模型服务器上执行：

```bash
vllm serve /path/to/your/garden-model \
    --host 0.0.0.0 \
    --port 23328 \
    --allowed-origins "*"
```

## 🚀 部署状态
本仓库通过 **GitHub Desktop** 管理，并自动同步至 **Vercel** 生产环境。

- **开发环境**: `npm run dev`
- **构建指令**: `npm run build`
