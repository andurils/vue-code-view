<script>
import CodeEditor from "./code-editor.vue";
import { parseComponent } from "../utils/sfcParser/parser";
import { genStyleInjectionCode } from "../utils/sfcParser/styleInjection";
import { hashCode } from "../utils/util";

// 动态组件 用于绑定组件选项对象
var tabs = [
  {
    name: "Home",
    component: {
      template: "<div>Home component</div>",
    },
  },
];

export default {
  name: "CodeViewer",
  components: {
    CodeEditor,
  },
  provide() {
    return {
      // vueCodeView: this,
    };
  },
  props: {
    theme: { type: String, default: "dark" }, //light
    showCode: { type: Boolean, default: false },
    source: { type: String },
  },
  data() {
    return {
      className: ["page-container", "app"], // page className
      currentTab: tabs[0],
      dyShow: true,

      buttonClassName: "",
      beforeHTML: "beforeHTML",
      afterHTML: "afterHTML",
      // code: code,
      hasError: false,
      errorMessage: null,

      showCodeEditor: this.showCode,
      showCodeIcon: {},
      delay: 10000, // ms  用于节流函数参数
      CID: "123456789",
    };
  },
  mounted() {
    this.handleCodeChange(this.source);
  },
  computed: {},
  methods: {
    handleShowCode() {
      this.showCodeEditor = !this.showCodeEditor;
    },
    handleCodeChange(val) {
      console.log(parseComponent(val));

      this.code = val;
      this.dyShow = false;
      let componentId = hashCode(this.$dayjs().valueOf().toString());

      const demoComponentExport = {};
      let scriptCode = ``;
      let templateCode = ``;
      // let styleCode = ``;

      // SFC 解析输出 SFC Descriptor Object
      const sfcDescriptor = parseComponent(this.code);
      templateCode = sfcDescriptor.template.content.trim();
      scriptCode = sfcDescriptor.script.content.trim();
      const { styleCode } = genStyleInjectionCode(sfcDescriptor.styles);
      // 构建组件
      // script内容
      scriptCode = scriptCode.trim();
      if (scriptCode) {
        scriptCode = scriptCode.replace(
          /export\s+default/,
          "demoComponentExport ="
        );
      }
      // console.log(sfcDescriptor);
      eval(scriptCode);
      console.log(demoComponentExport);
      demoComponentExport.template = `
            <section class="vue-page-container"  id="${componentId}" >
              ${templateCode}
            </section>
        `;

      // beforeMount  动态创建样式style
      // https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js
      demoComponentExport.beforeMount = function () {
        var hasDocument = typeof document !== "undefined";
        var head =
          hasDocument &&
          (document.head || document.getElementsByTagName("head")[0]);

        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        styleElement.innerHTML = `${styleCode} `;
        head.appendChild(styleElement);
      };

      this.currentTab = {
        name: "Home",
        component: demoComponentExport,
      };

      this.dyShow = true;
    },
  },

  render() {
    const {
      className,
      // showCodeIcon,
      renderToolbar,
      theme,
    } = this;

    const showCodeIcon = [
      "icon",
      "iconfont",
      this.showCodeEditor ? "icon-codelibrary" : "icon-code",
    ];

    const showCodeButton = (
      <i class={showCodeIcon} on-click={this.handleShowCode}></i>
    );

    const dynamicComponent = this.currentTab.component;
    // 移除样式 class={`doc-code ${this.showCode ? "show" : ""}`}
    return (
      <div class={className}>
        <div class="code-view-wrapper">
          {/* --------- renderExample this.renderExample()  --------- */}
          <div class="code-view">
            {this.dyShow && <dynamicComponent></dynamicComponent>}
          </div>
          {/* --------- toolbar   --------- */}
          <div class="code-view-toolbar">
            {renderToolbar ? renderToolbar(showCodeButton) : showCodeButton}
          </div>
          {/* --------- CodeEditor   --------- */}
          {this.showCodeEditor && (
            <CodeEditor
              lineNumbers
              onChange={this.handleCodeChange}
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
$code-view-wrapper-bg: #f4f5f7;
$primary-color: #3498ff;

.code-view-wrapper {
  position: relative;
  margin: 18px 0;
  padding: 0;
  border: 1px dashed #f1f1f1;

  border-color: $code-view-wrapper-border-color;
  background-color: $code-view-wrapper-bg;
  border-radius: 4px;
  transition: 0.3s linear border-color;

  &:hover {
    border: 1px dashed $primary-color;
  }

  .code-view {
    padding: 18px;
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
</style>
