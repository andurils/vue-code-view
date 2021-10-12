# 更新日志

## Dev

- `//TODO`
  - 动态配置=>全局配置 （主题切换、语言选择等编辑器功能开关选型）
- `//Done`
- 编辑器优化，增加 `括号/标签` 匹配自动关闭。
- 🌟演示示例优化
  - 引入 `ant-design-vue` 组件代码。
  - 增加路由跳转，添加菜单更新日志菜单（支持 `.md` 文件解析 ）。
  - 示例字符串模板添加 `script` 内容，解决 [unterminated-template-literal-syntax-error-when-literal-contains-script-tag](https://stackoverflow.com/questions/36607932/unterminated-template-literal-syntax-error-when-literal-contains-script-tag)

## 0.4.0

`2021-09-17`

- 🆕 🎉 编辑器支持 `<style>` 解析,暂不支持 CSS 预编译。

## 0.3.2

`2021-09-17`

- 🌟 注册/发布 npm 包 [NPM/vue-code-view](https://www.npmjs.com/package/vue-code-view)。
- 🆕 新增代码自动保存，支持历史回溯功能。

## 0.3.1

`2021-08-24`

- 🌟 集成 `Ant Design` 官方图标库 [ant-design/icons](https://www.iconfont.cn/collections/detail?cid=9402)。
- 🆕 新增全屏模式(`screenfull`)。
- 💄 使用节流函数（`throttle`）优化客户端存储功能。
- 🌟 代码展示编辑区域`flex`布局优化。

## 0.3.0

`2021-08-22`

- 🌟 优化 `CodeMirrorr`代码编辑器
  - 🆕 新增功能 `vue` 语法高亮、代码折叠、滚动条、光标行背景高亮
  - 🆕 新增客户端存储功能，缓存最新代码(`vue2-storage`)。

## 0.2.0

`2021-08-22`

- 🆕 编辑器支持 `<script>` 代码解析。

## 0.1.0

`2021-08-21`

- 🆕 发布 gh-pages 静态项目网站 <https://andurils.github.io/vue-code-view/>。
- 👷 集成 Travis CI,实现网站自动 Build & Deploy By commit。
- 💄 优化主界面布局样式，移除源码无效代码

---

本项目严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---
