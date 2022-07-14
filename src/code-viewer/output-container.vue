<script>
import { debounce } from "throttle-debounce";
import { genStyleInjectionCode } from "../utils/sfcParser/styleInjection";
import { isEmpty, extend } from "../utils/util";
import { addStylesClient } from "../utils/style-loader/addStylesClient";
import Locale from "../mixins/locale";
const compiler = require("vue-template-compiler");

export default {
  name: "OutputContainer",
  mixins: [Locale],
  inject: ["viewId", "errorHandler"],
  props: {
    code: { type: String },
    layout: { type: String },
  },
  data() {
    return {
      dynamicComponent: {
        component: {
          template: "<div>Hello Vue.js!</div>",
        },
      },
      hasError: false,
      errorMessage: null,
      debounceDelay: {
        type: Number,
        default: 300,
      },
    };
  },
  created() {
    // console.log("op created");
    this.debounceErrorHandler = debounce(this.debounceDelay, this.errorHandler);
    this.stylesUpdateHandler = addStylesClient(this.viewId, {});
  },
  mounted() {
    if (!this.isCodeEmpty) {
      this.cprocess();
    }
    // console.log("op mounted");
  },
  methods: {
    cprocess() {
      this.codeLint();
      // 错误事件处理
      this.hasError &&
        this.errorHandler &&
        this.debounceErrorHandler(this.errorMessage);

      if (!this.hasError) this.genComponent();
    },
    async genComponent() {
      const demoComponent = {};
      const { template, script, styles, customBlocks, errors } =
        this.sfcDescriptor;

      // errors
      if (errors && errors.length) {
        console.error(
          `Error compiling template:\n\n` +
            errors.map((e) => `  - ${e}`).join("\n") +
            "\n\n"
        );
      }

      const templateCode = template ? template.content.trim() : ``;
      let scriptCode = script ? script.content.trim() : ``;
      const styleCodes = await genStyleInjectionCode(styles, this.viewId);

      // script
      if (!isEmpty(scriptCode)) {
        let componentScript = {};
        scriptCode = scriptCode.replace(
          /export\s+default/,
          "componentScript ="
        );
        eval(scriptCode);
        // update component's content
        extend(demoComponent, componentScript);
      }

      // template
      demoComponent.template = `<section id="${this.viewId}" class="result-box" >
        ${templateCode}
      </section>`;

      // style
      this.stylesUpdateHandler(styleCodes);

      // update dynamicComponent
      extend(this.dynamicComponent, {
        name: this.viewId,
        component: demoComponent,
      });
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
  },
  computed: {
    // SFC Descriptor Object
    sfcDescriptor: function () {
      return compiler.parseComponent(this.code);
      // return parseComponent(this.code);
    },
    // 代码是否为空
    isCodeEmpty: function () {
      return !(this.code && !isEmpty(this.code.trim()));
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    code(newSource, oldSource) {
      this.cprocess();
    },
  },

  render() {
    const { hasError, errorMessage } = this;

    // console.log(hasError, errorMessage);
    // <div>{this.initialExample ? this.initialExample : <div>Loading...</div>}</div>
    if (hasError) {
      return <pre class="code-view-error">{errorMessage}</pre>;
    }

    const renderComponent = this.dynamicComponent.component;

    return (
      <div class="output-container-ttt zoom-1">
        <div>
          <renderComponent></renderComponent>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.output-container-ttt {
  padding: 8px;
  height: 100%;

  background-color: var(--bg);

  div {
    width: 100%;
    height: 100%;
    border: none;
    background: var(--cp-color-1);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  div::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  div::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
  }

  div::-webkit-scrollbar-track {
    background: 0 0;
  }
}
// codepen zoom
// .zoom-1 div {
//   width: 100% !important;
//   height: 100% !important;
// }

// .zoom-05 div {
//   width: 200% !important;
//   height: 200% !important;
//   -webkit-transform: scale(0.5);
//   transform: scale(0.5);
// }

// .zoom-025 div {
//   width: 400% !important;
//   height: 400% !important;
//   -webkit-transform: scale(0.25);
//   transform: scale(0.25);
// }
</style>
