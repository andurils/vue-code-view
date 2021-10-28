# 组件说明文档

## 🔧 安装

```bash
npm i vue-code-view
# or
yarn add vue-code-view
```

## 🔨  配置

使用包含运行时编译器的 Vue 构建版本。

`vue cli`中 `vue.config.js`文件配置

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

main.js

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

::: demo `基础示例`.

```html
<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1>
    <div class="test" >scss test</div>
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

.test{
  font: 100% $font-stack;
  color: $primary-color;
}
</style>  
```

:::

::: demo `MD`文档中组件嵌套示例，示例代码中引用组件.

```html
<template>
  <div id="app">
    <code-viewer :source="code_example"></code-viewer>
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
    <div class="test" >scss test</div>
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

.test{
  font: 100% $font-stack;
  color: $primary-color;
}
</style> `,
      };
    },
  };
</script>
```

:::

`JSX`使用方式.

```html
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

## codesandbox 在线示例

<iframe src="https://codesandbox.io/embed/vue-code-view-example-3270e?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-code-view-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

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

### Slot

| name | 说明 |
| ---- | ---- |
| 暂无 | 暂无 |

### Events

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |
| 暂无     | 暂无 | —        |
