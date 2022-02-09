<template>
  <div class="vue-vcv code-view-root">
    <SplitPane class="code-view-wrapper" :is-vertical="isVertical">
      <template v-slot:[outputSlot]>
        <div class="code-view dSNpeq">
          <Toolbar></Toolbar>
          <OutputContainer :code="code"></OutputContainer>
        </div>
      </template>
      <template v-slot:[editorSlot]>
        <CodeEditor
          line-numbers
          :theme="`base16-${theme}`"
          :value="code"
          v-if="!isVertical || showCodeEditor"
        />
      </template>
    </SplitPane>
  </div>
</template>

<script>
import classNames from "classnames";
import CodeEditor from "./code-editor.vue";
import { toggleClass } from "../utils/DOMhelper";
import { isEmpty, generateId } from "../utils/util";
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
      handleCodeChange: this.handleCodeChange,
      changView: this.changView,
      errorHandler: this.errorHandler,
    };
  },
  components: {
    CodeEditor,
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
      default: 300,
    },
  },
  data() {
    return {
      id: this._uid,
      viewId: `vcv-${generateId()}`,
      layoutName: "top",
      minHeight: 125, // px
      code: ``,
      className: ["code-view-root"],
      showCodeEditor: this.showCode,
    };
  },

  created() {},
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
    },

    // 组件代码编辑器展示
    handleShowCode() {
      this.showCodeEditor = !this.showCodeEditor;
    },
    // 组件演示背景透明切换
    handleChangeTransparent() {
      // toggleClass(this.$refs.codeViewer, "vue-code-transparent");
    },

    changView(e) {
      this.layoutName = e;
      this.code += " 1 ";
      console.log("main view", this.layoutName);
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
    layoutCls: function () {
      let cls = [`${this.viewLayout}`];
      if (this.viewLayout !== "layout-top") {
        cls.push("layout-side");
      }
      return cls;
    },
  },
};
</script>

<style lang="scss">
$code-view-wrapper-border-color: #f1f1f1;
$code-view-wrapper-bg: #ffffff;

.code-view-wrapper {
  // position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  margin: 18px 0;
  padding: 0;
  border: 1px solid #ebebeb;

  // border-color: $code-view-wrapper-border-color;
  background-color: #ffffff;
  border-radius: 4px;
  transition: 0.3s linear border-color;

  &:hover {
    border: 1px dashed #3498ff;
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
    background: #fafafa;
    // border-bottom: 1px solid #eaeefb;

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
  flex-grow: 1;
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

// layout-left
.layout-left {
  .code-view {
    // flex-grow: 1;
    flex: 0 0 40%;
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
    flex-grow: 1;
    flex-shrink: 1;
    order: 1;
  }

  .code-editor {
    flex: 0 0 60%;
  }
}

// layout-top
.layout-top {
  .code-view-wrapper {
    flex-direction: column;
    .code-view-toolbar {
      order: 1;
    }
  }

  .code-view {
    width: 100%;
    // height: 350px;
    min-height: 125px;
    flex-shrink: 0;
  }

  .code-editor {
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
