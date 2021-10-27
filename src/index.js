import CodeViewer from "./src/code-viewer.vue";

CodeViewer.install = function (Vue) {
  Vue.component(CodeViewer.name, CodeViewer);
};

export default CodeViewer;
