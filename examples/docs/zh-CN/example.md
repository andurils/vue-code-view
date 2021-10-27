## 组件说明文档

::: demo Alert provee 4 tipos de temas definidos por `type`, el valor por defecto es `info`.

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
        code_example: ` <template>
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
</style> `,
      };
    },
  };
</script>
```

:::

### 📦 安装 Installation

```bash
npm i vue-code-view
```
