(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["zh-CN","chunk-07d31c82","chunk-7f8c0448","chunk-2d219fe8"],{"17cb":function(t,e,n){t.exports=n.p+"img/resource.a72b8f8d.png"},"238e":function(t,e,n){"use strict";n.r(e);var o,r,a=n("968a"),s=n.n(a),l=n("f82c"),i=n.n(l),c=n("7c642"),d=n.n(c),u=n("17cb"),p=n.n(u),m={name:"HomeCard",render:function(){var t=arguments[0];return t("a-row",{attrs:{gutter:[24,32]}},[t("a-col",{attrs:{xs:24,sm:6}},[t("a-card",{attrs:{hoverable:!0},class:"more-card"},[t("img",{slot:"cover",attrs:{alt:"example",src:s.a}}),t("a-card-meta",{attrs:{title:"轻量",description:"无需安装任何环境，打开页面快速体验交互细节。"}})])]),t("a-col",{attrs:{xs:24,sm:6}},[t("a-card",{attrs:{hoverable:!0},class:"more-card"},[t("img",{slot:"cover",attrs:{alt:"example",src:i.a}}),t("a-card-meta",{attrs:{title:"交互",description:"在线代码编辑器，支持代码高亮、光标行背景高亮、括号/标签匹配自动关闭、代码折叠。"}})])]),t("a-col",{attrs:{xs:24,sm:6}},[t("a-card",{attrs:{hoverable:!0},class:"more-card"},[t("img",{slot:"cover",attrs:{alt:"example",src:d.a}}),t("a-card-meta",{attrs:{title:"实时",description:"实时预览代码编辑效果。"}})])]),t("a-col",{attrs:{xs:24,sm:6}},[t("a-card",{attrs:{hoverable:!0},class:"more-card"},[t("img",{slot:"cover",attrs:{alt:"example",src:p.a}}),t("a-card-meta",{attrs:{title:"Markdown",description:"支持 Markdown 示例实时渲染。"}})])])])}},v=m,h=(n("448b"),n("2877")),f=Object(h["a"])(v,o,r,!1,null,null,null);e["default"]=f.exports},"38ed":function(t,e,n){"use strict";n("cf16")},"448b":function(t,e,n){"use strict";n("7884")},"45e6":function(t,e,n){var o={"./Home.vue":"7dc0","./HomeBackground.vue":"d275","./HomeCard.vue":"238e","./MainContent.vue":"7c63","./component.vue":"bbc9"};function r(t){var e=a(t);return n(e)}function a(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=a,t.exports=r,r.id="45e6"},"5fca":function(t,e,n){},"6d8d":function(t,e,n){var o={"./zh-CN/example.md":"ba2e"};function r(t){var e=a(t);return n(e)}function a(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=a,t.exports=r,r.id="6d8d"},7884:function(t,e,n){},"7c63":function(t,e,n){"use strict";n.r(e);n("d81d");var o,r,a=n("8311"),s={components:{},name:"MainContent",data:function(){return{lang:"zh-CN",base:"/component",visible:!1}},mounted:function(){},methods:{onClose:function(){this.visible=!1,console.log(this.visible)},toggleDrawer:function(){this.visible=!this.visible},getMenuItems:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.$createElement,o=a[this.lang];return o.map((function(o){return"group"===o.type?n("a-menu-item-group",{attrs:{title:o.title},key:o.title},[o.children.map((function(n){return t.generateMenuItem(!1,n,e)}))]):t.generateMenuItem(!0,o,e)}))},generateMenuItem:function(t,e,n){n.before,n.after;var o=this.$createElement;return o("a-menu-item",[o("router-link",{attrs:{"active-class":"active",to:this.base+e.path,exact:!0}},[e.title])])}},render:function(){var t=arguments[0];return t("div",{class:"main-wrapper"},[t("a-row",[t("div",{class:"drawer-handle",on:{click:this.toggleDrawer}},[t("a-icon",{attrs:{type:"menu"},class:"drawer-handle-icon"})]),t("a-drawer",{attrs:{placement:"left",closable:!0,visible:this.visible},on:{close:this.onClose}},[t("a-menu",{class:"aside-container menu-site",attrs:{mode:"inline"}},[this.getMenuItems()])]),t("a-col",{attrs:{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24},class:"main-menu"},[t("a-affix",{attrs:{"offset-top":0}},[t("section",{class:"main-menu-inner"},[t("a-menu",{class:"aside-container menu-site",attrs:{mode:"inline"}},[this.getMenuItems()])])])]),t("a-col",{attrs:{xxl:20,xl:19,lg:18,md:18,sm:24,xs:24}},[t("router-view",{class:"main-container"}),"PrevAndNext"])])])}},l=s,i=(n("979b"),n("2877")),c=Object(i["a"])(l,o,r,!1,null,null,null);e["default"]=c.exports},"7c642":function(t,e,n){t.exports=n.p+"img/theme-index-icon.bc7a98c5.svg"},"7dc0":function(t,e,n){"use strict";n.r(e);var o,r,a=n("d275"),s=n("238e"),l={components:{HomeBackground:a["default"],HomeCard:s["default"]},name:"Home",data:function(){return{}},mounted:function(){},methods:{},render:function(){var t=arguments[0];return t("div",{class:"home-container"},[t("div",{class:"home-banner"},[t("home-background"),t("div",{class:"home-banner-holder"},[t("div",{class:"home-banner-content"},[t("div",[t("div",{class:"home-card-logo"},["Vue Code View"])]),t("p",["一个基于 Vue 2，在网页中实时编辑运行代码、预览效果的轻量级代码交互组件。"]),t("div",{class:"home-banner-content-operations"},[t("a-button",{attrs:{type:"primary",shape:"round",size:"large"}},[t("router-link",{attrs:{to:"/component"}},["开始使用"])]),t("a-button",{attrs:{shape:"round",size:"large",ghost:!0}},[t("router-link",{attrs:{to:"/demo"}},["在线示例"])])])])])]),t("div",{style:" max-width: 1256px; margin:  0 auto;"},[t("div",{class:"home-block-content"},[t("home-card")])])])}},i=l,c=(n("c0d1"),n("2877")),d=Object(c["a"])(i,o,r,!1,null,"2df7b6e4",null);e["default"]=d.exports},8311:function(t){t.exports=JSON.parse('{"zh-CN":[{"title":"组件文档","path":"/overview"},{"title":"通用","type":"group","children":[{"path":"/demo2","title":"组件示例"}]}]}')},"90c8":function(t,e,n){},"968a":function(t,e,n){t.exports=n.p+"img/guide.0a8462c7.png"},"979b":function(t,e,n){"use strict";n("5fca")},ba2e:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"content me-doc"},[n("h1",[t._v("组件说明文档")]),n("h2",[t._v("🔧 安装")]),t._m(0),n("h2",[t._v("🔨 配置")]),t._m(1),t._m(2),t._m(3),t._m(4),n("h2",[t._v("💻 示例")]),n("h3",[t._v("🎬 基础示例")]),t._m(5),n("demo-block",[n("template",{slot:"source"},[n("code-viewer",{attrs:{source:t.vcv0}})],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n  <div id="app">\n    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />\n    <h1>Welcome to Vue.js {{version}} !</h1> \n  </div>\n</template>\n<script>\nexport default {\n    data() {\n      return {\n        version: \'2.x\'\n      };\n    },\n  };\n<\/script>\n\n<style> \n.logo {\n  width:30px;\n}\n\nh1{\n  color:red;\n}\n</style> \n')])])])],2),t._m(6),t._m(7),n("demo-block",[n("template",{slot:"source"},[n("code-viewer",{attrs:{source:t.vcv1}})],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n  <div id="app"> \n    <h1>Welcome to Vue.js !</h1> \n    <div class="second">scss support!</div>\n  </div>\n</template> \n<style>  \nh1{\n  color:blue;\n}\n</style> \n<style lang=\'scss\' > \n$primary-color: #409EFF; \n\n.second{ \n  color: $primary-color;\n}\n</style>\n')])])])],2),n("h3",[t._v("🎬 组件库混合使用")]),t._m(8),n("demo-block",[n("template",{slot:"source"},[n("code-viewer",{attrs:{source:t.vcv2}})],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n  <div id="app"> \n    <div>element 2.x</div> \n    <el-row class="row">\n      <el-button>默认按钮</el-button>\n      <el-button type="primary">主要按钮</el-button>\n      <el-button type="success">成功按钮</el-button>\n      <el-button type="info">信息按钮</el-button>\n      <el-button type="warning">警告按钮</el-button>\n      <el-button type="danger">危险按钮</el-button>\n    </el-row>\n\n\n    <el-row class="row">\n      <el-button icon="el-icon-search" circle></el-button>\n      <el-button type="primary" icon="el-icon-edit" circle></el-button>\n      <el-button type="success" icon="el-icon-check" circle></el-button>\n      <el-button type="info" icon="el-icon-message" circle></el-button>\n      <el-button type="warning" icon="el-icon-star-off" circle></el-button>\n      <el-button type="danger" icon="el-icon-delete" circle></el-button>\n    </el-row>\n    <div>Ant Design of Vue 1.x</div> \n    <div class="row">\n      <a-button type="primary">\n        Primary\n      </a-button>\n      <a-button>Default</a-button>\n      <a-button type="dashed">\n        Dashed\n      </a-button>\n      <a-button type="danger">\n        Danger\n      </a-button>\n      <a-config-provider :auto-insert-space-in-button="false">\n        <a-button type="primary">\n          按钮\n        </a-button>\n      </a-config-provider>\n      <a-button type="primary">\n        按钮\n      </a-button>\n      <a-button type="link">\n        Link\n      </a-button>\n    </div>\n    <div class="row">\n      <a-button type="primary" loading>\n        Loading\n      </a-button>\n      <a-button type="primary" size="small" loading>\n        Loading\n      </a-button> \n      <a-button type="primary" :loading="loading" @mouseenter="enterLoading">\n        mouseenter me!\n      </a-button>\n      <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">\n        延迟1s\n      </a-button> \n      <a-button type="primary" loading />\n      <a-button type="primary" shape="circle" loading />\n      <a-button type="danger" shape="round" loading />\n    </div>\n  </div>\n</template> \n<script>\nexport default {\n  data() {\n    return {\n      loading: false,\n      iconLoading: false,\n    };\n  },\n  methods: {\n    enterLoading() {\n      this.loading = true;\n    },\n    enterIconLoading() {\n      this.iconLoading = { delay: 1000 };\n    },\n  },\n};\n<\/script> \n<style> \n.row {\n  padding:12px;\n} \n</style> \n')])])])],2),n("h3",[t._v("🎬 组件嵌套引用")]),n("demo-block",[n("div",[n("p",[n("code",[t._v("MD")]),t._v("文档中组件嵌套示例，示例代码中引用组件.")])]),n("template",{slot:"source"},[n("code-viewer",{attrs:{source:t.vcv3}})],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n  <div id="app">\n    <code-viewer :source="code_example"></code-viewer>\n  </div>\n</template>\n<script>\n  export default {\n    data() {\n      return {\n        code_example: ` \n<template>\n  <div id="app">\n    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />\n    <h1>Welcome to Vue.js {{version}} !</h1> \n  </div>\n</template>\n<script>\nexport default {\n    data() {\n      return {\n        version: \'2.x\'\n      };\n    },\n  };\n<\\\\/script>\n\n<style> \n.logo {\n  width:66px;\n}\n</style> `,\n      };\n    },\n  };\n<\/script>\n')])])])],2),t._m(9),t._m(10),t._m(11),n("h3",[t._v("🎬 renderToolbar 自定义工具栏")]),t._m(12),n("h3",[t._v("🎬 errorHandler 自定义错误处理函数")]),t._m(13),n("h2",[t._v("API")]),n("h3",[t._v("📃 Attributes")]),t._m(14),n("h3",[t._v("📃 Slot")]),t._m(15),n("h3",[t._v("📃 Events")]),t._m(16),n("h2",[t._v("🎬 codesandbox 在线示例")]),n("iframe",{staticStyle:{width:"100%",height:"500px",border:"0","border-radius":"4px",overflow:"hidden"},attrs:{src:"https://codesandbox.io/embed/vue-code-view-example-forked-nivmw?fontsize=14&hidenavigation=1&theme=dark",title:"vue-code-view-example (forked)",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}}),n("h2",[t._v("License")]),t._m(17),n("p",[t._v("Copyright (c) 2021-present Andurils")])],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-bash"},[t._v("npm i vue-code-view\n# or\nyarn add vue-code-view\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("使用"),n("code",[t._v("vue cli")]),t._v("需要在"),n("code",[t._v("vue.config.js")]),t._v("文件进行配置，支持使用包含运行时编译器的 Vue 构建版本。")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-javascript"},[t._v('module.exports = {\n  runtimeCompiler: true,\n  // or\n  chainWebpack: (config) => { \n    config.resolve.alias\n      .set("vue$", "vue/dist/vue.esm.js");\n  },\n}; \n')])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("入口文件 "),n("code",[t._v("main.js")]),t._v(" 中引入组件及样式。")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-javascript"},[t._v('import Vue from "vue";\nimport App from "./App.vue";\nimport CodeView from "vue-code-view";\n\nimport "vue-code-view/lib/vue-code-viewer.css";\nVue.use(CodeView);\n\nnew Vue({\n  router,\n  store,\n  render: (h) => h(App),\n}).$mount("#app");\n')])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tip"},[n("p",[n("code",[t._v("Markdown")]),t._v(" 中的代码可以运行，支持在线编辑并预览效果。支持代码高亮。 组件默认提供了代码切换按钮和背景透明切换按钮。")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",[t._v("🎬 "),n("code",[t._v("<style>")]),t._v(" 支持")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tip"},[n("p",[t._v("组件支持样式 "),n("code",[t._v("<style>")]),t._v(" 实时解析，预处理目前尽支持 "),n("code",[t._v("SASS")]),t._v(" 。每个组件的样式彼此隔离。")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tip"},[n("p",[t._v("项目引入其他组件库后，组件的示例源代码中直接使用即可，实现预览调试功能。")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",[t._v("🎬 "),n("code",[t._v("JSX")]),t._v("使用方式")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tip"},[n("p",[t._v("组件暂不支持 "),n("code",[t._v("JSX")]),t._v(" 语法。")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v('<script>\nconst code_example = `<template>\n  <div id="app">\n    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />\n    <h1>Welcome to Vue.js  !</h1>\n  </div>\n</template> `;\n\nexport default {\n  name: "demo",\n  render() {\n    return (\n      <div >\n        <code-viewer source={code_example}\n          showCode={false}\n        ></code-viewer>\n      </div>\n    );\n  },\n};\n<\/script>\n')])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-jsx"},[t._v('render() {\n  return (\n    <div >\n      <code-viewer\n        source={code_example}\n        showCode={false}\n        renderToolbar={(CodeButton) => {\n          return (\n            <div>\n              {CodeButton}\n              <a-tooltip>\n                <template slot="title">jsx renderToolbar</template>\n                <a-button type="primary" shape="circle" icon="search" />\n              </a-tooltip>\n            </div>\n          );\n        }}\n      ></code-viewer>\n    </div>\n  );\n},\n')])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-jsx"},[t._v('render() {\n  return (\n    <div >\n      <code-viewer\n        source={code_example}\n        showCode={false}\n        errorHandler={(errorMsg) => {\n          this.$notify.error({\n            title: "Info",\n            message: errorMsg,\n          });\n        }}\n      ></code-viewer>\n    </div>\n  )\n}\n')])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("说明")]),n("th",[t._v("类型")]),n("th",[t._v("默认值")]),n("th",[t._v("版本")])])]),n("tbody",[n("tr",[n("td",[t._v("theme")]),n("td",[t._v("theme mode,支持 light / dark")]),n("td",[n("code",[t._v("light")]),t._v(" | "),n("code",[t._v("dark")])]),n("td",[n("code",[t._v("dark")])]),n("td")]),n("tr",[n("td",[t._v("showCode")]),n("td",[t._v("是否显示代码编辑器")]),n("td",[t._v("boolean")]),n("td",[t._v("false")]),n("td")]),n("tr",[n("td",[t._v("source")]),n("td",[t._v("示例代码")]),n("td",[t._v("string")]),n("td",[t._v("-")]),n("td")]),n("tr",[n("td",[t._v("renderToolbar")]),n("td",[t._v("自定义工具栏展示")]),n("td",[t._v("function")]),n("td",[t._v("-")]),n("td")]),n("tr",[n("td",[t._v("errorHandler")]),n("td",[t._v("错误处理函数")]),n("td",[t._v("function")]),n("td",[t._v("-")]),n("td")]),n("tr",[n("td",[t._v("debounceDelay")]),n("td",[t._v("错误处理防抖延迟(ms)")]),n("td",[t._v("number")]),n("td",[t._v("300")]),n("td")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",[t._v("name")]),n("th",[t._v("说明")])])]),n("tbody",[n("tr",[n("td",[t._v("暂无")]),n("td",[t._v("暂无")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",[t._v("事件名称")]),n("th",[t._v("说明")]),n("th",[t._v("回调参数")])])]),n("tbody",[n("tr",[n("td",[t._v("暂无")]),n("td",[t._v("暂无")]),n("td",[t._v("—")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("a",{attrs:{href:"./LICENSE"}},[t._v("MIT")])])}],a={name:"component-doc",data:function(){return{vcv0:' <template>\n  <div id="app">\n    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />\n    <h1>Welcome to Vue.js {{version}} !</h1> \n  </div>\n</template>\n<script>\nexport default {\n    data() {\n      return {\n        version: \'2.x\'\n      };\n    },\n  };\n<\/script>\n\n<style> \n.logo {\n  width:30px;\n}\n\nh1{\n  color:red;\n}\n</style> \n',vcv1:' <template>\n  <div id="app"> \n    <h1>Welcome to Vue.js !</h1> \n    <div class="second">scss support!</div>\n  </div>\n</template> \n<style>  \nh1{\n  color:blue;\n}\n</style> \n<style lang=\'scss\' > \n$primary-color: #409EFF; \n\n.second{ \n  color: $primary-color;\n}\n</style>\n',vcv2:' <template>\n  <div id="app"> \n    <div>element 2.x</div> \n    <el-row class="row">\n      <el-button>默认按钮</el-button>\n      <el-button type="primary">主要按钮</el-button>\n      <el-button type="success">成功按钮</el-button>\n      <el-button type="info">信息按钮</el-button>\n      <el-button type="warning">警告按钮</el-button>\n      <el-button type="danger">危险按钮</el-button>\n    </el-row>\n\n\n    <el-row class="row">\n      <el-button icon="el-icon-search" circle></el-button>\n      <el-button type="primary" icon="el-icon-edit" circle></el-button>\n      <el-button type="success" icon="el-icon-check" circle></el-button>\n      <el-button type="info" icon="el-icon-message" circle></el-button>\n      <el-button type="warning" icon="el-icon-star-off" circle></el-button>\n      <el-button type="danger" icon="el-icon-delete" circle></el-button>\n    </el-row>\n    <div>Ant Design of Vue 1.x</div> \n    <div class="row">\n      <a-button type="primary">\n        Primary\n      </a-button>\n      <a-button>Default</a-button>\n      <a-button type="dashed">\n        Dashed\n      </a-button>\n      <a-button type="danger">\n        Danger\n      </a-button>\n      <a-config-provider :auto-insert-space-in-button="false">\n        <a-button type="primary">\n          按钮\n        </a-button>\n      </a-config-provider>\n      <a-button type="primary">\n        按钮\n      </a-button>\n      <a-button type="link">\n        Link\n      </a-button>\n    </div>\n    <div class="row">\n      <a-button type="primary" loading>\n        Loading\n      </a-button>\n      <a-button type="primary" size="small" loading>\n        Loading\n      </a-button> \n      <a-button type="primary" :loading="loading" @mouseenter="enterLoading">\n        mouseenter me!\n      </a-button>\n      <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">\n        延迟1s\n      </a-button> \n      <a-button type="primary" loading />\n      <a-button type="primary" shape="circle" loading />\n      <a-button type="danger" shape="round" loading />\n    </div>\n  </div>\n</template> \n<script>\nexport default {\n  data() {\n    return {\n      loading: false,\n      iconLoading: false,\n    };\n  },\n  methods: {\n    enterLoading() {\n      this.loading = true;\n    },\n    enterIconLoading() {\n      this.iconLoading = { delay: 1000 };\n    },\n  },\n};\n<\/script> \n<style> \n.row {\n  padding:12px;\n} \n</style> \n',vcv3:' <template>\n  <div id="app">\n    <code-viewer :source="code_example"></code-viewer>\n  </div>\n</template>\n<script>\n  export default {\n    data() {\n      return {\n        code_example: <--backticks--\x3e \n<template>\n  <div id="app">\n    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />\n    <h1>Welcome to Vue.js {{version}} !</h1> \n  </div>\n</template>\n<script>\nexport default {\n    data() {\n      return {\n        version: \'2.x\'\n      };\n    },\n  };\n<\\/script>\n\n<style> \n.logo {\n  width:66px;\n}\n</style> <--backticks--\x3e,\n      };\n    },\n  };\n<\/script>\n'}}},s=a,l=n("2877"),i=Object(l["a"])(s,o,r,!1,null,null,null);e["default"]=i.exports},bbc9:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-scrollbar",{ref:"componentScrollBar",staticClass:"page-component__scroll"},[n("div",{staticClass:"page-container page-component"},[n("el-scrollbar",{staticClass:"page-component__nav"},[n("side-nav",{attrs:{data:t.navsData[t.lang],base:"/component"}})],1),n("div",{staticClass:"page-component__content"},[n("router-view",{staticClass:"content"}),n("footer-nav")],1),t.showBackToTop?n("el-backtop",{attrs:{target:".page-component__scroll .el-scrollbar__wrap",right:100,bottom:150}}):t._e()],1)])},r=[],a=(n("ac1f"),n("00b4"),n("a15b"),n("a434"),n("1276"),n("d3b7"),n("159b"),n("fb6a"),n("466d"),n("589e")),s=n("0e42"),l=n("9d32"),i={data:function(){return{lang:"zh-CN",navsData:s,scrollTop:0,showHeader:!0,componentScrollBar:null,componentScrollBoxElement:null}},watch:{"$route.path":function(){var t=this;this.componentScrollBox.scrollTop=0,this.$nextTick((function(){t.componentScrollBar.update()}))}},methods:{renderAnchorHref:function(){if(!/changelog/g.test(location.href)){var t=document.querySelectorAll("h2 a,h3 a,h4 a,h5 a"),e=location.href.split("#").splice(0,2).join("#");[].slice.call(t).forEach((function(t){var n=t.getAttribute("href");t.href=e+n}))}},goAnchor:function(){var t=this;if(location.href.match(/#/g).length>1){var e=location.href.match(/#[^#]+$/g);if(!e)return;var n=document.querySelector(e[0]);if(!n)return;setTimeout((function(e){t.componentScrollBox.scrollTop=n.offsetTop}),50)}},handleScroll:function(){var t=this.componentScrollBox.scrollTop;this.showHeader!==this.scrollTop>t&&(this.showHeader=this.scrollTop>t),0===t&&(this.showHeader=!0),this.navFaded||a["a"].$emit("fadeNav"),this.scrollTop=t}},computed:{showBackToTop:function(){return!this.$route.path.match(/backtop/)}},created:function(){var t=this;a["a"].$on("navFade",(function(e){t.navFaded=e}))},mounted:function(){this.componentScrollBar=this.$refs.componentScrollBar,this.componentScrollBox=this.componentScrollBar.$el.querySelector(".el-scrollbar__wrap"),this.throttledScrollHandler=Object(l["b"])(300,this.handleScroll),this.componentScrollBox.addEventListener("scroll",this.throttledScrollHandler),this.renderAnchorHref(),this.goAnchor(),document.body.classList.add("is-component")},destroyed:function(){document.body.classList.remove("is-component")},beforeDestroy:function(){this.componentScrollBox.removeEventListener("scroll",this.throttledScrollHandler)},beforeRouteUpdate:function(t,e,n){var o=this;n(),setTimeout((function(){var n=t.path,r=e.path;n===r&&t.hash&&o.goAnchor(),n!==r&&(document.documentElement.scrollTop=document.body.scrollTop=0,o.renderAnchorHref())}),100)}},c=i,d=(n("cc3f"),n("2877")),u=Object(d["a"])(c,o,r,!1,null,null,null);e["default"]=u.exports},c0d1:function(t,e,n){"use strict";n("d325")},cc3f:function(t,e,n){"use strict";n("90c8")},cf16:function(t,e,n){},d275:function(t,e,n){"use strict";n.r(e);var o,r,a={name:"HomeBackground",render:function(){var t=arguments[0];return t("div",{class:"home-banner-background"},[t("svg",{attrs:{viewBox:"0 0 1440 448"}},[t("g",{attrs:{transform:"translate(383.99167402202, 1.252051729629045)",opacity:"1",frame:"229"}},[t("g",{attrs:{transform:"matrix(1, 0, 0, 1, 0, 0)"}},[t("g",{attrs:{transform:"rotate(0, 170, 170)"}},[t("svg",[t("defs",[t("filter",{attrs:{id:"banner-circle-shadow-1"}},[t("feDropShadow",{attrs:{dx:"10",dy:"10",stdDeviation:"10","flood-color":"rgba(0,0,0,0.05)"}})]),t("linearGradient",{attrs:{id:"banner-circle-fill-1",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[t("stop",{attrs:{offset:"0%"},style:"stop-color: rgb(250, 252, 254);"}),t("stop",{attrs:{offset:"100%"},style:"stop-color: rgb(249, 252, 254);"})])]),t("circle",{attrs:{cx:"170",cy:"170",r:"140",fill:"url(#banner-circle-fill-1)",filter:"url(#banner-circle-shadow-1)"}})])])])]),t("g",{attrs:{transform:"translate(-228.8319531820249, 245.92621751702052)",opacity:"1",frame:"229"}},[t("g",{attrs:{transform:"matrix(1, 0, 0, 1, 0, 0)"}},[t("g",{attrs:{transform:"rotate(0, 230, 230)"}},[t("svg",[t("defs",[t("filter",{attrs:{id:"banner-circle-shadow-2"}},[t("feDropShadow",{attrs:{dx:"10",dy:"10",stdDeviation:"10","flood-color":"rgba(0,0,0,0.05)"}})]),t("linearGradient",{attrs:{id:"banner-circle-fill-2",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[t("stop",{attrs:{offset:"0%"},style:"stop-color: rgb(250, 252, 254);"}),t("stop",{attrs:{offset:"50%"},style:"stop-color: rgb(243, 249, 252);"})])]),t("circle",{attrs:{cx:"230",cy:"230",r:"200",fill:"url(#banner-circle-fill-2)",filter:"url(#banner-circle-shadow-2)"}})])])])]),t("g",{attrs:{transform:"translate(1236.5303493156114, 171.9203576351686)",opacity:"1",frame:"229"}},[t("g",{attrs:{transform:"matrix(1, 0, 0, 1, 0, 0)"}},[t("g",{attrs:{transform:"rotate(0, 120, 120)"}},[t("svg",[t("defs",[t("filter",{attrs:{id:"banner-rect-shadow-1"}},[t("feDropShadow",{attrs:{dx:"10",dy:"10",stdDeviation:"10","flood-color":"rgba(0,0,0,0.05)"}})]),t("linearGradient",{attrs:{id:"banner-rect-fill-1",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[t("stop",{attrs:{offset:"25%"},style:"stop-color: rgb(248, 252, 255);"}),t("stop",{attrs:{offset:"100%"},style:"stop-color: rgb(248, 251, 255);"})])]),t("rect",{attrs:{x:"30",y:"30",width:"180",height:"180",fill:"url(#banner-rect-fill-1)",filter:"url(#banner-rect-shadow-1)"}})])])])]),t("g",{attrs:{transform:"translate(641.5665296322315, -670.7941867687358)",opacity:"1",frame:"229"}},[t("g",{attrs:{transform:"matrix(1, 0, 0, 1, 0, 0)"}},[t("g",{attrs:{transform:"rotate(0, 430, 430)"}},[t("svg",{attrs:{width:"860",height:"860"}},[t("defs",[t("filter",{attrs:{id:"banner-diamond-shadow-1"}},[t("feDropShadow",{attrs:{dx:"10",dy:"10",stdDeviation:"10","flood-color":"rgba(0,0,0,0.05)"}})]),t("linearGradient",{attrs:{id:"banner-diamond-fill-1",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[t("stop",{attrs:{offset:"60%"},style:"stop-color: rgb(252, 253, 255);"}),t("stop",{attrs:{offset:"100%"},style:"stop-color: rgb(252, 253, 254);"})])]),t("path",{attrs:{d:"M 30 430 430 30 830 430 430 830 Z",fill:"url(#banner-diamond-fill-1)",filter:"url(#banner-diamond-shadow-1)"}})])])])])])])}},s=a,l=(n("38ed"),n("2877")),i=Object(l["a"])(s,o,r,!1,null,"5e11f935",null);e["default"]=i.exports},d325:function(t,e,n){},f82c:function(t,e,n){t.exports=n.p+"img/component.bd3411b9.png"}}]);