<script>
// https://stackoverflow.com/questions/36607932/unterminated-template-literal-syntax-error-when-literal-contains-script-tag
/* eslint-disable no-useless-escape */
const code_example_1 = `<template>
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
</style> `;

const code_example_2 = `<template>
  <div id="app">
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
  </div>
</template> `;

const code_example_3 = `
<template>
  <div>hi</div>
</template>
<style src="./test.css"></style>
<style lang="stylus" scoped>
  h1
    color red
  h2
    color green
</style>
<style module>
  h1 { font-weight: bold }
</style>
<style bool-attr val-attr="test"></style>
<script>
  export default {}
<\/script>
<div>
  custom block
</div>
<div>
  <style>nested should be ignored</style>
</div>
`;

export default {
  name: "demo",
  data() {
    return {
      className: ["page-container"], // page className
    };
  },
  mounted() {},
  methods: {},

  render() {
    const { className, style } = this;

    return (
      <div class={className} style={style}>
        <h2>demo 1</h2>
        <code-viewer
          source={code_example_1}
          showCode={false}
          errorHandler={(errorMsg) => {
            this.$notify.error({
              title: "Info",
              message: errorMsg,
            });
          }}
          renderToolbar={(CodeButton) => {
            return (
              <div>
                {CodeButton}
                <a-tooltip>
                  <template slot="title">jsx renderToolbar</template>
                  <a-button type="primary" shape="circle" icon="search" />
                </a-tooltip>
                <a-button type="primary" icon="download" />
                <a-button type="primary" shape="circle" icon="download" />
                <a-button type="primary" shape="round" icon="download" />
                <a-button type="primary" shape="round" icon="download" />
              </div>
            );
          }}
        ></code-viewer>
        <h2>demo 2</h2>
        <code-viewer source={code_example_2} showCode={false}></code-viewer>
        <h2>demo 3</h2>
        <code-viewer source={code_example_3} showCode></code-viewer>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  // 最小尺寸
  // min-width: 1024px;
  // min-height: 768px;

  // width: 100%;
  // height: 100vh;

  // display: flex;
  // flex-direction: column;
  padding: 16px;
}
</style>
