<script>
import CodeEditor from "./code-editor.vue";
import MeButton from "./button.vue";
import { toggleClass } from "../utils/DOMhelper";
import { parseComponent } from "../utils/sfcParser/parser";
import { genStyleInjectionCode } from "../utils/sfcParser/styleInjection";
import Tooltip from "./tooltip";
// import { hashCode } from "../utils/util";
// 字体图标
import "../fonts/iconfont.css";

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
    MeButton,
    Tooltip,
  },
  props: {
    theme: { type: String, default: "dark" }, //light
    showCode: { type: Boolean, default: false },
    source: { type: String },
  },
  data() {
    return {
      className: ["vue-code-viewer", "vue-app"], // page className
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
    handleChangeTransparent() {
      toggleClass(this.$refs.codeViewer, "vue-code-transparent");
    },
    handleCodeChange(val) {
      console.log(parseComponent(val));

      this.code = val;
      this.dyShow = false;
      // let componentId = hashCode(this.$dayjs().valueOf().toString());

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
      // id="${componentId}"
      demoComponentExport.template = `
            <section class="vue-page-container"   >
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

    const dynamicComponent = this.currentTab.component;

    return (
      <div class={className} ref="codeViewer">
        <div class="code-view-wrapper">
          {/* --------- renderExample this.renderExample()  --------- */}
          <div class="code-view">
            {this.dyShow && <dynamicComponent></dynamicComponent>}
          </div>
          {/* --------- toolbar   --------- */}
          <div class="code-view-toolbar">
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
