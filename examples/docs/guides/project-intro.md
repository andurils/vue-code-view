# 项目概述

本文将从结构、功能等方面讲解下项目 `vue-code-view` 的搭建过程，您可以了解以下内容：

- 使用 `vue cli 4`从0搭建一个组件库及细致配置信息。
- 项目的多环境构建配置。
- 项目网站的发布部署、持续集成。
- 项目NPM包发布。
- 项目组件的自定义 `Markdown` 解析 `loader`。

## 项目构建

### npm scripts 配置

调整 `package.json` 里的 `scripts` 配置脚本,并添加 `--mode xxx` 来选择不同环境配置。

```js
"scripts": { 
  // 开发环境 启动项目示例网站
  "dev": "vue-cli-service serve ", 
  // 组件库构建 
  "dist": "vue-cli-service build  --mode production --target lib --name vue-code-viewer --dest lib src/index.js",
  // 项目示例网站构建
  "deploy:build": "vue-cli-service build --mode deploy" 
}
```

### 组件构建  

组件库构建通过指定入口文件`src/index.js`、设定参数选项。

```js
用法：vue-cli-service build [options] [entry|pattern]

参数选项：
  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist) 
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名) 
```

构建一个库会输出：

- `lib/vue-code-viewer.common.js`：一个给打包器用的 CommonJS 包 。
- `lib/vue-code-viewer.umd.js`：一个直接给浏览器或 AMD loader 使用的 UMD 包。
- `lib/vue-code-viewer.umd.min.js`：压缩后的 UMD 构建版本。
- `lib/vue-code-viewer.css`：提取出来的 CSS 文件。

### 组件NPM包发布  

配置 `package.json` 文件中属性值用于npm 发布。

- name: 包名，该名字是唯一的。需要去[npm registry](https://link.juejin.cn?target=http%3A%2F%2Fregistry.npmjs.org%2F "http://registry.npmjs.org/")查看名字是否已被使用。
- version: 包版本号，版本号规则参考《语义化版本 2.0.0》。每次发布至 npm 需要修改版本号，不能和历史版本号相同。
- description: 包的描述，描述这个包的主要功能以及用途。
- main: 入口文件，该字段需指向项目编译后的包文件。
- unpkg: UMD模式入口包文件
- keyword：关键字，数组、字符串。
- author：包的作者。
- private：是否私有，需要修改为 false 才能发布到 npm
- license： 开源协议。
- repository：包的Git Repo信息，包括type和URL。
- homepage：项目官网的url。

更新 `package.json` 文件内容:

```js
{
  "name": "vue-code-view",
  "version": "0.3.9",
  "description": "A code editor component based on Vue.js 2 ",
  "main": "lib/vue-code-viewer.common.js",
  "unpkg": "lib/vue-code-viewer.umd.js",
  "scripts": {},
  "dependencies": {},
  "peerDependencies": {},
  "devDependencies": {},
  "keywords": [
    "vue",
    "components",
    "codemirror",
    "code editor"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/andurils/vue-code-view.git"
  },
  "author": "andurils",
  "license": "MIT",
  "homepage": "https://andurils.github.io/vue-code-view"
}

```

加`.npmignore` 文件，设置忽略发布文件。发布到 npm 中文件，只保留有的 lib 目录、package.json、README.md。

```bash
# 忽略目录 
examples/
node_modules/
public/
build/
src/
dist/
deploy/
# 忽略指定文件 
.browserslistrc 
.eslintignore 
.prettierignore 
.env
.env.*
*.js  
```  

接下来 `npmjs.com` 上注册账号登录后，执行 `npm publish`命令完成组件包发布操作。

发布成功后，进入组件的NPM首页  [npm/vue-code-view](https://www.npmjs.com/package/vue-code-view), 可以看到上面的项目配置信息 。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c96d56ee6144485f93913b688f664e68~tplv-k3u1fbpfcp-watermark.image?)

### 项目示例网站构建  

更新 `vue.config.js`，运行 `npm run deploy:build` 构建项目示例网站输出至 `deploy` 目录下。

```js
const path = require("path"); 
const resolve = (dir) => path.join(__dirname, dir); 
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = { 
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
  productionSourceMap: false,
  outputDir: process.env.VUE_APP_ENV === "deploy" ? "deploy" : "dist",  
  configureWebpack: (config) => {
    // 项目入口
    config.entry.app = "./examples/main.js"
  },
  ...
};

```

### 持续集成

使用 `Travis CI`的持续集成服务自动构建项目示例网站并部署至 `gh-pages` 分支 。

根目录下添加 `.travis.yml`文件，指定了 Travis 的行为。通过设置一旦代码仓库有新的 Commit，Travis 就会去找这个文件，执行里面的命令(执行构建、部署等操作)。
y

```bash
sudo: false
language: node_js
node_js: 14
install:
  - yarn 

script: npm run deploy:build
after_script: 
  - mkdir temp_web 
  - cd temp_web
  - git clone --depth 1 -b gh-pages --single-branch https://${TravisCI_Token}@${GH_REF} && cd vue-code-view 
  - echo 'copy && commit' 
  - rm -rf js fonts
  - cp -rf ../../deploy/** .
  - git config user.name "${U_NAME}"
  - git config user.email "${U_EMAIL}"
  - git add -A .
  - git commit -m ":construction_worker:- Build & Deploy by Travis CI"
  - git push origin gh-pages  
  - echo "DONE, Bye~"
  - exit 0
```

`Travis CI`项目构建后台：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbfeedcb19854b06acb0af1ec87e415e~tplv-k3u1fbpfcp-watermark.image?)

### 开启构建压缩

安装相关插件。

```bash
# gzip webpack 4.x 对应 6.x版本 
npm i compression-webpack-plugin@6.1.1 -D 

# 代码压缩
npm i uglifyjs-webpack-plugin -D
```

配置  `vue.config.js`，开启插件。

```js
...
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); 
// gzip压缩  webpack 4.x 对应 6.x版本 cnpm i compression-webpack-plugin@6.1.1 --save-dev
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// 代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = { 
  ...
  configureWebpack: (config) => { 
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
};

```

### 组件说明文档

参考`element 2`的实现，自定义 `build/md-loder`对 `Markdown` 文件进行解析渲染，将 `examples\docs\zh-CN\example.md` 编译为 HTML。已在前文 [04.封装组件封装、编写说明文档](https://juejin.cn/post/6953614014546968589#heading-5) 中详细说明,不再过多赘述。

配置 `vue.config.js` ，添加 `.md` 文档的自定义 `Markdown Loader`。

```js
module.exports = { 
  ...
  configureWebpack: (config) => { 
    config.resolveLoader.modules = ["node_modules", "./build/"]; // 自定义loader
  },
  chainWebpack: (config) => { 
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
  },
}; 
```

`examples\router\index.js`配置路由:

```js
const routes = [  
  {
    path: "/md",
    name: "Markdown",
    component: (r) =>
      require.ensure([], () => r(require("../docs/zh-CN/example.md"))),
  },
];
```
