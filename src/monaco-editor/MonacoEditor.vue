<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, } from "vue";
import * as monaco from "monaco-editor";
import './userWorker';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

const editorRef = ref();
let editor: IStandaloneCodeEditor | null = null;

onMounted(() => {
    editor = monaco.editor.create(editorRef.value, {
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
        language: "typescript",
    });
});

onBeforeUnmount(() => {
    editor?.dispose();
});
</script>
<template>
    <div class="editor" ref="editorRef"></div>
</template>

 

<style scoped>
.editor {
    height: 500px;
}
</style>
