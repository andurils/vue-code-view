import CodeViewer from "./vcv/Repl.vue";

const install = function (Vue: any) {
  // Vue.component(CodeViewer.name, CodeViewer);
  Vue.component("CodeViewer", CodeViewer);
};

// CDN 引入
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
