<script>
import CodeMirror from "codemirror";
import trim from "lodash/trim";

export default {
  name: "CodeEditor",
  props: {
    readOnly: { type: Boolean },
    code: { type: String },
    theme: { type: String, default: "default" },
    matchBrackets: { type: Boolean, default: true },
    lineNumbers: { type: Boolean },
    lineWrapping: { type: Boolean },
    tabSize: { type: Number, default: 2 },
    onChange: { type: Function },
  },
  created() {
    // this.textareaRef = React.createRef();
  },
  mounted() {
    this.textareaRef(this.$refs.vueref0);
    const {
      lineNumbers,
      lineWrapping,
      matchBrackets,
      tabSize,
      readOnly,
      theme,
    } = this;
    if (CodeMirror === undefined) {
      return;
    }
    this.editor = CodeMirror.fromTextArea(this.textareaRef.current, {
      mode: "jsx",
      lineNumbers,
      lineWrapping,
      matchBrackets,
      tabSize,
      readOnly,
      theme,
    });
    this.editor.on("change", this.handleChange);
  },
  updated() {
    this.textareaRef(this.$refs.vueref0);
    const { readOnly } = this;
    if (readOnly) {
      this.editor.setValue();
    }
  },
  render() {
    const { style, className, code } = this;
    return (
      <div style={style} class={className}>
        <textarea ref="vueref0" defaultValue={trim(code)} />
      </div>
    );
  },
};
</script>

<style scoped lang="scss"></style>
