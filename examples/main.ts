import Vue from "vue";
import App from "@examples/App.vue";
import { PiniaVuePlugin } from "pinia";
import VueRouter from "vue-router";
import routes from "@examples/router";
import { store } from "@examples/store";

import CodeViewer from "@/index"; // 组件引入
import DemoBlock from "@examples/components/DemoBlock.vue"; // 网站页面 模板页面组件
import OutboundLink from "@examples/components/icons/VCVIconOutboundLink.vue"; // Markdown link

// 样式
import "normalize.css";
import "@examples/styles/index.css";
import "prismjs/themes/prism-tomorrow.css"; // 代码语法高亮

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin);
Vue.use(CodeViewer);
// 全局组件注册
Vue.component("demo-block", DemoBlock);
Vue.component("OutboundLink", OutboundLink);

const router = new VueRouter({
  mode: "hash", // 'hash' | 'history'
  base: process.env.BASE_URL,
  // base: __dirname,
  routes,
});

new Vue({
  router,
  pinia: store,
  render: (h) => h(App),
}).$mount("#app");
