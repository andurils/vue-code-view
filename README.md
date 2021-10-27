<h1 style="display:flex;justify-content:center;">
Vue Code View
<a href="https://app.travis-ci.com/github/andurils/vue-code-view" style="margin-left:12px;"><img src="https://app.travis-ci.com/andurils/vue-code-view.svg?branch=main" alt="Build Status"></a>
</h1>

English | [简体中文](./README.zh-CN.md)

一个可以实时编辑代码、预览效果的 `代码示例` 展示组件。

效果如下：

![preview][preview-ol] [![Edit vue-code-view-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-code-view-example-3270e?fontsize=14&hidenavigation=1&theme=dark)

## Online Demo

在线预览: <https://andurils.github.io/vue-code-view/>

## ✨ Features

- 🌈 代码可以在线编辑，实时预览效果。
- 🎨 支持代码高亮。
- 📦 自动保存代码，支持历史回溯。
- 📦 支持 `<style>` 解析渲染。
- ⚙️ 更多特性解锁中。

## 组件使用说明

### 📦 安装 Installation

```bash
npm i vue-code-view
```

### 📦 配置

使用包含运行时编译器的 Vue 构建版本。

`vue cli`中 `vue.config.js`文件配置

```javascript
module.exports = {
  runtimeCompiler: true,
};
```

### 🔨 示例

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import CodeView from "vue-code-view/lib/vue-code-viewer.common";

import "vue-code-view/lib/vue-code-viewer.css";
Vue.use(CodeView);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

demo.vue

```javascript
<script>
const code_example = `<template>
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
<\/script>

<style>
#page-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width:66px;
}
</style>

<style lang='scss' >
$font-stack:    Helvetica, sans-serif;
$primary-color: red;

body .test{
  font: 100% $font-stack;
  color: $primary-color;
}
</style> `;

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

### renderToolbar 自定义工具栏

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

### errorHandler 自定义错误处理函数

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

### Attributes

| 参数          | 说明                         | 类型              | 默认值 | 版本 |
| ------------- | ---------------------------- | ----------------- | ------ | ---- |
| theme         | theme mode,支持 light / dark | `light` \| `dark` | `dark` |      |
| showCode      | 是否显示代码编辑器           | boolean           | false  |      |
| source        | 示例代码                     | string            | -      |      |
| renderToolbar | 自定义工具栏展示             | function          | -      |      |
| errorHandler  | 错误处理函数                 | function          | -      |      |
| debounceDelay | 错误处理防抖延迟(ms)         | number            | 300    |      |

## Changelog

Detailed changes for each release are documented in the [release notes](./CHANGELOG.zh-CN.md).

## Inspired

[Links List](./inspired.zh-cn.md)

## License

[MIT](./license)

Copyright (c) 2021-present Anduril

[preview-ol]: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/912bf867ef4c44d3a716e4bf723573ac~tplv-k3u1fbpfcp-watermark.image?
