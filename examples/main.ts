import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "@examples/router";
import CodeViewer from "@/index";
import { PiniaVuePlugin } from "pinia";
import { store } from "@examples/store";

// 语法高亮
import hljs from "highlight.js";

// 网站页面 模板页面组件
import DemoBlock from "@examples/components/DemoBlock.vue";

// 公共样式
import "@assets/styles/index.scss";
// highlight主题
import "highlight.js/styles/a11y-dark.css";

import "normalize.css";
import "@examples/styles/index.css";

Vue.config.productionTip = false;
// Vue.use(VueCompostionAPI);
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin);
// Vue.use(VueI18n);
Vue.use(CodeViewer); // 国际化配置 Vue.use(CodeViewer, { locale });

Vue.component("demo-block", DemoBlock);

// const pinia = createPinia();
// pinia.use(createPersistedState()); //开启缓存，存储在localstorage

const router = new VueRouter({
  mode: "history", // 'hash' | 'history'
  base: process.env.BASE_URL,
  // base: __dirname,
  routes,
});

router.afterEach((route) => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  });
});

// 项目创建应用实例 初始化配置
const app = new Vue({
  router,
  pinia: store,
  render: (h) => h(App),
});
app.$mount("#app");
