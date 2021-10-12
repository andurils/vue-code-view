<template>
  <div class="code-editor">
    <textarea ref="codeContainer" />
  </div>
</template>

<script>
// import { codModes } from "../utils/config.js";
// 引入核心
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

// 主题 theme style
import "codemirror/theme/blackboard.css";

// 语言 mode
import "codemirror/mode/vue/vue";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

// 括号/标签 匹配自动关闭
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/indent-fold";
// import "codemirror/addon/fold/markdown-fold";
// import "codemirror/addon/fold/xml-fold";

// 光标行背景高亮
import "codemirror/addon/selection/active-line";

// 滚动条样式
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";

// // lint
// import "codemirror/addon/lint/lint.css";
// import "codemirror/addon/lint/lint.js";
// import "codemirror/addon/lint/json-lint";
// import "codemirror/addon/lint/css-lint";
// import "codemirror/addon/lint/javascript-lint";

export default {
  name: "CodeEditor",
  props: {
    value: { type: String },
    readOnly: { type: Boolean },
    code: { type: String },
    theme: { type: String, default: "default" },
    matchBrackets: { type: Boolean, default: true },
    lineNumbers: { type: Boolean },
    // lineWrapping: { type: Boolean },
    tabSize: { type: Number, default: 2 },
    // onChange: { type: Function },
  },
  data() {
    return {
      // 编辑器实例
      codeEditor: null,
      // 默认配置
      defaultOptions: {
        //语法高亮  使用 MIME-TYPE   https://codemirror.net/mode/vue/index.html
        mode: "text/x-vue",
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          // "CodeMirror-lint-markers",
        ],
        // lint: true,

        foldGutter: true, // 代码折叠
        lineNumbers: true, //显示行号
        lineWrapping: "wrap", // 长行时文字是换行  换行(wrap)/滚动(scroll)
        styleActiveLine: true, // 高亮选中行
        tabSize: 2, // tab 字符的宽度
        theme: "blackboard", //设置主题
        scrollbarStyle: "simple", // 默认 "null" 不显示  'simple'  内侧 "overlay"外侧

        autoCloseBrackets: true, // 括号自动关闭
        autoCloseTags: true, // 标签自动关闭
        matchTags: true, // 标签匹配
        matchBrackets: true, // 括号匹配
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
    this._initialize();
  },
  methods: {
    // 初始化
    _initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.codeEditor = CodeMirror.fromTextArea(
        this.$refs.codeContainer,
        this.defaultOptions
      );

      this.codeEditor.setValue(this.value);
      this.codeEditor.on("change", (item) => {
        this.$emit("change", item.getValue());
      });
    },
  },
};
</script>

<style scoped>
.code-editor {
  /* height: calc(100vh - 600px); */
  min-height: 400px;
  line-height: 20px;
  /* height: 100%;
  position: relative; */
}
.code-editor >>> .CodeMirror {
  height: 100%;
  min-height: 300px;
  /* height: auto; */
  text-align: left !important;
}
.code-editor >>> .CodeMirror-scroll {
  min-height: 300px;
  /* height: auto;
  overflow-y: hidden;
  overflow-x: auto; */
}
.code-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
