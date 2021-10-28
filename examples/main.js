import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import CodeViewer from "@src";
// import CodeViewer from "vue-code-view";
import demoBlock from "./components/demo-block";
import Antd from "ant-design-vue";
import ElementUI from "element-ui";
// 语法高亮
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

import "ant-design-vue/dist/antd.css";
import "element-ui/lib/theme-chalk/index.css";
import "github-markdown-dracula-css/github-markdown.css";
import "@assets/styles/common.scss";

Vue.config.productionTip = false;
// 引入组件 element 2.x
Vue.use(ElementUI);
// 引入组件 antd vue 1.x
Vue.use(Antd);
Vue.use(CodeViewer);
Vue.component("demo-block", demoBlock);

router.afterEach((route) => {
  Vue.nextTick(() => {
    // Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    // hljs.configure({ useBR: true });
    const blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
