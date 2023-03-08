<script>
// https://stackoverflow.com/questions/36607932/unterminated-template-literal-syntax-error-when-literal-contains-script-tag
/* eslint-disable no-useless-escape */
const code_example_1 = `<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://sfc.vuejs.org/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1>
    <div class="test" >scss test</div>
    <div class="stylus-wrapper" >stylus test</div>
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

.test{
  font-size:66px;
  font: 600 $font-stack;
  color: $primary-color;
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
  margin-top 36px
  background-color #3b8eed42 
  box-shadow 1px 1px 3px black 
</style>

`;

export default {
  name: "PlayDemo",
  data() {
    return {
      className: ["page-container"], // page className
      themeMode: "light", // light or dark
    };
  },
  mounted() {},
  methods: {
    changelight() {
      this.themeMode = "light";
      // console.log(this.themeMode);
    },
    changedark() {
      this.themeMode = "dark";
      // console.log(this.themeMode);
    },
  },

  render() {
    const { className, style } = this;

    return (
      <div class={className} style={style}>
        <h2>demo play</h2>

        <code-viewer
          class="test"
          source={code_example_1}
          showDevice={false}
          showCode={true}
          layout={"left"}
          themeMode={this.themeMode}
          errorHandler={(errorMsg) => {
            this.$notify.error({
              title: "Info",
              message: errorMsg,
            });
          }}
          renderToolbar={(CodeButton, transparentButton) => {
            return (
              <div>
                {CodeButton}
                <a-tooltip>
                  <template slot="title">jsx renderToolbar</template>
                  <a-button type="primary" shape="circle" icon="search" />
                </a-tooltip>
                <a-button type="primary" icon="download" />
                <a-button type="primary" shape="circle" icon="download" />
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
.test {
  height: 400px;
  width: 1200px;
}
</style>
