<template>
  <div class="code-editor">
    <textarea ref="codeContainer" />
  </div>
</template>

<script>
// 引入核心
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

// 主题 theme style
import "codemirror/theme/base16-light.css";
import "codemirror/theme/base16-dark.css";

// 语言 mode
import "codemirror/mode/vue/vue";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/jsx/jsx";
// import "codemirror/mode/css/css";

// 括号/标签 匹配自动关闭
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/comment-fold";
// 缩进文件
import "codemirror/addon/fold/indent-fold";
// 光标行背景高亮
import "codemirror/addon/selection/active-line";

// import "codemirror/addon/lint/lint";
// import "codemirror/addon/lint/javascript-lint";
// import "codemirror/addon/lint/json-lint";
// import "codemirror/addon/lint/css-lint";

// 滚动条样式
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";

export default {
  name: "CodeEditor",
  inject: ["handleCodeChange"],
  props: {
    value: { type: String },
    readOnly: { type: Boolean },
    theme: { type: String },
    matchBrackets: { type: Boolean },
    lineNumbers: { type: Boolean },
    lineWrapping: { type: Boolean },
    tabSize: { type: Number },
    codeHandler: { type: Function },
  },
  data() {
    return {
      // 编辑器实例
      codeEditor: null,
      sourceCode: ``,
      // 默认配置
      defaultOptions: {
        mode: "text/x-vue", //语法高亮  使用 MIME-TYPE   https://codemirror.net/mode/vue/index.html
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          // "CodeMirror-lint-markers",
        ],
        // lint: true,
        lineNumbers: this.lineNumbers, //显示行号
        lineWrapping: this.lineWrapping || "wrap", // 长行时文字是换行  换行(wrap)/滚动(scroll)
        styleActiveLine: true, // 高亮选中行
        tabSize: this.tabSize || 2, // tab 字符的宽度
        theme: this.theme || "base16-dark", //设置主题
        scrollbarStyle: "overlay", // 默认 "null" 不显示  'simple'  内侧 "overlay"外侧

        // 编辑器交互优化
        autoCloseBrackets: true, // 括号自动关闭
        autoCloseTags: true, // 标签自动关闭
        matchTags: true, // 标签匹配
        matchBrackets: this.matchBrackets || true, // 括号匹配
        foldGutter: true, // 代码折叠
        readOnly: this.readOnly ? "nocursor" : false, //  boolean|string  “nocursor” 设置只读外，编辑区域还不能获得焦点。
      },
    };
  },
  watch: {
    value(value) {
      const editorValue = this.codeEditor.getValue();
      if (value !== editorValue) {
        this.codeEditor.setValue(this.value);
      }
    },
    immediate: true,
    deep: true,
  },
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.codeEditor = CodeMirror.fromTextArea(
        this.$refs.codeContainer,
        this.defaultOptions
      );

      this.codeEditor.setValue(this.value);

      // this.codeEditor.on("change", (item) => {
      //   this.$emit("change", item.getValue());
      // });
      // 使用 prop function 替换 onChange 事件
      this.codeEditor.on("change", (item) => {
        // this.codeHandler(item.getValue());

        this.handleCodeChange(item.getValue());
      });
    },
  },
};
</script>
