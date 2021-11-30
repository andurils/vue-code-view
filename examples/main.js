import Vue from "vue";
import App from "@examples/App.vue";
// import router from "@/router";
import store from "@examples/store";

import VueRouter from "vue-router";
// 路由配置
import routes from "@examples/router";

// 组件引入
import CodeViewer from "@/index";
// 国际化语言
import locale from "@/locale/lang/en";

// UI组件库引入
import Antd from "ant-design-vue";
import ElementUI from "element-ui";
// 语法高亮
import hljs from "highlight.js";

// 网站页面 模板页面组件
import MainFooter from "./components/footer";
import MainHeader from "./components/header";
import FooterNav from "./components/footer-nav";
import demoBlock from "./components/demo-block";

// UI组件库样式引入
import "ant-design-vue/dist/antd.css";
import "element-ui/lib/theme-chalk/index.css";
// 响应式布局断点的隐藏
import "element-ui/lib/theme-chalk/display.css";

// 公共样式
import "@assets/styles/index.scss";
// highlight主题
import "highlight.js/styles/a11y-dark.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(CodeViewer, { locale }); // 国际化配置

// 引入组件 element 2.x
Vue.use(ElementUI);
// 引入组件 antd vue 1.x
Vue.use(Antd);

Vue.component("demo-block", demoBlock);
Vue.component("main-footer", MainFooter);
Vue.component("main-header", MainHeader);
Vue.component("footer-nav", FooterNav);

const router = new VueRouter({
  mode: "hash", // 'hash' | 'history'
  base: process.env.BASE_URL,
  // base: __dirname,
  routes,
});

router.afterEach((route) => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  });
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
