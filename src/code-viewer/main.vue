<script>
import classNames from "classnames";
import CodeEditor from "./code-editor.vue";
import { debounce } from "throttle-debounce";
import { toggleClass } from "../utils/DOMhelper";
import { isEmpty, generateId } from "../utils/util";
import Locale from "../mixins/locale";
import OutputContainer from "./output-container.vue";
import Toolbar from "./toolbar.vue";

// 字体图标
import "../fonts/iconfont.css";
import "../styles/tooltip.css";

export default {
  name: "CodeViewer",
  mixins: [Locale],

  components: {
    CodeEditor,
    OutputContainer,
    Toolbar,
  },
  props: {
    theme: { type: String, default: "dark" }, //light
    showCode: { type: Boolean, default: false },
    source: { type: String },
    renderToolbar: { type: Function },
    errorHandler: { type: Function },
    debounceDelay: {
      type: Number,
      default: 300,
    },
    // 布局  output所在位置
    layout: {
      type: String,
      default: "top",
      validator(val) {
        return ["top", "right", "left"].indexOf(val) > -1;
      },
    },
    height: {
      type: Number,
      default: 300,
    },
    min: {
      type: Number,
      default: 10,
    },

    max: {
      type: Number,
      default: 90,
    },
    triggerLength: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      id: this._uid,
      minHeight: 125, // px
      triggerLeftOffset: 0, // 鼠标距滑动器左(顶)侧偏移量
      paneLengthPercent: 50,
      direction: "row",
      layOutName: `layout-${this.layout}`,
      code: ``,
      className: ["vue-code-viewer", "vue-app"], // page className
      showCodeEditor: this.showCode,
      showCodeIcon: {},
    };
  },
  provide: function () {
    return {
      handleShowCode: this.handleShowCode,
      handleChangeTransparent: this.handleChangeTransparent,
      changView: this.changView,
      handleCodeChange: this.handleCodeChange,
    };
  },
  created() {
    // component id, vcv-1
    this.viewId = `vcv-${generateId()}`;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!isEmpty(this.source)) {
        // md-loader 用于静态示例展示处理  模板字符串 嵌套 模板字符串 情况特殊处理，
        const souceCode = this.source.replace(/<--backticks-->/g, "\u0060");

        this.handleCodeChange(souceCode);
      }
      // ex 源码内容为空！！
    },
    // 更新 code 内容
    handleCodeChange(val) {
      this.code = val;
    },

    // 组件代码编辑器展示
    handleShowCode() {
      this.showCodeEditor = !this.showCodeEditor;
    },
    // 组件演示背景透明切换
    handleChangeTransparent() {
      toggleClass(this.$refs.codeViewer, "vue-code-transparent");
    },

    changView(e) {
      this.layOutName = `layout-${e}`;
    },

    // 按下滑动器
    handleMouseDown(e) {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);

      if (this.direction === "row") {
        this.triggerLeftOffset =
          e.pageX - e.srcElement.getBoundingClientRect().left;
      } else {
        this.triggerLeftOffset =
          e.pageY - e.srcElement.getBoundingClientRect().top;
      }

      console.log(e, this.triggerLeftOffset);
    },

    // 按下滑动器后移动鼠标
    handleMouseMove(e) {
      const clientRect = this.$refs.splitPane.getBoundingClientRect();
      let paneLengthPercent = 0;

      if (this.direction === "row") {
        const offset =
          e.pageX -
          clientRect.left -
          this.triggerLeftOffset +
          this.triggerLength / 2;
        paneLengthPercent = (offset / clientRect.width) * 100;
      } else {
        const offset =
          e.pageY -
          clientRect.top -
          this.triggerLeftOffset +
          this.triggerLength / 2;
        paneLengthPercent = (offset / clientRect.height) * 100;
      }

      if (paneLengthPercent < this.min) {
        paneLengthPercent = this.min;
      }
      // if (paneLengthPercent > this.max) {
      //   paneLengthPercent = this.max;
      // }

      this.paneLengthPercent = paneLengthPercent;
      console.log("update:paneLengthPercent", paneLengthPercent);
      // this.$emit("update:paneLengthPercent", paneLengthPercent);
    },

    // 松开滑动器
    handleMouseUp() {
      document.removeEventListener("mousemove", this.handleMouseMove);
    },
  },
  computed: {
    layoutCls: function () {
      let cls = [`${this.layOutName}`];
      if (this.layOutName !== "layout-top") {
        cls.push("layout-side");
      }
      return cls;
    },
    lengthType() {
      return this.direction === "row" ? "width" : "height";
    },
    viewHeight() {
      return this.height <= this.minHeight ? this.minHeight : this.height;
    },
    paneLengthValue() {
      console.log(
        `calc(${this.paneLengthPercent}% - ${this.triggerLength / 2 + "px"})`
      );
      return `calc(${this.paneLengthPercent}% - ${
        this.triggerLength / 2 + "px"
      })`;
    },
  },

  render() {
    const {
      viewId,
      className,
      renderToolbar,
      theme,
      layoutCls,
      lengthType,
      paneLengthValue,
    } = this;

    return (
      <div
        class={classNames(`${viewId}`, className, layoutCls)}
        ref="codeViewer"
      >
        {/*-- component wrapper start --*/}
        <div
          class="code-view-wrapper"
          ref="splitPane"
          style={
            this.layOutName !== "layout-top"
              ? { height: `${this.viewHeight}px` }
              : {}
          }
        >
          {/*-- example render start --*/}
          <div
            class="code-view dSNpeq"
            style={`${lengthType}:${paneLengthValue}`}
          >
            {/*-- toolbar --*/}
            <Toolbar></Toolbar>
            {/*-- result-box --*/}
            <OutputContainer
              code={this.code}
              view-id={viewId}
            ></OutputContainer>
          </div>
          {/*-- example render end --*/}

          {/*-- resizer --*/}
          <div id="resizer" class="resizer" onMousedown={this.handleMouseDown}>
            <span></span>
            <div id="width-readout" class="width-readout"></div>
          </div>

          {/*-- code editor start --*/}
          {this.showCodeEditor && (
            <CodeEditor
              line-numbers
              theme={`base16-${theme}`}
              value={this.code}
            />
          )}
          {/*-- code editor end --*/}
        </div>
        {/*-- component wrapper start --*/}
      </div>
    );
  },
};
</script>

<style lang="scss">
$code-view-wrapper-border-color: #f1f1f1;
$code-view-wrapper-bg: #ffffff;
$primary-color: #3498ff;

// .vue-code-viewer {
//   // min-height: 300px;
// }

.code-view-wrapper {
  // position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  // min-height: 125px;
  margin: 18px 0;
  padding: 0;
  border: 1px solid #ebebeb;

  border-color: $code-view-wrapper-border-color;
  background-color: $code-view-wrapper-bg;
  border-radius: 4px;
  transition: 0.3s linear border-color;

  &:hover {
    border: 1px dashed #3498ff;
  }

  .resizer {
    background: #060606;
    border: solid 1px #2f2f2f;
    box-sizing: border-box;
  }

  .code-view {
    position: relative;
    display: flex;
    overflow: hidden;
  }
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

    > .icon {
      font-size: 16px;
    }
  }

  .code-editor {
    // -webkit-box-flex: 1;
    // -webkit-flex-grow: 1;
    // -ms-flex-positive: 1;

    position: relative;
    display: flex;
    flex-direction: column;

    background: #060606;
    padding-right: 6px;
  }
}

// CodeMirror  default height  300px
.CodeMirror {
  text-align: left;
  // padding: 10px;
  flex-grow: 1;
  // height: 100%;
  // margin: 10px 0;
  // height: auto !important;
  pre {
    padding: 0 20px;
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

// layout

.layout-side {
  // flex-direction: column;
  .resizer {
    height: 100%;
    width: 18px;
    cursor: col-resize;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }
}
.layout-left .resizer,
.layout-right .resizer {
  border-top: none;
  border-bottom: none;
}
// layout-left
.layout-left {
  .code-view {
    flex-grow: 1;
    overflow: hidden;
  }
  .code-editor {
    // -webkit-box-flex: 1;
    // -webkit-flex-grow: 1;
    // -ms-flex-positive: 1;
    // flex-grow: 1;
    position: relative;
  }
}

// layout-right
.layout-right {
  .code-view {
    -webkit-box-ordinal-group: 4;
    -webkit-order: 3;
    -ms-flex-order: 3;
    flex-grow: 1;
    order: 3;
  }
  #resizer {
    -webkit-box-ordinal-group: 3;
    -webkit-order: 2;
    -ms-flex-order: 2;
    order: 2;
  }
}

// layout-top
.layout-top {
  .code-view-wrapper {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .code-view {
    width: 100%;
    // height: 350px;
    min-height: 125px;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  .resizer {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
  .resizer {
    height: 18px;
    cursor: row-resize;
    position: relative;
    z-index: 10;
  }

  .code-editor {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    position: relative;
  }
}

.dSNpeq {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.eqwZsr {
  position: absolute;
  left: 16px;
  z-index: 99;
  display: flex;
  bottom: 44px;
  opacity: 1;
  transition-property: opacity, bottom;
  transition-duration: 300ms;
}
</style>

<style lang="scss">
// @import "../styles/layout.scss";
</style>
