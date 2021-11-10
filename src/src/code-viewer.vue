<script>
import CodeEditor from "./code-editor.vue";
import Tooltip from "./tooltip";
import MeButton from "./button.vue";
import { debounce } from "throttle-debounce";
import { toggleClass } from "../utils/DOMhelper";
import { parseComponent } from "../utils/sfcParser/parser";
import { genStyleInjectionCode } from "../utils/sfcParser/styleInjection";
import { isEmpty, extend, generateId } from "../utils/util";
import { addStylesClient } from "../utils/style-loader/addStylesClient";
import Locale from "../mixins/locale";
// 字体图标
import "../fonts/iconfont.css";
import "../styles/tooltip.css";

export default {
  name: "CodeViewer",
  mixins: [Locale],
  components: {
    CodeEditor,
    MeButton,
    Tooltip,
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
  },
  data() {
    return {
      id: this._uid,
      code: ``,
      className: ["vue-code-viewer", "vue-app"], // page className
      dynamicComponent: {
        component: {
          template: "<div>Hello Vue.js!</div>",
        },
      },
      hasError: false,
      errorMessage: null,
      showCodeEditor: this.showCode,
      showCodeIcon: {},
    };
  },
  created() {
    this.viewId = `vcv-${generateId()}`; // vue-code-view => vcv
    this.debounceErrorHandler = debounce(this.debounceDelay, this.errorHandler);

    // this.update = debounce(this.debounceDelay, addStylesClient(this.viewId, {}));
    this.stylesUpdateHandler = addStylesClient(this.viewId, {});
  },
  mounted() {
    this._initialize();
  },
  methods: {
    // 初始化
    _initialize() {
      // md-loader 用于静态示例展示处理  模板字符串 嵌套 模板字符串 情况特殊处理，
      if (!isEmpty(this.source)) {
        this.source = this.source.replace(/<--backticks-->/g, "\u0060");
      }
      // 传入初始值赋值  prop.source=>code
      this.handleCodeChange(this.source);
    },

    genComponent() {
      const { template, script, styles, customBlocks, errors } =
        this.sfcDescriptor;

      // console.log(this.sfcDescriptor);

      const templateCode = template ? template.content.trim() : ``;
      let scriptCode = script ? script.content.trim() : ``;
      const styleCodes = genStyleInjectionCode(styles, this.viewId);

      // 构建组件
      const demoComponent = {};

      // 组件 script
      if (!isEmpty(scriptCode)) {
        const componentScript = {};
        scriptCode = scriptCode.replace(
          /export\s+default/,
          "componentScript ="
        );
        eval(scriptCode);
        extend(demoComponent, componentScript);
      }

      // 组件 template
      // id="${componentId}"
      demoComponent.template = `<section id="${this.viewId}" class="result-box" >
        ${templateCode}
      </section>`;

      // 组件 style
      // https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js
      this.stylesUpdateHandler(styleCodes);

      // 组件内容更新
      extend(this.dynamicComponent, {
        name: this.viewId,
        component: demoComponent,
      });
    },
    // 组件代码编辑器展示
    handleShowCode() {
      this.showCodeEditor = !this.showCodeEditor;
    },
    // 组件演示背景透明切换
    handleChangeTransparent() {
      toggleClass(this.$refs.codeViewer, "vue-code-transparent");
    },
    // 更新 code 内容
    handleCodeChange(val) {
      this.code = val;
    },

    renderPreview() {
      const { hasError, errorMessage } = this;
      // <div>{this.initialExample ? this.initialExample : <div>Loading...</div>}</div>
      if (hasError) {
        return <pre class="code-view-error">{errorMessage}</pre>;
      }

      const renderComponent = this.dynamicComponent.component;

      return (
        <div class="code-view zoom-1">
          <renderComponent></renderComponent>
        </div>
      );
    },
    // 代码检查
    codeLint() {
      // 校验代码是否为空
      this.hasError = this.isCodeEmpty;
      this.errorMessage = this.isCodeEmpty
        ? this.t("el.error.emptyCode")
        : null;
      // 代码为空 跳出检查
      if (this.isCodeEmpty) return;

      // 校验代码是否存在<template>
      const { template } = this.sfcDescriptor;
      const templateCode =
        template && template.content ? template.content.trim() : ``;
      const isTemplateEmpty = isEmpty(templateCode);

      this.hasError = isTemplateEmpty;
      this.errorMessage = isTemplateEmpty
        ? this.t("el.error.noTemplate")
        : null;
      // 代码为空 跳出检查
      if (this.isTemplateEmpty) return;
    },
    defaultButtonRender(showCodeButton, showTransparentButton) {
      return (
        <div>
          {showCodeButton} {showTransparentButton}
        </div>
      );
    },
  },
  computed: {
    // SFC Descriptor Object
    sfcDescriptor: function () {
      return parseComponent(this.code);
    },
    // 代码是否为空
    isCodeEmpty: function () {
      return !(this.code && !isEmpty(this.code.trim()));
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    code(newSource, oldSource) {
      this.codeLint();
      // 错误事件处理
      this.hasError &&
        this.errorHandler &&
        this.debounceErrorHandler(this.errorMessage);

      if (!this.hasError) this.genComponent();
    },
  },

  render() {
    // console.log(this.t("el.codebutton.text"));
    // console.log(this.t("el.transparentbutton.text"));
    const { className, renderToolbar, theme } = this;
    const showCodeButton = (
      <Tooltip
        class="item"
        effect="dark"
        content={this.t("el.codebutton.text")}
        placement="top"
      >
        <me-button
          icon="code"
          size="xs"
          circle
          onClick={this.handleShowCode}
        ></me-button>
      </Tooltip>
    );
    const showTransparentButton = (
      <Tooltip
        class="item"
        effect="dark"
        content={this.t("el.transparentbutton.text")}
        placement="top"
      >
        <me-button
          icon="transparent"
          size="xs"
          circle
          onClick={this.handleChangeTransparent}
        ></me-button>
      </Tooltip>
    );
    return (
      <div class={className} ref="codeViewer">
        <div class="code-view-wrapper">
          {/* --------- renderExample  --------- */}
          {this.renderPreview()}
          {/* --------- toolbar   --------- */}
          <div class="code-view-toolbar">
            {renderToolbar
              ? renderToolbar(showCodeButton, showTransparentButton)
              : this.defaultButtonRender(showCodeButton, showTransparentButton)}
          </div>
          {/* --------- CodeEditor   --------- */}
          {this.showCodeEditor && (
            <CodeEditor
              lineNumbers
              codeHandler={this.handleCodeChange}
              theme={`base16-${theme}`}
              value={this.code}
            />
          )}
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss">
$code-view-wrapper-border-color: #f1f1f1;
$code-view-wrapper-bg: #ffffff;
$primary-color: #3498ff;

.code-view-wrapper {
  position: relative;
  margin: 18px 0;
  padding: 0;
  // border: 1px dashed #f1f1f1;
  border: 1px solid #ebebeb;

  border-color: $code-view-wrapper-border-color;
  background-color: $code-view-wrapper-bg;
  border-radius: 4px;
  transition: 0.3s linear border-color;

  &:hover {
    border: 1px dashed $primary-color;
  }

  .code-view {
    padding: 18px;
    // &:after {
    //   position: absolute;
    //   top: 18px;
    //   left: 18px;
    //   font-size: 12px;
    //   font-weight: 300;
    //   color: #959595;
    //   text-transform: uppercase;
    //   letter-spacing: 1px;
    // }
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
}

// CodeMirror
.CodeMirror {
  text-align: left;
  padding: 10px;
  // margin: 10px 0;
  height: auto !important;
  pre {
    padding: 0 20px;
  }
}

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

// codepen
// https://v3.cn.vuejs.org/guide/introduction.html#%E7%BB%84%E4%BB%B6%E5%8C%96%E5%BA%94%E7%94%A8%E6%9E%84%E5%BB%BA
// #result-box iframe {
//     width: 100%;
//     height: 100%;
//     border: none;
//     background: var(--cp-color-1);
//     overflow: auto;
//     -webkit-overflow-scrolling: touch;
//     -webkit-transform-origin: 0 0;
//     transform-origin: 0 0
// }

// #result-box iframe::-webkit-scrollbar {
//     width: .5em;
//     height: .5em
// }

// #result-box iframe::-webkit-scrollbar-thumb {
//     background: rgba(0,0,0,.5)
// }

// #result-box iframe::-webkit-scrollbar-track {
//     background: 0 0
// }

// #result-box.zoom-1 iframe {
//     width: 100%!important;
//     height: 100%!important
// }

// #result-box.zoom-05 iframe {
//     width: 200%!important;
//     height: 200%!important;
//     -webkit-transform: scale(.5);
//     transform: scale(.5)
// }

// #result-box.zoom-025 iframe {
//     width: 400%!important;
//     height: 400%!important;
//     -webkit-transform: scale(.25);
//     transform: scale(.25)
// }
</style>

<style lang="scss">
// @import "../styles/tooltip.scss";
//
</style>
