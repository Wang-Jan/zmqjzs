# 视净 (Shi Jing)

一个基于 React、Vite 和 TypeScript 的桌面清洁助手演示项目，提供首页监控、实时画面、AI 分析和机器人控制四个核心视图。

## 项目结构

- `App.tsx`: 应用框架、顶部栏和底部导航。
- `views/HomeView.tsx`: 首页状态概览与最近动态。
- `views/LiveView.tsx`: 实时视频流占位与边缘检测说明。
- `views/AIView.tsx`: 图片上传、模拟分析结果和优化建议。
- `views/RobotView.tsx`: 机器人控制面板与任务状态。

## 开发命令

```bash
npm install
npm run dev
```

```bash
npm run build
```

## AI 接口说明

当前 `AIView` 仍是演示模式，页面中默认预留了一个 `Garden API` 地址输入框。后续如果要接入真实模型服务，可以替换为你的 vLLM 或兼容 OpenAI 接口的视觉模型服务地址。

示例：

```bash
vllm serve /path/to/your/model \
  --host 0.0.0.0 \
  --port 23328 \
  --allowed-origins "*"
```

## 部署说明

- 本项目使用 Vite 构建，静态部署可直接发布 `dist` 目录。
- 仓库中保留了 `vercel.json`，可用于 Vercel 单页应用重写。
