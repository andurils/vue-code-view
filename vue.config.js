module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/my-project/" : "/",
  // webpack配置 - 简单配置方式
  configureWebpack: {
    resolve: {
      alias: {
        // 别名
        vue$: "vue/dist/vue.esm.js", //加上这一句
      },
    },
  },
};
