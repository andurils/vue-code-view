<script>
import classNames from "classnames";
import CodeEditor from "@/codemirror/CodeMirror.vue";
import OutputDemo from "../output/Output.vue";
import { toggleClass } from "../utils/DOMhelper";
import { isEmpty, generateId } from "../utils/util";
import { useDebounceFn } from "@vueuse/core";
import SplitPane from "./SplitPane.vue";

// import "normalize.css";
import "@examples/styles/index.css";

export default {
  name: "CodeViewer",
  provide: function () {
    return {
      vcv: this, // 组件实例
      viewId: this.viewId,
      handleShowCode: this.handleShowCode,
      handleChangeTransparent: this.handleChangeTransparent,
      code: this.code,
      changView: this.changView,
      errorHandler: this.errorHandler,
      showCode: !this.isVertical || this.showCodeEditor,
      themeMode: this.themeMode,
      needAutoResize: this.needAutoResize,
    };
  },
  components: {
    CodeEditor,
    OutputDemo,
    SplitPane,
  },
  props: {
    source: { type: String },
    themeMode: { type: String }, // light||dark，默认 light
    // autoResize: { type: Boolean, default: true },
    showCode: { type: Boolean, default: false },
    // renderToolbar: { type: Function },
    errorHandler: { type: Function },
    needAutoResize: { type: Boolean, default: true },
    debounceDelay: {
      type: Number,
      default: 300,
    },
    // view 布局  output所在位置
    layout: {
      type: String,
      default: "top",
      validator(val) {
        return ["top", "right", "left"].indexOf(val) > -1;
      },
    },
    height: {
      type: Number,
    },
    // maxHeight: {
    //   type: Number,
    // },
    minHeight: {
      type: Number,
      default: 300, // PX
    },
  },
  data() {
    return {
      id: this._uid,
      viewId: `vcv-${generateId()}`,
      layoutName: "top",
      code: ``,
      rootNames: ["vue-repl"],
      showCodeEditor: this.showCode,
    };
  },

  created() {
    this.onChangeHandler = useDebounceFn(this.handleCodeChange, 250);
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!isEmpty(this.source)) {
        // md-loader   模板字符串中 嵌套 模板字符串
        const souceCode = this.source.replace(/<--backticks-->/g, "\u0060");
        this.handleCodeChange(souceCode);
      }
      // ex 源码内容为空！！
      this.layoutName = this.layout;
    },
    // 更新 code 内容
    handleCodeChange(val) {
      // console.log("code change!");
      this.code = val;
    },

    // 组件代码编辑器展示 废弃
    handleShowCode() {
      this.showCodeEditor = !this.showCodeEditor;
    },
    // 组件演示背景透明切换
    handleChangeTransparent() {
      toggleClass(this.$refs.vcv, "vue-code-transparent");
    },
    // 布局切换
    onDockHandler(e) {
      this.layoutName = e;
    },
    // 组件代码编辑器展示
    onCodeShowHandler(showState) {
      this.showCodeEditor = showState;
    },
  },
  computed: {
    viewLayout() {
      return ["top", "right", "left"].indexOf(this.layoutName) > -1
        ? this.layoutName
        : "top";
    },
    isVertical() {
      return this.viewLayout === "top";
    },
    editorSlot() {
      return this.viewLayout == "right" ? "left" : "right";
    },
    outputSlot() {
      return this.viewLayout == "right" ? "right" : "left";
    },
    calcHeight() {
      let heightSetting = ` `;
      if (!isEmpty(this.height) && this.height >= 0) {
        let vcvHeight =
          this.height <= this.minHeight ? this.minHeight : this.height;
        heightSetting += ` height:${vcvHeight}px;`;
      }
      return heightSetting;
    },
  },
  render() {
    const { viewId, rootNames } = this;
    return (
      <div
        ref="vcv"
        class={classNames(rootNames, this.themeMode, `${viewId}`)}
        style={this.calcHeight}
      >
        <SplitPane layout={this.isVertical}>
          {/*-- output render  --*/}
          <template slot={this.outputSlot}>
            <OutputDemo
              sourceCode={this.code}
              style={this.calcHeight}
              onDock={this.onDockHandler}
              onCodeshow={this.onCodeShowHandler}
            ></OutputDemo>
          </template>

          {/*-- code editor   --*/}
          <template slot={this.editorSlot}>
            {(!this.isVertical || this.showCodeEditor) && (
              <div class="editor-container">
                <CodeEditor
                  line-numbers
                  value={this.code}
                  onChange={this.onChangeHandler}
                />
              </div>
            )}
          </template>
        </SplitPane>
      </div>
    );
  },
};
</script>

<style>
.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --bg-device: rgb(233, 236, 239);

  --border: #ddd;
  /* --text-light: #888; */
  --text-light: rgba(60, 60, 60, 1);
  --font-code: Menlo, Monaco, Consolas, "Courier New", monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 32px;
  --border-hover: rgb(180, 180, 180);
  --border-hover-shadow: rgba(180, 180, 180, 0.2);

  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: var(--bg-soft);

  height: 100%;
  border: 1px solid var(--border);
  border-radius: 4px;
  /* transition: 0.3s linear border-color; */
  transition: box-shadow 0.2s ease-out;
}

.dark .vue-repl {
  --bg: #1a1a1a;
  --bg-soft: #242424;
  --bg-device: rgb(45, 45, 45);
  --border: #383838;
  /* --text-light: #aaa; */
  --text-light: rgba(252, 252, 252, 1);
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
  --border-hover: rgb(9, 96, 189);
  --border-hover-shadow: rgb(9, 96, 189, 0.2);
}

.vue-repl:hover {
  border: 1px solid var(--border-hover);
  box-shadow: 0 0 0 2px var(--border-hover-shadow);
}

.editor-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.vcv-icon {
  font-size: 14px;
  color: var(--text-light);
}
</style>
