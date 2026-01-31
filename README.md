
# 桌面清理助手 (Desktop Cleaning Assistant)

基于 Android 风格设计的智能桌面监控与机器人协作管理系统。

## 🌟 最新特性
- **深色模式 (Dark Mode)**: 支持根据系统偏好自动切换或手动切换亮/深色主题。
- **Garden VLM 控制台**: 集成了对远程 Garden 大模型（基于 vLLM）的调用能力，支持实时图像识别与分析。
- **响应式 UI**: 针对手机端优化的全屏交互体验。

## 🛠️ 后端连接指南 (vLLM)
如果你需要使用“分析”页面的 AI 推理功能，请在你的模型服务器上执行：

```bash
vllm serve /path/to/your/garden-model \
    --host 0.0.0.0 \
    --port 23328 \
    --allowed-origins "*"
```

然后在 App 的“分析”页面设置中填写服务器的局域网 IP 地址。

## 🚀 快速开始
1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 构建项目: `npm run build`
