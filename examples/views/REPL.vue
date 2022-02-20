<script>
const code_example_1 = `<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1>
    <div>element 2.x</div>
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
    <div class="test" >scss support!</div>
    <div class="less-test" >less support!</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      iconLoading: false,
      version: '2.x'
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
@width: 10px;
@height: @width + 10px;

.less-test {
  width: @width;
  height: @height;
  font-size:32px;
}
</style> `;
// <style lang='stylus' >
// .stylus-test
//   width 80%
//   text-align center
//   padding 10px
//   margin 0 auto
//   box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.19)
// </style>

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
  name: "demo",
  data() {
    return {
      className: ["nav"], // page className
    };
  },
  mounted() {},
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
  height: calc(100vh - 64px);
  --app-controls-h: 5.6rem;
  --pane-controls-h: 4.2rem;
  overflow: hidden;
  padding: 12px 0 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.vue-vcv {
  height: calc(100% - 2px);
}
</style>
