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

 一个基于 `vue 2.x`的轻量代码交互组件，在网页中可以编辑、运行并实时预览代码效果展示。

当阅读包含大量代码的文档时，很多项目文档通过 `markdown loader` 实现了示例代码的 `render` 展示，但它是静态的。当我们想调试代码时，一般需要打开本地IDE或者打开 `codepen`， `codesandbox`等在线编辑器网站，也会受制于电脑是否安装开发环境或者网络连接是否顺畅。

那么能不能有这么一个组件能支持在页面中编辑代码，在网页中可以编辑、运行并实时预览代码效果展示？

特别感谢组件 [react-code-view](https://github.com/simonguo/react-code-view)，基于此编写了vue 版本的组件！使用此组件在 `vue` 页面还是 `markdown` 文档中的多示例代码，都可以实时编辑运行代码、预览效果。

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

## 💻 使用

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

## 💻 示例

### 🎬 基础示例

:::tip
`Markdown` 中的代码可以运行，支持在线编辑并预览效果。支持代码高亮。 组件默认提供了代码切换按钮和背景透明切换按钮。
:::

::: demo

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

:::

### 🎬 `<style>` 支持

:::tip
组件支持样式 `<style>` 实时解析，预处理目前尽支持 `SASS` 。每个组件的样式彼此隔离。
:::

::: demo  

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

:::

### 🎬 组件库混合使用

:::tip
项目引入其他组件库后，组件的示例源代码中直接使用即可，实现预览调试功能。
:::

::: demo  

```html
<template>
  <div id="app"> 
    <div>element 2.x</div> 
    <el-row class="row">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>


    <el-row class="row">
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
    <div>Ant Design of Vue 1.x</div> 
    <div class="row">
      <a-button type="primary">
        Primary
      </a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">
        Dashed
      </a-button>
      <a-button type="danger">
        Danger
      </a-button>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary">
          按钮
        </a-button>
      </a-config-provider>
      <a-button type="primary">
        按钮
      </a-button>
      <a-button type="link">
        Link
      </a-button>
    </div>
    <div class="row">
      <a-button type="primary" loading>
        Loading
      </a-button>
      <a-button type="primary" size="small" loading>
        Loading
      </a-button> 
      <a-button type="primary" :loading="loading" @mouseenter="enterLoading">
        mouseenter me!
      </a-button>
      <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
        延迟1s
      </a-button> 
      <a-button type="primary" loading />
      <a-button type="primary" shape="circle" loading />
      <a-button type="danger" shape="round" loading />
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      loading: false,
      iconLoading: false,
    };
  },
  methods: {
    enterLoading() {
      this.loading = true;
    },
    enterIconLoading() {
      this.iconLoading = { delay: 1000 };
    },
  },
};
</script> 
<style> 
.row {
  padding:12px;
} 
</style> 
```

:::

### 🎬 组件嵌套引用

::: demo `MD`文档中组件嵌套示例，示例代码中引用组件.

```html
<template>
  <div id="app">
    <code-viewer :source="code_example"></code-viewer>
    <div> 嵌套展示，可以无限递归 </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        code_example: ` 
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
<\\/script>

<style> 
.logo {
  width:66px;
}
</style> `,
      };
    },
  };
</script>
```

:::

### 🎬 `JSX`使用方式

:::tip
组件暂不支持 `JSX` 语法。
:::

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

## 🎬 codesandbox 在线示例

<iframe src="https://codesandbox.io/embed/vue-code-view-example-forked-nivmw?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-code-view-example (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
