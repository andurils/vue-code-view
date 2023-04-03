<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FileSelector from "./FileSelector.vue";
import CodeMirror from "../codemirror/CodeMirror.vue";
import Monaco from "../monaco-editor/MonacoEditor.vue";
import Message from "../Message.vue";
import { debounce } from "../utils";
import { computed, inject } from "vue";
import { Store } from "../store";

const store = inject("store") as Store;
const onChange = debounce((code: string) => {
  store.state.activeFile.code = code;
}, 250);

const activeMode = computed(() => {
  const { filename } = store.state.activeFile;
  return filename.endsWith(".vue") || filename.endsWith(".html")
    ? "htmlmixed"
    : filename.endsWith(".css")
      ? "css"
      : "javascript";
});
</script>

<template>
  <div class="editor">
    <FileSelector />
    <div class="editor-container">
      <CodeMirror @change="onChange" :value="store.state.activeFile.code" :mode="activeMode" />
      <!-- <Monaco /> -->
      <Message :err="store.state.errors[0]" />
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>