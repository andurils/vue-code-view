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

English | [简体中文](./README.zh-CN.md)

A lightweight code interaction component based on `vue 2.x`, which can edit, run and preview the code effect display in real time on the web page.

When reading docs that contain a lot of code, many project docs implement a `render` representation of the sample code via the `markdown loader`, but it is static. When we want to debug code, we generally need to open the local IDE or open online editor websites such as `codepen`, `codesandbox`, and it is also subject to whether the computer has a development environment installed or whether the network connection is smooth.

So can there be such a component that can support editing code in the page, edit, run and preview the code effect display in real time in the web page?

Special thanks to the component [react-code-view](https://github.com/simonguo/react-code-view), based on which the vue version of the component was written! Using this component, you can edit the running code and preview the effect in real time by using the multi-sample code in the `vue` page or the `markdown` document.

## Online Demo

![示例][preview-ol-v03]  

demo address: <https://andurils.github.io/vue-code-view/#/demo>

`codesandbox` example: [vue-code-view-example](https://codesandbox.io/s/vue-code-view-example-forked-nivmw?fontsize=14&hidenavigation=1&theme=dark)

## ✨ Features

- 💻 Code can be edited online and preview the effect in real time.
- 🎨 Support sample code highlighting, configure themes.
- 🌈 Support `<style>` parsing and rendering.
- 📑 Support `Markdown` file example rendering

## 📦 Install

```bash
npm i vue-code-view
# or
yarn add vue-code-view
```

## 🔨 Configure

Using `vue cli` requires configuration in the `vue.config.js` file, which supports the use of Vue builds that include the runtime compiler.

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

## 💻 Usage

Components are introduced in the entry file `main.js`, and there is no need to manually introduce styles.

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
| themeMode         | code editor theme mode,default `light`  | `` \| `dark` | `` |      |
| showCode      | show the code editor ,  only  `layout` value is `top` takes effect          | boolean           | false  |      |
| source        | source code               | string            | -      |      |
| layout        | render view layout             |  `top` \| `right`  \| `left`  | `top` | `0.4.0` |

## Changelog

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
