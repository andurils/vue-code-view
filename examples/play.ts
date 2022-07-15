import Vue from "vue";
import App from "@examples/play/index.vue";
import CodeViewer from "@/index";

Vue.config.productionTip = false;
Vue.use(CodeViewer);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
