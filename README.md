# SD Label Pro

## 概述
`SD Label Pro` 是一个基于 Canvas 的轻量型 SD 卡标签设计器，支持黑白工业风格主题（Leica、Minimal、Tech、Grid、Bar、Industrial），可实时预览和下载 JPEG。此项目适用于设计印刷 2cm×2.5cm 标签。

## 目录结构
- `index.html` - UI 布局与入口
- `styles.css` - 样式
- `main.js` - 业务逻辑，绑定事件与主题映射
- `ui.js` - 初始化下拉菜单、品牌与存储选项
- `generator.js` - 渲染调用
- `themes/` - 多主题 `draw(ctx, data, w, h)` 模块
- `logos/` - 品牌 SVG 图 标文件

## 启动方法
1. 在项目目录运行：`python -m http.server 8000`
2. 浏览器访问：`http://localhost:8000`
3. 选择品牌/型号/存储/风格，点击 `Download JPG`

## 主要实现
- 使用 Canvas 2D API 绘制标签
- 每个主题使用独立模块，便于扩展
- SVG logo 自动加载，并在 `Leica Industrial` 主题中按品牌比例显示
- 增加裁切安全区虚线框

## 兼容性
- 原生 JS，可在现代浏览器中本地运行
- 使用 `file://` 时可能因为模块化加载失败（已改为普通脚本版）

## 参考主题
- `themes/leicaPro.js`
- `themes/minimalPro.js`
- `themes/techPro.js`
- `themes/gridPro.js`
- `themes/barPro.js`
- `themes/industrialPro.js`
- `themes/leicaIndustrial.js`
- `themes/leicaIndustrialBar.js`

## 扩展建议
见 `ARCHITECTURE.md`
