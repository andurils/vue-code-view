<script setup lang="ts">
// import Repl from './Repl.vue'
import CodeMirror from './codemirror/CodeMirror.vue'
import { Console } from 'console';
const onChange = () => {
  console.log('onChange')
}

</script>

<template>
  <div class="editor-container">
    <CodeMirror @change="onChange" :value="'<div>xxxxxx</div>'" :mode="'htmlmixed'" />
  </div>
</template> 

<style scoped>
.editor-container {
  /* height: calc(100% - var(--header-height)); */
  width: 600px;
  height: 600px;
}
</style>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
