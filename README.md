<h1 style="display:flex;justify-content:center;">
Vue Code View
<a href="https://app.travis-ci.com/github/andurils/vue-code-view" style="margin-left:12px;"><img src="https://app.travis-ci.com/andurils/vue-code-view.svg?branch=main" alt="Build Status"></a>
</h1>

English | [简体中文](./README.zh-CN.md)

 一个基于 `vue 2.x`的轻量代码交互组件，在网页中实时编辑运行代码、预览效果的轻量展示组件。

当我们阅读包含大量代码的文档时，当需要查看、调试代码运行效果，必须要打开IDE或者跳转至 `codepen` `codesandbox`等在线编辑器。虽然很多 `Markdown` 文档通过 `loader` 实现了示例代码的 `render` 展示，当需要调试代码时，还是需要重复上述步骤，体验不是太友好。那么能不能有这么一个组件能支持在页面中编辑代码，实时运行预览效果？

> 起初没有找到，当看到了 [react-code-view](https://github.com/simonguo/react-code-view) 受到了启发，所以有了此组件，再次特别感谢！

使用此组件,  `vue` 页面还是 `Markdown` 文档中的多示例代码，都可以实时编辑运行代码、预览效果。

效果如下：

![preview][preview-ol]  

## Online Demo

在线预览: <https://andurils.github.io/vue-code-view/>

## ✨ Features

- 💻 代码可以在线编辑，实时预览效果。
- 🎨 支持代码高亮。
- 🌈 支持 `<style>` 解析渲染。
- 📑 支持 `Markdown` 在线渲染。

## 🔧 安装

```bash
npm i vue-code-view
# or
yarn add vue-code-view
```

## 🔨  配置

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

入口文件 `main.js` 中引入组件及样式。

```javascript
import Vue from "vue";
import App from "./App.vue";
import CodeView from "vue-code-view";

import "vue-code-view/lib/vue-code-viewer.css";
Vue.use(CodeView);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

## 💻 示例

### 🎬 基础示例

`Markdown` 中的代码可以运行，支持在线编辑并预览效果。支持代码高亮。 组件默认提供了代码切换按钮和背景透明切换按钮。

```html
<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1> 
  </div>
</template>
<script>
export default {
    data() {
      return {
        version: '2.x'
      };
    },
  };
</script>

<style> 
.logo {
  width:30px;
}

h1{
  color:red;
}
</style> 
```

### 🎬 `<style>` 支持

组件支持样式 `<style>` 实时解析，预处理目前尽支持 `SASS` 。每个组件的样式彼此隔离。

```html
<template>
  <div id="app"> 
    <h1>Welcome to Vue.js !</h1> 
    <div class="second">scss support!</div>
  </div>
</template> 
<style>  
h1{
  color:blue;
}
</style> 
<style lang='scss' > 
$primary-color: #409EFF; 

.second{ 
  color: $primary-color;
}
</style>
```
  
### 🎬 `JSX`使用方式

```html
<script>
const code_example = `<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <h1>Welcome to Vue.js  !</h1>
  </div>
</template> `;

export default {
  name: "demo",
  render() {
    return (
      <div >
        <code-viewer source={code_example}
          showCode={false}
        ></code-viewer>
      </div>
    );
  },
};
</script>
```

### 🎬  renderToolbar 自定义工具栏

```jsx
render() {
  return (
    <div >
      <code-viewer
        source={code_example}
        showCode={false}
        renderToolbar={(CodeButton) => {
          return (
            <div>
              {CodeButton}
              <a-tooltip>
                <template slot="title">jsx renderToolbar</template>
                <a-button type="primary" shape="circle" icon="search" />
              </a-tooltip>
            </div>
          );
        }}
      ></code-viewer>
    </div>
  );
},
```

### 🎬  errorHandler 自定义错误处理函数

```jsx
render() {
  return (
    <div >
      <code-viewer
        source={code_example}
        showCode={false}
        errorHandler={(errorMsg) => {
          this.$notify.error({
            title: "Info",
            message: errorMsg,
          });
        }}
      ></code-viewer>
    </div>
  )
}
```

## API

### 📃 Attributes

| 参数          | 说明                         | 类型              | 默认值 | 版本 |
| ------------- | ---------------------------- | ----------------- | ------ | ---- |
| theme         | theme mode,支持 light / dark | `light` \| `dark` | `dark` |      |
| showCode      | 是否显示代码编辑器           | boolean           | false  |      |
| source        | 示例代码                     | string            | -      |      |
| renderToolbar | 自定义工具栏展示             | function          | -      |      |
| errorHandler  | 错误处理函数                 | function          | -      |      |
| debounceDelay | 错误处理防抖延迟(ms)         | number            | 300    |      |

### 📃 Slot

| name | 说明 |
| ---- | ---- |
| 暂无 | 暂无 |

### 📃 Events

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |
| 暂无     | 暂无 | —        |

## 环境

`Nodejs`  14.18.X LTS 

`node-sass`  4.14+
## Changelog

Detailed changes for each release are documented in the [release notes](./CHANGELOG.zh-CN.md).

## Inspired

[Links List](./inspired.zh-cn.md)

## License

[MIT](./license)

Copyright (c) 2021-present Anduril

[preview-ol]: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/912bf867ef4c44d3a716e4bf723573ac~tplv-k3u1fbpfcp-watermark.image?
