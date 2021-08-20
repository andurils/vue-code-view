/* eslint-disable vue/no-unused-components */
<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>
<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/seti.css";
import "codemirror/mode/javascript/javascript";

export default {
  name: "CodeEditor",
  props: {
    value: { type: String },
    readOnly: { type: Boolean },
    code: { type: String },
    theme: { type: String, default: "default" },
    matchBrackets: { type: Boolean, default: true },
    lineNumbers: { type: Boolean },
    lineWrapping: { type: Boolean },
    tabSize: { type: Number, default: 2 },
    onChange: { type: Function },
  },
  data() {
    return {
      jsonEditor: false,
    };
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue();
      if (value !== editorValue) {
        // this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
        this.jsonEditor.setValue(this.value);
      }
    },
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: "application/json",
      gutters: ["CodeMirror-lint-markers"],
      theme: "seti",
      lint: true,
      // lineNumbers,
      // lineWrapping,
      // matchBrackets,
      // tabSize,
      // theme,
    });

    this.jsonEditor.setValue(this.value);
    this.jsonEditor.on("change", (cm) => {
      // this.$emit("changed", cm.getValue());
      this.$emit("change", cm.getValue());
      // this.$emit("input", cm.getValue());
    });
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue();
    },
  },
};
</script>

<style scoped>
.json-editor {
  height: calc(100vh - 600px);
  min-height: 400px;
  line-height: 20px;
}
.json-editor >>> .CodeMirror {
  height: 100%;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
