<p align="center">
  <a href="https://andurils.github.io/vue-code-view/">
    <img width="200" src="https://iconfont.alicdn.com/t/5602941b-e109-4b22-99c5-21b0b041f234.png">
  </a>
</p>

<h1 align="center">Vue Code View(VCV)</h1>

[![Build Status](https://app.travis-ci.com/andurils/vue-code-view.svg?branch=dev)](https://app.travis-ci.com/andurils/vue-code-view)
[![GitHub license](https://img.shields.io/github/license/andurils/vue-code-view)](https://github.com/andurils/vue-code-view/blob/main/LICENSE)
![npm](https://img.shields.io/npm/v/vue-code-view)
![npm bundle size](https://img.shields.io/bundlephobia/min/vue-code-view)
![npm](https://img.shields.io/npm/dt/vue-code-view?label=npm%20downloads)

[English](./README.md) | 简体中文# Vue Code View

 一个基于 `vue 2.x`的轻量代码交互组件，在网页中可以编辑、运行并实时预览代码效果展示。

当阅读包含大量代码的文档时，很多项目文档通过 `markdown loader` 实现了示例代码的 `render` 展示，但它是静态的。当我们想调试代码时，一般需要打开本地IDE或者打开 `codepen`， `codesandbox`等在线编辑器网站，也会受制于电脑是否安装开发环境或者网络连接是否顺畅。

那么能不能有这么一个组件能支持在页面中编辑代码，在网页中可以编辑、运行并实时预览代码效果展示？

特别感谢组件 [react-code-view](https://github.com/simonguo/react-code-view)，基于此编写了vue 版本的组件！使用此组件在 `vue` 页面还是 `markdown` 文档中的多示例代码，都可以实时编辑运行代码、预览效果。

## 在线预览

![示例][preview-ol-v03]  

在线预览: <https://andurils.github.io/vue-code-view/#/demo>

`codesandbox` 示例: [vue-code-view-example](https://codesandbox.io/s/vue-code-view-example-forked-nivmw?fontsize=14&hidenavigation=1&theme=dark)

## ✨ 特性

- 💻 代码可以在线编辑，实时预览效果。
- 🎨 支持示例代码高亮，配置主题。
- 🌈 支持 `<style>` 解析渲染。
- 📑 支持 `Markdown` 文件示例渲染。

## 📦 安装

```bash
npm i vue-code-view
# or
yarn add vue-code-view
```

## 🔨 配置

使用`vue cli`需要在`vue.config.js`文件进行配置，支持使用包含运行时编译器的 Vue 构建版本。

```javascript
module.exports = {
  runtimeCompiler: true,
  // or
  chainWebpack: (config) => { 
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js");
  },
}; 
```

## 💻 示例

入口文件 `main.js` 中引入组件,不需要手动引入样式。

```javascript
import Vue from "vue";
import App from "./App.vue";
import CodeView from "vue-code-view";

Vue.use(CodeView);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

## API

### Attributes

| 参数          | 说明                         | 类型              | 默认值 | 版本 |
| ------------- | ---------------------------- | ----------------- | ------ | ---- |
| themeMode      | 主题theme mode,默认`light`,支持 `dark` | `` \| `dark` | `` |      |
| showCode      | 是否显示代码编辑器,只有在`layout`值为`top`生效           | boolean           | false  |      |
| source        | 运行示例源码                 | string            | -      |      |
| layout        | render 视图布局             |  `top` \| `right`  \| `left`  | `top` | `0.4.0`|

## 更新日志

Detailed changes for each release are documented in the [release notes](./CHANGELOG.zh-CN.md).

## 💡 Inspired

[links](./INSPIRED.zh-CN.md).

## License

VCV is licensed under the terms of the [MIT License](./LICENSE)

Copyright (c) 2021-present Anduril

[preview-ol]: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/912bf867ef4c44d3a716e4bf723573ac~tplv-k3u1fbpfcp-watermark.image?
[preview-ol-v01]:https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e056aef106b04752bde86e5bc48434c9~tplv-k3u1fbpfcp-watermark.image?
[preview-ol-v02]:https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4550d42d98084cf99fe333fadb3f5983~tplv-k3u1fbpfcp-watermark.image?
[preview-ol-v03]:https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/987ab9814e314f92a244fdf6510e6224~tplv-k3u1fbpfcp-watermark.image?
