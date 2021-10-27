import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import CodeViewer from "@src";
// import CodeViewer from "vue-code-view";
import demoBlock from "./components/demo-block";
import Antd from "ant-design-vue";
import ElementUI from "element-ui";

import "ant-design-vue/dist/antd.css";
import "element-ui/lib/theme-chalk/index.css";
import "github-markdown-dracula-css/github-markdown.css";

Vue.config.productionTip = false;
// 引入组件 element 2.x
Vue.use(ElementUI);
// 引入组件 antd vue 1.x
Vue.use(Antd);
Vue.use(CodeViewer);
Vue.component("demo-block", demoBlock);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
