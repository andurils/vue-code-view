<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    ref="vcv"
    :class="classNames(rootNames, themeMode, viewId)"
    :style="calcHeight"
  >
    <SplitPane :layout="isVertical">
      <!-- output render -->
      <template :slot="outputSlot">
        <OutputDemo
          :sourceCode="code"
          :style="calcHeight"
          @dock="onDockHandler"
          @codeshow="onCodeShowHandler"
        >
        </OutputDemo>
      </template>

      <!-- code editor -->
      <template :slot="editorSlot">
        <div v-if="!isVertical || showCodeEditor" class="editor-container">
          <CodeEditor line-numbers :value="code" @change="onChangeHandler" />
          <!-- <Editor /> -->
        </div>
      </template>
    </SplitPane>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted } from "vue";
import classNames from "classnames";
import CodeEditor from "@/codemirror/CodeMirror.vue";
import OutputDemo from "../output/OutputWrapper.vue";
import { isEmpty, generateId } from "../utils/util";
import { debounce } from "../utils";
import SplitPane from "./SplitPane.vue";
import Editor from "../editor/Editor.vue";

import { Store, ReplStore, SFCOptions } from "../store";

// import { toggleClass } from "../utils/DOMhelper";

export interface Props {
  // store?: Store;
  // autoResize?: boolean;
  // showCompileOutput?: boolean;
  // showImportMap?: boolean;
  // clearConsole?: boolean;
  // sfcOptions?: SFCOptions;
  // layout?: ;
  // ssr?: boolean;

  source: string;
  themeMode?: string; // light||dark，默认 light
  showCode: boolean;
  errorHandler?: Function;
  needAutoResize?: boolean;
  debounceDelay?: number;
  layout: string;
  height?: number;
  minHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  // store: () => new ReplStore(),
  // autoResize: true,
  // showCompileOutput: true,
  // showImportMap: true,
  // clearConsole: true,
  // ssr: false

  showCode: false,
  needAutoResize: true,
  debounceDelay: 300,
  layout: "top",
  minHeight: 300,
});

// const props = defineProps({
//   store: {
//     type: Object as PropType<Store>,
//     default: new ReplStore(),
//   },
//   sfcOptions: {
//     type: Object as PropType<SFCOptions>,
//   },
//   source: { type: String },
//   themeMode: { type: String }, // light||dark，默认 light
//   showCode: { type: Boolean, default: false },
//   errorHandler: { type: Function },
//   needAutoResize: { type: Boolean, default: true },
//   debounceDelay: {
//     type: Number,
//     default: 300,
//   },
//   layout: {
//     type: String,
//     default: "top",
//     validator(val: string) {
//       return ["top", "right", "left"].indexOf(val) > -1;
//     },
//   },
//   height: {
//     type: Number,
//     // default: 300,
//   },
//   minHeight: {
//     type: Number,
//     default: 300,
//   },
// });

const vcv = ref(null);
const rootNames = ["vue-repl"];
const viewId = `vcv-${generateId()}`;
const layoutName = ref(props.layout);
const code = ref("");
const showCodeEditor = ref(props.showCode);

onMounted(() => {
  if (!isEmpty(props.source)) {
    const souceCode = props.source?.replace(/<--backticks-->/g, "\u0060");
    onChangeHandler(souceCode);
  }
});

const onChangeHandler = debounce((val: string) => {
  code.value = val;
}, props.debounceDelay);

// // 组件代码编辑器展示 废弃
// const consthandleShowCode = () => {
//   showCodeEditor.value = !showCodeEditor.value;
// };
// // 组件演示背景透明切换
// const handleChangeTransparent = () => {
//   toggleClass(vcv as unknown as Element, "vue-code-transparent" as string);
// };

// 布局切换
const onDockHandler = (val: string) => {
  layoutName.value = val;
};
// 组件代码编辑器展示
const onCodeShowHandler = (showState: boolean) => {
  showCodeEditor.value = showState;
};

const viewLayout = computed(() =>
  ["top", "right", "left"].indexOf(layoutName.value) > -1
    ? layoutName.value
    : "top"
);
const isVertical = computed(() => viewLayout.value === "top");
const editorSlot = computed(() =>
  viewLayout.value == "right" ? "left" : "right"
);
const outputSlot = computed(() =>
  viewLayout.value == "right" ? "right" : "left"
);
const calcHeight = computed(() => {
  let heightSetting = "";
  if (props.height && props.height >= 0) {
    let vcvHeight =
      props.height <= props.minHeight ? props.minHeight : props.height;
    heightSetting += ` height:${vcvHeight}px;`;
  }
  return heightSetting;
});

// provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
provide("vcv", this);
provide("viewId", viewId);
// provide("handleShowCode", handleShowCode);
// provide("handleChangeTransparent", handleChangeTransparent);
provide("code", code);
// provide("changView", changView);
provide("errorHandler", props.errorHandler);
provide("showCode", isVertical.value || showCodeEditor);
provide("themeMode", props.themeMode);
provide("autoresize", props.needAutoResize);
provide("showCodeEditor", showCodeEditor);
provide("layoutName", layoutName);
provide("store", {});
</script>

<style>
.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --bg-device: rgb(233, 236, 239);

  --border: #ddd;
  /* --text-light: #888; */
  --text-light: rgba(60, 60, 60, 1);
  --font-code: Menlo, Monaco, Consolas, "Courier New", monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 32px;
  --border-hover: rgb(180, 180, 180);
  --border-hover-shadow: rgba(180, 180, 180, 0.2);

  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: var(--bg-soft);

  height: 100%;
  border: 1px solid var(--border);
  border-radius: 4px;
  /* transition: 0.3s linear border-color; */
  transition: box-shadow 0.2s ease-out;
}

.dark .vue-repl {
  --bg: #1a1a1a;
  --bg-soft: #242424;
  --bg-device: rgb(45, 45, 45);
  --border: #383838;
  /* --text-light: #aaa; */
  --text-light: rgba(252, 252, 252, 1);
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
  --border-hover: rgb(9, 96, 189);
  --border-hover-shadow: rgb(9, 96, 189, 0.2);
}

.vue-repl:hover {
  border: 1px solid var(--border-hover);
  box-shadow: 0 0 0 2px var(--border-hover-shadow);
}

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
