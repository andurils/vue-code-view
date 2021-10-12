const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const zopfli = require("@gfx/zopfli");
// const BrotliPlugin = require("brotli-webpack-plugin");

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
  // eslint-disable-next-line no-unused-vars
  configureWebpack: (config) => {
    // const plugins = [];
    if (IS_PROD) {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: "chunk-common",
              chunks: "initial",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true,
            },
            vendors: {
              name: "chunk-vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "initial",
              priority: 2,
              reuseExistingChunk: true,
              enforce: true,
            },
            codemirrorJs: {
              name: "chunk-codemirror",
              test: /[\\/]node_modules[\\/]codemirror[\\/]/,
              chunks: "all",
              priority: 3,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    // config.plugins = [...config.plugins, ...plugins];
  },
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

    if (IS_PROD) {
      config.optimization.delete("splitChunks");

      // 打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
  },
};
