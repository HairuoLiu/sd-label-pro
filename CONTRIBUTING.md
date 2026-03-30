# 贡献指南

欢迎为 `SD Label Pro` 做贡献！

## 本地运行
1.  `git clone https://github.com/HairuoLiu/sd-label-pro.git`
2.  `cd sd-label-pro`
3.  `python -m http.server 8000`
4.  浏览器访问 `http://localhost:8000`

## 代码风格
- 使用原生 JavaScript（无需打包工具）
- 模块化主题在 `themes/`，每个主题输出 `draw(ctx, data, w, h)`
- 用 `const/let`，保持语义清晰

## 新增主题
1. 新建 `themes/<name>Pro.js`
2. 继承当前带安全区、边框、文本样式
3. 在 `main.js` 导入并加入 `themes` map
4. `ui.js` 添加下拉选项

## 提交规范
- 功能：`feat: ...`
- 修复：`fix: ...`
- 文档：`doc: ...`

## 拉取请求
1. Fork 仓库
2. 新建分支
3. 提交后发 PR（target `main`）
