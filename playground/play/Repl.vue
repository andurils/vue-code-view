<script>
const code_example_1 = `<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://sfc.vuejs.org/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1> 
    <div class="test" >scss support!</div>
    <div class="less-test" >less support!</div>
    <div class="stylus-wrapper stylus-test" >stylus test</div> 

     
    <button type="button" @click="enterIconLoading">
      {{ btnText }} {{ lazyLoading ? "延迟执行等待中(3s)" : "" }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      lazyLoading: false,
      btnText: "Click Me!",
      version: '2.x'
    };
  },
  methods: { 
    enterIconLoading() { 
      
      this.btnText = "";
      this.lazyLoading = true;

      setTimeout(() => {
        this.lazyLoading = false; 
        this.btnText = "Click Me!";
      }, 3000);
    },
  },
};
<\/script>
<style>
.row {
  padding:12px;
}

.logo {
  width:66px;
} 
</style>

<style lang='scss' >
$primary-color: red;

.test{
  color: $primary-color;
  font-size:32px;
}
</style>
<style lang='less' >
@width: 80px;
@height: @width + 10px;

.less-test {
  width: @width;
  height: @height;
  font-size:32px;
}
</style>
<style scoped lang="stylus">
box-shadow()
  -webkit-box-shadow arguments
  -moz-box-shadow arguments
  box-shadow arguments
  html.ie8 &,
  html.ie7 &,
  html.ie6 &
  	border 2px solid arguments[length(arguments) - 1]

.stylus-wrapper 
  background-color #3b8eed42 
  box-shadow 1px 1px 3px black 

.stylus-test
  width 80%
  text-align center
  padding 10px
  margin 0 auto
  
</style>

<style> 
button {
  margin-top:12px;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent; 
  cursor: pointer;
  transition: all .3s cubic-bezier(.645,.045,.355,1); 
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px; 
  border-color: #d9d9d9; 

  color: #fff; 
  background: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
}
</style>
`;

// const code_test = `
// <template>
//   <div>hi</div>
// </template>
// <style src="./test.css"></style>
// <style lang="stylus" scoped>
//   h1
//     color red
//   h2
//     color green
// </style>
// <style module>
//   h1 { font-weight: bold }
// </style>
// <style bool-attr val-attr="test"></style>
// <script>
//   export default {}
// <\/script>
// <div>
//   custom block
// </div>
// <div>
//   <style>nested should be ignored</style>
// </div>
// `;

export default {
  name: "REPLDemo",
  data() {
    return {
      className: ["nav"], // page className
    };
  },
  mounted() { },
  methods: {},

  render() {
    const { className, style } = this;

    return (
      <div class="repl-outer" style={style}>
        <code-viewer
          class="vue-vcv"
          source={code_example_1}
          showCode
          layout={"right"}
          errorHandler={(errorMsg) => {
            this.$notify.error({
              title: "Info",
              message: errorMsg,
            });
          }}
          renderToolbar={(CodeButton, transparentButton) => {
            return (
              <div>
                <a-tooltip style="margin-right:8px">
                  <template slot="title">自定义按钮</template>
                  <a-button type="primary" shape="circle" icon="search" />
                </a-tooltip>
                {CodeButton}
                {transparentButton}
              </div>
            );
          }}
        ></code-viewer>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.repl-outer {
  position: relative;
  margin: 0 auto;
  // max-width: var(--vp-screen-max-width);
  height: calc(100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px));
  --app-controls-h: 5.6rem;
  --pane-controls-h: 4.2rem;
  overflow: hidden;
  // padding: 12px 0 0 0;
  // padding: 4px 2px 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

// .vue-vcv {
//   height: calc(100% - 2px);
// }
</style>
