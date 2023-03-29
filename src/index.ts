import CodeViewer from "./vcv/Repl.vue";

const install = function (Vue: any) {
  // Vue.component(CodeViewer.name, CodeViewer);
  Vue.component("CodeViewer", CodeViewer);
};

// CDN 引入
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// export { default as Repl } from "./vcv/Repl.vue";
// export { default as Preview } from "./output/Preview.vue";
// export { ReplStore, File } from "./store";
// export { compileFile } from "./transform";
// // export type { Props as ReplProps } from "./vcv/Repl.vue";
// export type { Store, StoreOptions, SFCOptions, StoreState } from "./store";
// export type { OutputModes } from "./output/types";

export default {
  install,
};
