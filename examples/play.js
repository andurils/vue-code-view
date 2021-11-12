import Vue from "vue";
import App from "@examples/play/index.vue";
import router from "@examples/router";
import store from "@examples/store";

import CodeViewer from "@/index";
// import CodeViewer from "vue-code-view";

import Antd from "ant-design-vue";
import ElementUI from "element-ui";

import "ant-design-vue/dist/antd.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
// 引入组件 element 2.x
Vue.use(ElementUI);
// 引入组件 antd vue 1.x
Vue.use(Antd);
Vue.use(CodeViewer);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
