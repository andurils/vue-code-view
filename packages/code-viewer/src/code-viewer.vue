<script>
import CodeEditor from "./code-editor.vue";
import VersionHistory from "./version-control.vue";
import { parseComponent } from "../utils/sfcParser/parser";
import { genStyleInjectionCode } from "../utils/sfcParser/styleInjection";
import { addStyles } from "../utils/addStyles";
import { hashCode } from "../utils/util";
import { throttle } from "throttle-debounce";
import screenfull from "screenfull";

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
    VersionHistory,
  },
  provide() {
    return {
      vueCodeView: this,
      resetFunc: this.reset,
    };
  },
  props: {
    // theme: { type: Object, default: light },
    // classPrefix: { type: String },
    // delay: { type: Number },
    showCode: { type: Boolean, default: true },
    source: { type: String },
    // children: { type: String },
    // dependencies: { type: Object },
    // babelTransformOptions: {
    //   type: Object,
    //   default: {
    //     presets: ["stage-0", "react", "es2015"],
    //   },
    // },
    // buttonClassName: { type: String },
    // showCodeIcon: { type: Object },
    // renderToolbar: { type: Function },
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

      // showCode: true,
      showCodeIcon: {},
      // code: aaa,
      delay: 10000, // ms  用于节流函数参数
      theme: "light", // 主题
      isFullScreen: false,
      // webStorage
      versionHistoryKey: "code-version-history",
      maxVersionHistory: 0, // 记录历史版本最大次数  0 不限制
      lastSaveTime: null,
      versionHistoryList: [], // 版本历史记录
    };
  },
  mounted() {
    // 使用节流函数（throttle）
    this.throttledLocalStorageHandler = throttle(
      this.delay,
      this.localStorageSet
    );
    this.handleCodeChange(this.source);
    // 获取版本历史记录
    const localStorageText_versionHistoryList = this.$storage.get(
      this.versionHistoryKey,
      "[]"
    );
    this.versionHistoryList = JSON.parse(localStorageText_versionHistoryList);
    if (this.versionHistoryList && this.versionHistoryList.length > 0) {
      let recordKey =
        this.versionHistoryList[this.versionHistoryList.length - 1].timeStamp;
      // console.log(recordKey);
      const localStorageText_Code = this.$storage.get(
        `code-${recordKey}`,
        "isEmpty"
      );
      if (localStorageText_Code !== "isEmpty") {
        this.code = JSON.parse(localStorageText_Code);
        // console.log(this.code);
      }
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split("").reverse().join("");
    },
  },
  methods: {
    toggleFullScreen() {
      // console.log(
      //   "%c [ FullScreen ]: ",
      //   "color: #FFFFFF; background: #f5222d; font-size: 13px;",
      //   "toggleFullScreen"
      // );
      // if (screenfull.isEnabled && !screenfull.isFullscreen) {
      //   screenfull.request();
      // }

      // if (screenfull.isEnabled && screenfull.isFullscreen) {
      //   screenfull.exit();
      // }
      if (screenfull.isEnabled) {
        screenfull.toggle(this.$refs.codeEditor);
        this.isFullScreen = !this.isFullScreen;
      }
    },
    handleShowCode() {
      this.showCode = !this.showCode;
    },
    handleCodeChange(val) {
      console.log(parseComponent(val));

      this.code = val;
      this.dyShow = false;
      let componentId = hashCode(this.$dayjs().valueOf().toString());

      const demoComponentExport = {};
      let scriptCode = ``;
      let templateCode = ``;
      let styleCode = ``;

      // SFC 解析输出 SFC Descriptor Object
      const sfcDescriptor = parseComponent(this.code);
      templateCode = sfcDescriptor.template.content.trim();
      scriptCode = sfcDescriptor.script.content.trim();
      styleCode = genStyleInjectionCode(sfcDescriptor.styles);

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

      this.throttledLocalStorageHandler();
    },
    // 存储修改
    localStorageSet() {
      // console.log(new Date());
      // 获取历史版本记录
      const versionHistoryStorageText = this.$storage.get(
        this.versionHistoryKey,
        "[]"
      );
      // eslint-disable-next-line no-unused-vars
      let storageVersionHistoryList = JSON.parse(versionHistoryStorageText);
      // console.log(this.$dayjs().valueOf());
      // eslint-disable-next-line no-unused-vars
      const timeStamp = this.$dayjs().valueOf();
      const lastSaveTimeFormatText = this.$dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.lastSaveTime = this.$dayjs().fromNow();
      // console.log(versionHistoryList);

      this.$storage.set(
        `component-${timeStamp}`,
        JSON.stringify(this.currentTab.component),
        { ttl: 60 * 60 * 24 * 1000 }
      );

      this.$storage.set(`code-${timeStamp}`, JSON.stringify(this.code), {
        ttl: 60 * 60 * 24 * 1000,
      });
      let updateVersionHistoryList = [
        ...storageVersionHistoryList,
        { timeStamp: timeStamp, saveTime: lastSaveTimeFormatText },
      ];
      this.$storage.set(
        this.versionHistoryKey,
        JSON.stringify(updateVersionHistoryList),
        {
          ttl: 60 * 60 * 24 * 1000,
        }
      );

      // 倒序
      this.versionHistoryList = updateVersionHistoryList.reverse();
      // console.log("versionHistoryList", this.versionHistoryList);
    },
    parseDate2Str(date, format) {
      format = format || "YYYY-MM-DD HH:mm:ss";
      return this.$dayjs(date).format(format);
    },
    reset(event) {
      const { timestamp } = event.srcElement.dataset;
      // console.log(timestamp);
      this.code = JSON.parse(this.$storage.get(`code-${timestamp}`, []));
      this.currentTab.component = JSON.parse(
        this.$storage.get(`component-${timestamp}`, [])
      );
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
      "icon",
      "iconfont",
      this.showCode ? "icon-codelibrary" : "icon-code",
    ];

    const fullScreenIcon = [
      "icon",
      "iconfont",
      this.isFullScreen ? "icon-fullscreen-exit" : "icon-fullscreen",
    ];
    const fullScreenText = this.isFullScreen ? "退出全屏" : "进入全屏";

    const showCodeButton = (
      <i class={showCodeIcon} on-click={this.handleShowCode}></i>
    );

    const dynamicComponent = this.currentTab.component;
    // 移除样式 class={`doc-code ${this.showCode ? "show" : ""}`}
    return (
      <div class={className} style={style}>
        {/* --------- Markdown   --------- */}
        <div class="page-main" ref="codeEditor">
          <div class="code-box">
            {/* --------- 代码展示 renderExample --------- */}

            <div class="code-box-demo">
              <div class="code-box-toolbar">
                <el-divider content-position="left">代码演示</el-divider>
                <el-tooltip
                  effect="dark"
                  content={fullScreenText}
                  placement="top"
                  class="icon-action"
                >
                  <span
                    class={fullScreenIcon}
                    on-click={this.toggleFullScreen}
                  ></span>
                </el-tooltip>

                <el-tooltip
                  effect="dark"
                  content="代码编辑"
                  placement="top"
                  class="icon-action"
                >
                  {showCodeButton}
                </el-tooltip>
              </div>
              {this.dyShow && <dynamicComponent></dynamicComponent>}
            </div>

            {this.showCode && (
              <div class="code-box-editor">
                <CodeEditor
                  lineNumbers
                  key="jsx"
                  onChange={this.handleCodeChange}
                  class="doc-code"
                  theme={`base16-${theme}`}
                  value={this.source}
                />
              </div>
            )}
            <div class="code-box-actions">
              <VersionHistory tooltip-placement="top"></VersionHistory>
            </div>
          </div>
        </div>
        {/* --------- Markdown --------- */}
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  // 最小尺寸
  min-width: 1024px;
  min-height: 768px;

  // width: 100%;
  // height: 100vh;

  display: flex;
  flex-direction: column;

  //  区域 title
  .page-header {
    text-align: center;
    background: hsl(0, 50%, 45%);
    color: white;

    .page-title__main {
      // padding: 12px 0;
      // font-style: normal;
      font-size: clamp(2rem, calc(2rem + 1.2vw), 3rem);
      font-weight: 700;
      line-height: 1.7;
    }
    .page-title__sub {
      font-family: "Goudy Old Style", Garamond;
      // font-style: normal;
      font-size: 32px;
      line-height: 1.7;
    }
    .page-title--shadow {
      // color: white;
      // background: hsl(0, 50%, 45%);
      text-shadow: 1px 1px black, 2px 2px black, 3px 3px black, 4px 4px black,
        5px 5px black, 6px 6px black, 7px 7px black, 8px 8px black;
    }
  }
  // 内容  组件展示  代码编辑器
  .page-main {
    padding: 12px;
    background-color: #ffffff;
    // 计算高度  -200PX  title /gap间距  /页面padding 8px / 修正26
    height: calc(100vh - 134px - 24px - 16px - 26px);

    // flex-grow: 1;

    .code-box {
      width: 100%;
      height: 100%;
      background-color: #fafafa;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ebebeb;
      border-radius: 3px;
      // box-sizing: border-box;

      display: flex;
      flex-direction: column;

      .code-box-demo {
        padding: 24px;
        // border-bottom: 1px solid #eaeefb;
        background-color: #fff;
        flex-grow: 1;

        overflow-y: hidden;
        overflow-x: hidden;
        .code-box-toolbar {
          display: flex;
          align-items: center;
          .icon-action {
            margin-left: 12px;
          }
        }
      }
      .code-box-editor {
        background-color: #fff;

        // padding: 24px;
        // min-height: 260px;
      }

      .code-box-actions {
        height: 38px;

        border-top: 1px solid #eaeefb;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        position: relative;
        // text-align: right;
        padding-right: 24px;

        display: flex;
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
  }
}

.CodeMirror {
  padding: 10px;
  margin: 10px 0;
  height: auto !important;
  pre {
    padding: 0 20px;
  }
}

.icon {
  font-size: 24px;
  line-height: 1.5;
  cursor: pointer;
}

@media only screen and (max-height: 768px) {
  .page-header {
    display: none !important;
  }
}
</style>
