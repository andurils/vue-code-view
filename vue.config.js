const path = require("path");
const webpack = require("webpack");

const resolve = (dir) => path.join(__dirname, dir);
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

// gzip压缩  webpack 4.x 对应 6.x版本 cnpm i compression-webpack-plugin@6.1.1 --save-dev
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// 代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
  productionSourceMap: false,
  outputDir: process.env.VUE_APP_ENV === "deploy" ? "deploy" : "dist",
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
    extract: process.env.VUE_APP_ENV === "deploy" ? true : false,
  },
  configureWebpack: (config) => {
    config.entry.app =
      process.env.VUE_APP_ENV === "play"
        ? "./examples/play.js"
        : "./examples/main.js";
    config.resolveLoader.modules = ["node_modules", "./build/"]; // 自定义loader

    const plugins = [];

    // 生产环境相关配置
    if (IS_PROD && process.env.VUE_APP_ENV === "pub") {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path][base].gz",
          algorithm: "gzip",
          minRatio: 0.99,
          test: productionGzipExtensions,
          deleteOriginalAssets: false,
        })
      );
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false,
            },
            // 删除console debugger
            compress: {
              drop_debugger: true,
              drop_console: true, // console
              pure_funcs: ["console.log"], // 移除console
            },
            // 删除警告
            warnings: false,
          },
          sourceMap: false,
          parallel: true, //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@examples", resolve("examples"))
      .set("@assets", resolve("examples/assets"))
      .set("@views", resolve("examples/views"))
      .set("@router", resolve("examples/router"))
      .set("@store", resolve("examples/store"));
    // .set("@scss", resolve("src/assets/scss"))
    // .set("@components", resolve("examples/components"))
    // .set("@plugins", resolve("examples/plugins"))
    // .set("@layouts", resolve("examples/layouts"))
    // .set("@static", resolve("examples/static"));

    config
      .plugin("ignore")
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); //忽略/moment/locale下的所有文件

    // Markdown Loader
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      // 自定义loader
      .use("md-loader")
      .loader("md-loader")
      .end();

    if (IS_PROD && process.env.VUE_APP_ENV === "pub") {
      // config.optimization.delete("splitChunks");

      // 打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
  },
};
