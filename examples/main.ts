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

// 语法高亮
import hljs from "highlight.js";

// highlight主题
import "highlight.js/styles/a11y-dark.css";

import "normalize.css";
import "@examples/styles/index.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(CodeViewer);
Vue.component("demo-block", DemoBlock);

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
