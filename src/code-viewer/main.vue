<script>
import classNames from "classnames";
import CodeEditor from "@/codemirror/CodeMirror.vue";
import Output from "@/output/Output.vue";
import { toggleClass } from "../utils/DOMhelper";
import { isEmpty, generateId } from "../utils/util";
import { debounce } from "throttle-debounce";
import Locale from "../mixins/locale";
import OutputContainer from "./output-container.vue";
import Toolbar from "./toolbar.vue";
import SplitPane from "./SplitPane.vue";

// 字体图标
import "../fonts/iconfont.css";
import "../styles/tooltip.css";

export default {
  name: "CodeViewer",
  mixins: [Locale],
  provide: function () {
    return {
      viewId: this.viewId,
      handleShowCode: this.handleShowCode,
      handleChangeTransparent: this.handleChangeTransparent,
      code: this.code,
      changView: this.changView,
      errorHandler: this.errorHandler,
      // needAutoResize: this.needAutoResize,
    };
  },
  components: {
    CodeEditor,
    Output,
    OutputContainer,
    Toolbar,
    SplitPane,
  },
  props: {
    source: { type: String },
    theme: { type: String, default: "dark" }, // light||dark
    showCode: { type: Boolean, default: false },
    // renderToolbar: { type: Function },
    errorHandler: { type: Function },
    // needAutoResize: { type: Boolean, default: true },
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
    maxHeight: {
      type: Number,
    },
  },
  data() {
    return {
      id: this._uid,
      viewId: `vcv-${generateId()}`,
      layoutName: "top",
      minHeight: 200, // px
      code: ``,
      className: ["vue-repl", "code-view-root"],
      showCodeEditor: this.showCode,
    };
  },

  created() {
    this.onChangeHandler = debounce(250, this.handleCodeChange);
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
      this.code = val;
      console.log("code change");
    },

    // 组件代码编辑器展示
    handleShowCode() {
      this.showCodeEditor = !this.showCodeEditor;
    },
    // 组件演示背景透明切换
    handleChangeTransparent() {
      toggleClass(this.$refs.vcv, "vue-code-transparent");
    },

    changView(e) {
      this.layoutName = e;
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
    viewHeight() {
      return this.height <= this.minHeight ? this.minHeight : this.height;
    },
    calcHeight() {
      let heightSetting = `min-height:${this.minHeight}px;`;

      // height 设置后，maxHeight 设置无效。
      if (!isEmpty(this.height) && this.height >= 0) {
        let tmpHeight =
          this.height <= this.minHeight ? this.minHeight : this.height;
        heightSetting += ` height:${tmpHeight}px;`;
      } else if (!isEmpty(this.maxHeight)) {
        let tmpMaxheight =
          this.maxHeight <= this.minHeight ? this.minHeight : this.maxHeight;
        heightSetting += ` max-height:${tmpMaxheight}px;`;
      }
      return heightSetting;
    },
  },
  render() {
    const { viewId, className } = this;

    return (
      <div class={classNames(`${viewId}`, className, "dark1")} ref="vcv">
        <SplitPane class="code-view-wrapper" isVertical={this.isVertical}>
          {/*-- example render  --*/}
          <template slot={this.outputSlot}>
            <div class="code-view dSNpeq" style={this.calcHeight}>
              {/*-- toolbar  --*/}
              <Toolbar></Toolbar>
              {/*-- result-box   --*/}
              <OutputContainer code={this.code}></OutputContainer>
            </div>
          </template>

          {/*-- code editor   --*/}
          <template slot={this.editorSlot}>
            {(!this.isVertical || this.showCodeEditor) && (
              <div class="editor-container" style={this.calcHeight}>
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

<style lang="scss">
$code-view-wrapper-border-color: #f1f1f1;

.code-view-wrapper {
  // position: absolute;
  // width: 100%;
  // height: 100%;
  // display: flex;
  // margin: 18px 0;
  // padding: 0;
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  border-radius: 4px;
  transition: 0.3s linear border-color;

  &:hover {
    border: 1px dashed #3498ff;
  }

  // .code-view {
  //   position: relative;
  //   display: flex;
  //   overflow: hidden;
  // }
  .code-view-error {
    padding: 18px;
    color: red;
    max-height: 200px;
  }

  .code-view-toolbar {
    padding: 8px;
    border-color: $code-view-wrapper-border-color;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #fafafa;
    border-bottom: 1px solid #eaeefb;

    > .icon {
      font-size: 16px;
    }
  }
}

// 背景透明
.vue-code-transparent .code-view {
  background-image: linear-gradient(
      45deg,
      rgb(249, 249, 250) 25%,
      transparent 25%
    ),
    linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%),
    linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
  background-size: 20px 20px;
  background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
}

.dSNpeq {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, "Courier New", monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 38px;

  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: var(--bg-soft);

  height: 100%;
}

.dark .vue-repl {
  --bg: #1a1a1a;
  --bg-soft: #242424;
  --border: #383838;
  --text-light: #aaa;
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
}

.editor-container {
  // height: calc(100% - var(--header-height));
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
