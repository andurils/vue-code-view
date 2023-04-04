<template>
  <div ref="vcv" class="vue-repl">
    <SplitPane :layout="flexDirection">
      <!-- output render -->
      <template :slot="outputSlot">
        <Output :showCompileOutput="props.showCompileOutput" :ssr="!!props.ssr" />
      </template>
      <!-- code editor -->
      <template :slot="editorSlot">
        <Editor />
      </template>
    </SplitPane>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, toRef } from "vue";
import SplitPane from "./SplitPane.vue";
import Editor from "./editor/Editor.vue";
import Output from "./output/Output.vue";
import { Store, ReplStore, SFCOptions } from "./store";

export interface Props {
  store?: Store;
  autoResize?: boolean;
  showCompileOutput?: boolean;
  showImportMap?: boolean;
  clearConsole?: boolean;
  sfcOptions?: SFCOptions;
  layout?: string;
  ssr?: boolean;

}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  showCompileOutput: true,
  showImportMap: true,
  clearConsole: true,
  layout: "left",
  ssr: false,

  // showCode: false,
  // debounceDelay: 300,
  // minHeight: 300,
});

const viewLayout = computed(() =>
  ["top", "right", "left"].indexOf(props.layout) > -1
    ? props.layout
    : "top"
);

const flexDirection = computed(() =>
  viewLayout.value === "top" ? "vertical" : "horizontal"
);
const editorSlot = computed(() =>
  viewLayout.value == "right" ? "left" : "right"
);
const outputSlot = computed(() =>
  viewLayout.value == "right" ? "right" : "left"
);
// const calcHeight = computed(() => {
//   let heightSetting = "";
//   if (props.height && props.height >= 0) {
//     let vcvHeight =
//       props.height <= props.minHeight ? props.minHeight : props.height;
//     heightSetting += ` height:${vcvHeight}px;`;
//   }
//   return heightSetting;
// });


props.store.options = props.sfcOptions;
props.store.init();

// provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
provide("store", props.store);
provide("autoresize", props.autoResize);
provide("import-map", toRef(props, "showImportMap"));
provide("clear-console", toRef(props, "clearConsole"));
</script>

<style scoped>
.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 38px;

  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: var(--bg-soft);

  /* border: 1px solid var(--border);
  border-radius: 4px;*/
  /* transition: 0.3s linear border-color; */
  /* transition: box-shadow 0.2s ease-out;  */
}

.dark .vue-repl {
  --bg: #1a1a1a;
  --bg-soft: #242424;
  --border: #383838;
  --text-light: #aaa;
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
}

:deep(button) {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}

/* .vue-repl:hover {
  border: 1px solid var(--border-hover);
  box-shadow: 0 0 0 2px var(--border-hover-shadow);
} */

.editor-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.vcv-icon {
  font-size: 14px;
  color: var(--text-light);
}
</style>
