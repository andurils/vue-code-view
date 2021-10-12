const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
// const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",

  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@packages", resolve("packages"));
    // .set("@scss", resolve("src/assets/scss"))
    // .set("@components", resolve("src/components"))
    // .set("@plugins", resolve("src/plugins"))
    // .set("@views", resolve("src/views"))
    // .set("@router", resolve("src/router"))
    // .set("@store", resolve("src/store"))
    // .set("@layouts", resolve("src/layouts"))
    // .set("@static", resolve("src/static"));

    // Markdown Loader
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true,
      });
  },
};
