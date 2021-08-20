<script>
import CodeEditor from "./components/CodeEditor.vue";

var tabs = [
  {
    name: "Home",
    component: {
      template: "<div>Home component</div>",
    },
  },
];

export default {
  name: "App",
  components: {
    CodeEditor,
  },
  // props: {
  //   theme: { type: Object, default: light },
  //   classPrefix: { type: String },
  //   delay: { type: Number },
  //   showCode: { type: Boolean },
  //   source: { type: String },
  //   children: { type: String },
  //   dependencies: { type: Object },
  //   babelTransformOptions: {
  //     type: Object,
  //     default: {
  //       presets: ["stage-0", "react", "es2015"],
  //     },
  //   },
  //   buttonClassName: { type: String },
  //   showCodeIcon: { type: Object },
  //   renderToolbar: { type: Function },
  // },
  data() {
    return {
      currentTab: tabs[0],
      dyShow: true,
      showCodeIcon: {},
      buttonClassName: "",
      beforeHTML: "beforeHTML",
      afterHTML: "afterHTML",
      // code: code,
      hasError: false,
      errorMessage: null,
      showCode: true,
      code: `<el-button icon="el-icon-search" circle></el-button>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>`,
    };
  },
  methods: {
    handleShowCode() {
      this.showCode = !this.showCode;
    },
    handleCodeChange(val) {
      this.dyShow = false;
      console.log(val);
      console.log("stripTemplate", this.stripTemplate(val));
      console.log("stripScript", this.stripScript(val));
      this.currentTab.template = this.stripTemplate(val);

      this.currentTab = {
        name: "Home",
        component: {
          template: `${this.stripTemplate(val)}`,
        },
      };
      this.dyShow = true;
    },
    // 获取 <script> 标签中的文本内容
    stripScript(content) {
      const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : "";
    },

    // 获取 <style> 标签中的文本内容
    stripStyle(content) {
      const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : "";
    },

    // 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
    stripTemplate(content) {
      content = content.trim();
      if (!content) {
        return content;
      }
      return content.replace(/<(script|style)[\s\S]+<\/\1>/g, "").trim();
    },
  },
  render() {
    const {
      className,
      style,
      // showCodeIcon,
      // buttonClassName,
      // renderToolbar,
      theme,
    } = this;

    const showCodeIcon = [
      "icon-xs ",
      this.showCode ? "el-icon-s-unfold" : "el-icon-s-fold",
    ];
    const showCodeButton = (
      <i class={showCodeIcon} on-click={this.handleShowCode}></i>
    );

    const dynamicComponent = this.currentTab.component;

    return (
      <div class={className} style={style}>
        '------------------ Markdown ------------------'
        <div class="code-view-wrapper">
          //代码展示 renderExample
          {this.dyShow && <dynamicComponent></dynamicComponent>}
          <div class="code-view-toolbar">{showCodeButton}</div>
          <CodeEditor
            lineNumbers
            key="jsx"
            onChange={this.handleCodeChange}
            class={`doc-code ${this.showCode ? "show" : ""}`}
            theme={`base16-${theme}`}
            value={this.code}
          />
        </div>
        '------------------ Markdown ------------------'
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.CodeMirror {
  padding: 10px;
  margin: 10px 0;
  height: auto !important;
  pre {
    padding: 0 20px;
  }
}

.code-view-wrapper {
  position: relative;
  margin-bottom: 18px;
  // border: 1px dashed #f1f1f1;
  border: 1px dashed #000000;
  padding: 18px 18px 28px 18px;
  .code-view-toolbar {
    right: 0;
    bottom: 0;
    // border-bottom: 1px dashed #f5f5f5;
    border-bottom: 1px dashed #000000;
    text-align: right;
    .btn {
      border-style: dashed;
      .icon-code {
        font-size: 20px;
      }
    }
  }
  .doc-code {
    height: 0;
    overflow: hidden;
    &.show {
      height: auto;
    }
  }
  .code-view {
    padding: 10px 0;
    position: relative;
    &:after {
      position: absolute;
      top: 18px;
      left: 18px;
      font-size: 12px;
      font-weight: 300;
      color: #959595;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
  .code-view-error {
    color: red;
  }
}

.icon-xs {
  font-size: 24px;
  line-height: 1.5;
}
</style>
