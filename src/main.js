import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import ElementUI from "element-ui";
import CodeViewer from "@packages/code-viewer";
// import CodeViewer from "vue-code-view";
import { Plugin } from "vue2-storage";
import dayjs from "dayjs";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "element-ui/lib/theme-chalk/index.css";
import "@assets/font_antd/iconfont.css";
import "github-markdown-dracula-css/github-markdown.css";

import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

Vue.config.productionTip = false;
// 引入组件 element 2.x
Vue.use(ElementUI);
// 引入组件 antd vue 1.x
Vue.use(Antd);
Vue.use(CodeViewer);
// 客户端存储  Vue.use(Plugin);
Vue.use(Plugin, {
  prefix: "app_",
});
// 注册实例
Vue.prototype.$dayjs = dayjs;
// 时间过滤器
Vue.filter("filterTime", (value) => {
  return dayjs().to(value);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
