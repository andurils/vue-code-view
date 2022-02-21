<template>
  <div>
    <div class="tab-buttons">
      <button
        v-for="(m, index) of outputModes"
        :class="{ active: mode === m }"
        @click="mode = m"
        :key="index"
      >
        <span>{{ m }}</span>
      </button>
    </div>

    <div class="output-container">
      <Preview :show="mode === 'preview'" v-if="mode === 'preview'" />
      <CodeMirror
        v-if="mode !== 'preview'"
        read-only
        :mode="mode === 'css' ? 'css' : 'javascript'"
        :value="mode"
      />
    </div>
  </div>
</template>
<script>
import Preview from "./Preview.vue";
import CodeMirror from "@/codemirror/CodeMirror.vue";

export default {
  components: {
    Preview,
    CodeMirror,
  },
  data() {
    return {
      outputModes: ["preview", "js", "css", "ssr"],
      mode: "preview",
    };
  },
};
</script>
<style scoped>
button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}

.output-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}

.tab-buttons {
  box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  height: var(--header-height);
  overflow: hidden;
}
.tab-buttons button {
  padding: 0;
  box-sizing: border-box;
}
.tab-buttons span {
  font-size: 13px;
  font-family: var(--font-code);
  text-transform: uppercase;
  color: var(--text-light);
  display: inline-block;
  padding: 8px 16px 6px;
  line-height: 20px;
}
button.active {
  color: var(--color-branding-dark);
  border-bottom: 3px solid var(--color-branding-dark);
}
</style>
