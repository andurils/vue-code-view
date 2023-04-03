<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FileSelector from "./FileSelector.vue";
import CodeMirror from "../codemirror/CodeMirror.vue";
import MonacoEditor from "../monaco/MonacoEditor.vue";
import Message from "../Message.vue";
import { debounce } from "../utils";
import { computed, inject } from "vue";
import { Store } from "../store";

const store = inject("store") as Store;
const editor = inject("editor") as String;
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

const activeMonacoMode = computed(() => {
  const { filename } = store.state.activeFile;

  if (filename.endsWith(".json")) {
    return 'json';
  }
  if (filename.endsWith(".css") || filename.endsWith(".scss") || filename.endsWith(".less")) {
    return 'css';
  }
  if (filename.endsWith(".html") || filename.endsWith(".htm") || filename.endsWith(".vue")) {
    return 'html';
  }
  if (filename.endsWith(".ts") || filename.endsWith(".tsx")) {
    return 'typescript';
  }
  if (filename.endsWith(".js") || filename.endsWith(".jsx")) {
    return 'javascript';
  }
  return 'html';
});

</script>

<template>
  <div class="editor">
    <FileSelector />
    <div class="editor-container">
      <MonacoEditor @change="onChange" :value="store.state.activeFile.code" :mode="activeMonacoMode"
        v-if="editor == 'monaco'" />
      <CodeMirror @change="onChange" :value="store.state.activeFile.code" :mode="activeMode" v-else />
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
