# 更新日志

## Dev

- `//TODO`
  - 全局动态配置
  - 编辑器功能（主题切换、语言选择等）
- `//DONE`

---

## 0.4.1

`2021-10-21`

- 💥✨ feat: 新增代码校验功能，提供异常处理,提供界面展示提醒、事件 API `errorHandler`。
- 💥✨ feat: 新增组件工具栏自定义事件 API `renderToolbar`。
- 💥✨ perf: 优化组件示例 `styles` 添加、更新和移除事件，参考 [vue-style-loader/addStylesClient](https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js) 。
- ✨ feat: 新增代码展示透明背景切换功能。
- ✨ feat: 新增自定义组件`button` 、`tooltip`，参考`element 2`。
- ✨ feat: 新增 `iconfont` 字体集。
- 🦄 refactor: 组件代码重构 🎨⚡️，去除无效代码 ⚰️，保留基础功能。
- 🐳 chore: 添加打包配置 JS 压缩功能。
- 🔧 build: 发布可用 npm 包 [npm/vue-code-view@0.3.7](https://www.npmjs.com/package/vue-code-view)。
- 📃 docs: 新增组件示例说明文档。

## 0.4.0

`2021-10-14`

- 💥✨ feat: 新增 SFC `compiler` 编译功能, 参考 [vue/sfc-parser](https://github.com/vuejs/vue/blob/dev/test/unit/modules/sfc/sfc-parser.spec.js) .
- 💥✨ feat: 新增支持`scss` `sass` 样式编译功能。
- ✨ feat: 新增编辑器 `括号/标签` 匹配自动关闭功能。
- 🎈 perf: 演示示例优化
  - ✨ feat: 引入 `ant-design-vue` 组件代码。
  - ✨ feat: 增加路由跳转，添加菜单更新日志菜单（支持 `.md` 文件解析 ）。
  - 🐞 fix: 路由使用`hash`模式，避免子路由刷新出现页面未找到错误。
  - 🐞 fix: 示例字符串模板添加 `script` 内容，解决 [unterminated-template-literal-syntax-error-when-literal-contains-script-tag](https://stackoverflow.com/questions/36607932/unterminated-template-literal-syntax-error-when-literal-contains-script-tag)
- 🐳 chore: 配置多环境变量。

## 0.3.3

`2021-09-17`

- ✨ feat: 编辑器支持 `<style>` 解析,暂不支持 CSS 预编译。

## 0.3.2

`2021-09-17`

- 🔧 build: 注册/发布 npm 包 [npm/vue-code-view](https://www.npmjs.com/package/vue-code-view)。
- ✨ feat: 新增代码自动保存，支持历史回溯功能。

## 0.3.1

`2021-08-24`

- ✨ feat:集成 `Ant Design` 官方图标库 [ant-design/icons](https://www.iconfont.cn/collections/detail?cid=9402)。
- ✨ feat: 新增全屏模式(`screenfull`)。
- 🎈 perf: 使用节流函数（`throttle`）优化客户端存储功能。
- 🌈 style:代码展示编辑区域`flex`布局优化。

## 0.3.0

`2021-08-22`

- 🎈 perf: 优化 `CodeMirrorr`代码编辑器
  - ✨ feat: 新增功能 `vue` 语法高亮、代码折叠、滚动条、光标行背景高亮
  - ✨ feat: 新增客户端存储功能，缓存最新代码(`vue2-storage`)。

## 0.2.0

`2021-08-22`

- ✨ feat: 编辑器支持 `<script>` 代码解析。

## 0.1.0

`2021-08-21`

- 🔧 build: gh-pages 静态项目网站 <https://andurils.github.io/vue-code-view/>。
- 🐎 ci: 集成 Travis CI,实现网站自动 Build & Deploy By commit。
- 🌈 style: 优化主界面布局样式，移除源码无效代码

---

本项目严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

### Emoji for changelog

- ✨ feat: 新增[特性]
- 🐞 fix: 修复[问题]
- 🦄 refactor: 重构[代码功能]
- 📃 docs: 修改[文档]
- 🌈 style: 修改[代码样式]
- 🧪 test: 修改[测试用例]
- 🔧 build: 构建项目
- 🐳 chore: 添加
- 🐎 ci: CI 配置
- 🎈 perf: 优化[性能]
- 🚀 deploy:部署
- ⚰️ remove dead code

#### 参考

- <https://gitmoji.dev/>
- <https://www.webfx.com/tools/emoji-cheat-sheet/>
- <https://github.com/liuchengxu/git-commit-emoji-cn>
