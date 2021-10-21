<script>
import CodeEditor from "./code-editor.vue";
import MeButton from "./button.vue";
import { debounce } from "throttle-debounce";
import { toggleClass } from "../utils/DOMhelper";
import { parseComponent } from "../utils/sfcParser/parser";
import { genStyleInjectionCode } from "../utils/sfcParser/styleInjection";
import Tooltip from "./tooltip";
import { isEmpty, extend } from "../utils/util";
// 字体图标
import "../fonts/iconfont.css";

// 动态组件 用于绑定组件选项对象
var dynamicComponents = [
  {
    name: "Init",
    component: {
      template: "<div>Hello Vue.js!</div>",
    },
  },
];

export default {
  name: "CodeViewer",
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
      code: ``,
      className: ["vue-code-viewer", "vue-app"], // page className
      currentComponent: dynamicComponents[0],
      hasError: false,
      errorMessage: null,
      showCodeEditor: this.showCode,
      showCodeIcon: {},
    };
  },
  mounted() {
    this._initialize();
  },
  methods: {
    // 初始化
    _initialize() {
      this.debounceErrorHandler = debounce(
        this.debounceDelay,
        this.errorHandler
      );
      // 传入初始值赋值  prop.source=>code
      this.handleCodeChange(this.source);
    },
    genComponent() {
      const { template, script, styles, customBlocks, errors } =
        this.sfcDescriptor;

      // console.log(this.sfcDescriptor);

      const templateCode = template ? template.content.trim() : ``;
      let scriptCode = script ? script.content.trim() : ``;
      const { styleCode } = genStyleInjectionCode(styles);

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
      demoComponent.template = `
            <section class="component-wrapper" >
              ${templateCode}
            </section>
        `;

      // 组件 style
      if (!isEmpty(styleCode)) {
        // beforeMount  动态创建样式 style
        // https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js
        demoComponent.beforeMount = function () {
          var hasDocument = typeof document !== "undefined";
          var head =
            hasDocument &&
            (document.head || document.getElementsByTagName("head")[0]);

          var styleElement = document.createElement("style");
          styleElement.type = "text/css";
          styleElement.innerHTML = `${styleCode} `;
          head.appendChild(styleElement);
        };
      }

      this.currentComponent = {
        name: "cv",
        component: demoComponent,
      };
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
      const dynamicComponent = this.currentComponent.component;
      const { hasError, errorMessage } = this;
      // <Preview hasError={hasError} errorMessage={errorMessage} onError={this.handleError}>
      // <div>{this.initialExample ? this.initialExample : <div>Loading...</div>}</div>
      if (hasError) {
        return <pre class="code-view-error">{errorMessage}</pre>;
      }
      return (
        <div class="code-view">
          <dynamicComponent></dynamicComponent>
        </div>
      );
    },
    // 代码检查
    codeLint() {
      // 校验代码是否为空
      this.hasError = this.isCodeEmpty;
      this.errorMessage = this.isCodeEmpty ? "代码不能为空！" : null;
      // 代码为空 跳出检查
      if (this.isCodeEmpty) return;

      // 校验代码是否存在<template>
      const { template } = this.sfcDescriptor;
      const templateCode =
        template && template.content ? template.content.trim() : ``;
      const isTemplateEmpty = isEmpty(templateCode);

      this.hasError = isTemplateEmpty;
      this.errorMessage = isTemplateEmpty
        ? "代码格式错误，不存在 <template> ！"
        : null;
      // 代码为空 跳出检查
      if (this.isTemplateEmpty) return;
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
    const { className, renderToolbar, theme } = this;
    const showCodeButton = (
      <Tooltip
        class="item"
        effect="dark"
        content="Show the source"
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
    return (
      <div class={className} ref="codeViewer">
        <div class="code-view-wrapper">
          {/* --------- renderExample  --------- */}
          {this.renderPreview()}
          {/* --------- toolbar   --------- */}
          <div class="code-view-toolbar">
            {renderToolbar ? renderToolbar(showCodeButton) : showCodeButton}
            {/*
            <Tooltip
              class="item"
              effect="dark"
              content="Show the source"
              placement="top"
            >
              <me-button
                icon="code"
                size="xs"
                circle
                onClick={this.handleShowCode}
              ></me-button>
            </Tooltip>
            <Tooltip
              class="item"
              effect="dark"
              content="Transparent background"
              placement="top"
            >
              <me-button
                icon="transparent"
                size="xs"
                circle
                onClick={this.handleChangeTransparent}
              ></me-button>
            </Tooltip>
            */}
          </div>
          {/* --------- CodeEditor   --------- */}
          {this.showCodeEditor && (
            <CodeEditor
              lineNumbers
              codeHandler={this.handleCodeChange}
              theme={`base16-${theme}`}
              value={this.source}
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
</style>
