<script setup lang="ts">
import FileSelector from "./FileSelector.vue";
import MonacoEditor from "../monaco/MonacoEditor.vue";
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
  <div class="editor-wrapper">
    <FileSelector />
    <div class="editor-container">
      <MonacoEditor @change="onChange" :value="store.state.activeFile.code" :mode="activeMode" />
      <Message :err="store.state.errors[0]" />
    </div>
  </div>
</template>

<style scoped>
.editor-wrapper {
  height: 100%;
  width: 100%;
}

.editor-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>
