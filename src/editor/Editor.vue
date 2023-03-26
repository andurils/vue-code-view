<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FileSelector from "./FileSelector.vue";
import CodeMirror from "../codemirror/CodeMirror.vue";
// import Message from "../Message.vue";
import { debounce } from "../utils";
import { computed, inject, ref } from "vue";
import { Store } from "../store";

// const store = inject("store") as Store;

const welcomeCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim();
const codeSource = ref(welcomeCode);

const onChange = debounce((code: string) => {
  // store.state.activeFile.code = code;
  console.log("code", code);
  codeSource.value = code;
}, 250);

const activeMode = computed(() => {
  // const { filename } = store.state.activeFile;
  const filename = "App.vue ";
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
    <!-- :value="store.state.activeFile.code" -->
    <div class="editor-container">
      <CodeMirror @change="onChange" :value="codeSource" :mode="activeMode" />
      <!-- <Message :err="store.state.errors[0]" /> -->
    </div>
    <FileSelector />
  </div>
</template>

<style scoped>
.editor-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>
