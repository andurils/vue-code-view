<template>
  <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import * as monaco from "monaco-editor";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "./userWorker";

export interface Props {
  mode?: string;
  value?: string;
  readonly?: boolean;
  theme?: string;
  // lineNumbers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "html", // html css  json  typescript  or  [basic-languages]
  value: "",
  readonly: false,
  theme: "dark",
  // lineNumbers: true,
});

const needAutoResize: Boolean = inject("autoresize") as Boolean;

const emit = defineEmits<(e: "change", value: string) => void>();
const el = ref();
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(() => {
  const defaultEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
    {
      fontSize: 14,
      formatOnPaste: true,
      scrollBeyondLastLine: false,
      codeLens: true,
      wordWrap: "bounded",
      showFoldingControls: "mouseover",
      minimap: {
        enabled: true,
      },
    };

  editor = monaco.editor.create(el.value, {
    value: "", // 内容
    language: "html", // 语言
    readOnly: props.readonly, // 只读
    automaticLayout: needAutoResize.valueOf(), // 自动调整大小
    theme: props.theme === "dark" ? "monokai" : "chrome-devtools", // 主题
    ...defaultEditorOptions,
  });

  editor.onDidChangeModelContent(() => {
    emit("change", editor?.getValue() || "");
  });

  watchEffect(() => {
    const cur = editor?.getValue();
    if (props.value !== cur) {
      editor?.setValue(props.value);
    }
  });
});

onBeforeUnmount(() => {
  editor?.dispose();
});
</script>

<style scoped>
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
