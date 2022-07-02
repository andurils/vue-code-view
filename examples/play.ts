import "normalize.css";
import "@examples/styles/base.css";
import "@examples/styles/variables.css";
import "@examples/styles/vt-switch.css";
import "@examples/styles/vt-switch-appearance.css";

import Vue from "vue";
import App from "@examples/views/Play.vue";

import CodeViewer from "@/index";
// import CodeViewer from "vue-code-view";

Vue.config.productionTip = false;
Vue.use(CodeViewer);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
