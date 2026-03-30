# AI 读取与分析该项目的 Prompt

你正在分析 `sd-label-pro` 项目，它是一个轻量级 SD 卡标签生成器，主要目标是根据输入品牌、型号、存储、风格在浏览器 Canvas 生成黑白工业风标签。

## 项目关键点
- `index.html`: UI 面板 + 画布
- `styles.css`: 控件与 Canvas 布局
- `main.js`: 事件绑定、数据收集、绘制循环、导出 JPG
- `ui.js`: 下拉选项初始化
- `generator.js`: 核心渲染调度、logo 加载
- `themes/*.js`: 每个可选主题的渲染逻辑
- `logos/*.svg`: 品牌标识

## 期望你的流程
1. 读取 `README.md` 以理解功能与运行方式
2. 检查 `main.js` 与 `themes/`，确认可扩展方式
3. 如果需要新增主题，遵循 `ARCHITECTURE.md`"

## 可扩展建议（对下一个 AI）
- 兼容 SVG 导出、PDF
- 新增可配置参数：轮廓色、字体、间距、圆角
- 添加 API：`generateLabel(data)` 返回 `dataURL`，便于后台自动化生成

## 诊断步骤
1. 检查 `ui.js` 生成下拉内容是否非空
2. 检查 `theme` 选中后 `themes[...]` 是否存在
3. 检查 `canvas` 大小和 `ctx` 是否创建成功
4. 检查 `draw(...)` 是否能在往返之间渲染 `brand` logo

## 直接输出给用户（最终目的）
在 `README` 中准确说明如何本地运行与选择 2cm×2.5cm 标签模板。请生成一个适当命令模块用于 ChatGPT/自动化执行。
