# SD Label Pro 架构文档

## 核心组件

### Input UI
- `ui.js`:
  - `brandNames` 数组
  - `initUI()` 填充 `brand`, `storage`, `theme` 下拉

### 主题渲染
- 每个主题都在 `themes/*.js` 中实现 `draw(ctx, data, w, h)`：
  - 背景、边框、文本、图形。
  - 建议新增主题可在此目录加模块，然后在 `main.js` 中导入。

### 生成器
- `generator.js`:
  - `generate(ctx, data, theme)` 负责清空画布并调用主题绘制
  - 加载 logo svg 图像并通过 `logos` 对象传递。

### 主脚本
- `main.js`:
  - 初始化 DOM、设置 canvas
  - 事件监听 `input/change` 触发 `update()`
  - `download` 按钮导出 JPG

### 样式
- `styles.css`:
  - 左侧控制面板 + 右侧 preview
  - `canvas` 背景白，圆角

## 可扩展的设计点

1. 主题插件化
   - 在 `themes` 加新文件，export `draw`，并在 `main.js` themes 注册。
   - 可抽象 `themeFactory` 提供统一裁切、安全区、版式。

2. 数据模型
   - 增加 `data` 结构：`{brand, model, storage, theme, variant, color}`。
   - 兼容 JSON 导出/导入，便于批量创建标签。

3. Logo SVG 统一规范
   - 修改 `generator.js` 用 `fetch()` 读取 SVG 字符串，解析为 `ImageBitmap`，返回可缩放图。
   - 允许 `brand` 传 `url`:
     -  `logos[brand].ratio` + `logos[brand].margin`。

4. 可访问性 & 国际化
   - `index.html` 可加 `lang` 自动绑定文本。
   - `ui.js` 提供 `localized` config。

5. 输出格式扩展
   - 支持 PNG、SVG 导出（目前只有 JPG）
   - 支持 PDF/批量打印

## 验证点
- 主题切换、参数变化实时绘制无误
- 默认值 `LEICA/M9/128GB` 可用
- 画布尺寸 `300x375` (2:2.5)
- 透明/白底可置换
