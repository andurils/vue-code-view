<script>
// https://stackoverflow.com/questions/36607932/unterminated-template-literal-syntax-error-when-literal-contains-script-tag
/* eslint-disable no-useless-escape */
const code_example = `<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1>
    <div :style="{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }">
      <a-button type="primary" ghost>
        andtd Primary
      </a-button> 
      <a-button type="danger" ghost>
        andtd Danger
      </a-button>
      <a-button type="link" ghost>
        andtd Link
      </a-button>
    </div>
    <div class="test" >scss test</div> 
    <div class="test1" >less test</div> 
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
</style>
<style lang='less' >
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);


body .test1 {
  color: yellow;
  background: @link-color-hover;
}
</style>`;

export default {
  name: "demo",
  data() {
    return {
      className: ["page-container"], // page className
      code: code_example,
    };
  },
  mounted() {},
  methods: {},

  render() {
    const { className, style, code } = this;

    return (
      <div class={className} style={style}>
        <code-viewer source={code} show-code={true}></code-viewer>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  // 最小尺寸
  min-width: 1024px;
  min-height: 768px;

  // width: 100%;
  // height: 100vh;

  display: flex;
  flex-direction: column;
}
</style>
