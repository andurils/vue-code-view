import Vue from "vue";
import App from "@examples/App.vue";
import store from "@examples/store";
import VueRouter from "vue-router";
// 路由配置
import routes from "@examples/router";
// 组件引入
import CodeViewer from "@/index";
// 网站页面 模板页面组件
import DemoBlock from "@examples/components/DemoBlock.vue";
import OutboundLink from "@examples/components/icons/VCVIconOutboundLink.vue";

import "normalize.css";
import "@examples/styles/index.css";
import "prismjs/themes/prism-tomorrow.css"; // 代码语法高亮

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(CodeViewer);
Vue.component("demo-block", DemoBlock);
Vue.component("OutboundLink", OutboundLink);

const router = new VueRouter({
  mode: "history", // 'hash' | 'history'
  base: process.env.BASE_URL,
  // base: __dirname,
  routes,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
