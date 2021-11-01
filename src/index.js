import CodeViewer from "./src/code-viewer.vue";
import locale from "./locale";

CodeViewer.install = function (Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.component(CodeViewer.name, CodeViewer);
};

export default CodeViewer;
