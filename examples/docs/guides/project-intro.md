
# 0x00 前言

本文将从结构、功能等方面讲解下项目 `vue-code-view` 的搭建过程，您可以了解以下内容：

- 使用 `vue cli 4`从0搭建一个组件库及细致配置信息。
- 项目的多环境构建配置。
- 项目网站的发布部署、持续集成。
- 项目NPM包发布。
- 项目组件的自定义 `Markdown` 解析 `loader`。

本文算是 [📚Element 2 源码学习系列](https://juejin.cn/column/6961321064110489631) 的拓展篇内容，通过之前的文章了解了开源组件库的结构原理后，自己也搭建个组件项目怎么办？接下来就是实践的过程，算是"**知行合一**"了吧！ 耐心读完，相信会对您有所帮助!

---

# 0x01 项目概述

## 创建项目

本项目使用 `Vue CLI 4.x` 进行项目创建。

```bash
// 安装环境 
npm install -g @vue/cli 
// 创建项目 
vue create vue-code-view
```

在终端中输入命令后，按照以下步骤操作创建项目：

1. 选择手动选择功能 `Manually select features`。
2. 选中 `Babel`, `Router`, `CSS Pre-processors`,`Linter / Formatter`等功能 。
3. 选择 `vue` 版本 `2.X`
4. 选择路由是否使用`history`模式，默认 `yes`。
5. 选择CSS 预处理器`Sass/SCSS(with node-sass)`。
6. 选择代码风格、格式校验 `linter / formatter`配置`ESLint + Prettier`。
7. 选择校验时机保存时检测`Lint on save`  
8. 选择 `Babel`, `ESLint`等配置文件存放在专用配置文件中  `In dedicated config files`。

## 配置多环境变量

在项目根目录中新建 `.env`, `.env.deploy`,`.env.production`等文件。

以 `VUE_APP` 开头的变量会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中，代码中可以通过 `process.env.VUE_APP[xxx]` 访问。

> `NODE_ENV` 和 `BASE_URL` 是两个特殊变量，在代码中始终可用。

**.env**\
`vue-cli-service serve` 默认的本地开发环境配置

```bash
NODE_ENV = development
VUE_APP_PUBLIC_PATH = /
```

**.env.production**\
`vue-cli-service build` 默认的环境配置（正式服务器）

```bash
NODE_ENV = production 
VUE_APP_PUBLIC_PATH = /
VUE_APP_ENV = pub
```

**.env.deploy**\
用于 github pages 构建部署的环境配置。`VUE_APP_PUBLIC_PATH` 设置 `/vue-code-view` 用于虚拟目录。

```bash
NODE_ENV = production 
VUE_APP_PUBLIC_PATH = /vue-code-view
VUE_APP_ENV = deploy
```

## 目录结构调整

默认的 `src` 目录下存放项目源码及需要引用的资源文件。根目录下新建 `examples` 文件夹用于项目示例网站，将`src` 目录下文件移至 `examples` 文件 。`src` 目录存放项目组件源码。

调整后根目录文件结构如下：

```bash
├── examples   // 项目示例网站
|  ├── App.vue
|  ├── assets
|  ├── components
|  ├── main.js
|  ├── router
|  └── views 
├── src       // 项目组件源码 
|  ├── fonts
|  ├── index.js
|  ├── locale
|  ├── mixins
|  ├── src
|  ├── styles
|  └── utils
├── public
├── package.json
```

## 配置基础 vue.config.js

项目默认入口`./src/main.js`,配置如下：

```js
{
  entry: {
    app: [
      './src/main.js'
    ]
  }
} 
```

在根目录下创建 `vue.config.js` 修改默认配置。

```js
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  configureWebpack: (config) => {
    // 项目入口
    config.entry.app = "./examples/main.js";
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("examples"))
      .set("@assets", resolve("examples/assets"))
      .set("@src", resolve("src"))
      .set("@views", resolve("examples/views"))
      .set("@router", resolve("examples/router"))
      .set("@store", resolve("examples/store")); 
  },
}; 
```

运行 `npm run serve` ， 项目网站正常运行。

# 0x02 项目构建

## npm scripts 配置

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

## 组件构建  

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

## 组件NPM包发布  

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

## 项目示例网站构建  

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

## 持续集成

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

## 开启构建压缩

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

## 组件说明文档

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

---
