
# 0x00 前言

书接上文，本文将从源码功能方面讲解下 `vue-code-view` 组件核心逻辑，您可以了解以下内容：

- 动态组件的使用。
- `codeMirror`插件的使用。
- 单文件组件(SFC,single-file component) Parser。

# 0x01 CodeEditor组件

项目使用功能丰富的`codeMirror`实现在线代码展示编辑功能。  

npm 包安装：

```bash
npm install codemirror --save 
```

子组件 `src\src\code-editor.vue` 完整源码：

```js
<template>
  <div class="code-editor">
    <textarea ref="codeContainer" />
  </div>
</template>

<script>
// 引入核心
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css"; 

// 主题 theme style
import "codemirror/theme/base16-light.css";
import "codemirror/theme/base16-dark.css"; 
// 语言 mode
import "codemirror/mode/vue/vue";  
// 括号/标签 匹配
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
// 括号/标签 自动关闭
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag"; 
// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/comment-fold";
// 缩进文件
import "codemirror/addon/fold/indent-fold";
// 光标行背景高亮
import "codemirror/addon/selection/active-line"; 

export default {
  name: "CodeEditor",
  props: {
    value: { type: String },
    readOnly: { type: Boolean },
    theme: { type: String },
    matchBrackets: { type: Boolean },
    lineNumbers: { type: Boolean },
    lineWrapping: { type: Boolean },
    tabSize: { type: Number },
    codeHandler: { type: Function },
  },
  data() {
    return {
      // 编辑器实例
      codeEditor: null,
      // 默认配置
      defaultOptions: {
        mode: "text/x-vue", //语法高亮   MIME-TYPE    
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter", 
        ], 
        lineNumbers: this.lineNumbers, //显示行号
        lineWrapping: this.lineWrapping || "wrap", // 长行时文字是换行  换行(wrap)/滚动(scroll)
        styleActiveLine: true, // 高亮选中行
        tabSize: this.tabSize || 2, // tab 字符的宽度
        theme: this.theme || "base16-dark", //设置主题 
        autoCloseBrackets: true, // 括号自动关闭
        autoCloseTags: true, // 标签自动关闭
        matchTags: true, // 标签匹配
        matchBrackets: this.matchBrackets || true, // 括号匹配
        foldGutter: true, // 代码折叠
        readOnly: this.readOnly ? "nocursor" : false, //  boolean|string  “nocursor” 设置只读外，编辑区域还不能获得焦点。
      },
    };
  },
  watch: {
    value(value) {
      const editorValue = this.codeEditor.getValue();
      if (value !== editorValue) {
        this.codeEditor.setValue(this.value);
      }
    },
    immediate: true,
    deep: true,
  },
  mounted() {
    // 初始化
    this._initialize();
  },
  methods: {
    // 初始化
    _initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.codeEditor = CodeMirror.fromTextArea(
        this.$refs.codeContainer,
        this.defaultOptions
      ); 
      this.codeEditor.setValue(this.value); 
      // 使用 prop function 替换 onChange 事件
      this.codeEditor.on("change", (item) => {
        this.codeHandler(item.getValue());
      });
    },
  },
};
</script>
```

插件启用功能的配置选项，同时需要引入相关的`js`,`css` 文件。

| 参数          | 说明                         | 类型              |  
| ------------- | ---------------------------- | ----------------- |
|mode| 支持语言语法高亮 MIME-TYPE       | string|
|lineNumbers|是否在编辑器左侧显示行号。|boolean|
|lineWrapping| 在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)。| boolean|
|styleActiveLine| 高亮选中行|boolean|
|tabSize| tab 字符的宽度|number
|theme|设置主题 |tring|
|autoCloseBrackets| 括号自动关闭|boolean|
|autoCloseTags| 标签自动关闭|boolean|
|matchTags| 标签匹配|boolean|
|matchBrackets| 括号匹配|boolean|
|foldGutter| 代码折叠|boolean|
|readOnly |  是否只读。 “nocursor” 设置只读外，编辑区域还不能获得焦点。|`boolean`\|`string`|

组件初始化时，会自动初始化编辑器示例，同时将源码赋值给编辑器，并注册监听`change`事件。当编辑器的值发生改变时，会触发 `onchange` 事件，调用组件prop 属性 `codeHandler`将最新值传给父组件。

```js
// 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置 
this.codeEditor = CodeMirror.fromTextArea( this.$refs.codeContainer, this.defaultOptions );   
this.codeEditor.setValue(this.value);  
// 注册监听`change`事件
this.codeEditor.on("change", (item) => { this.codeHandler(item.getValue()); });
```

# 0x02 SFC Parser

组件的功能场景是用于简单示例代码运行展示，将源码视为 单文件组件(SFC,single-file component)的简单实例。

文件`src\utils\sfcParser\parser.js`  移植 vue 源码 [sfc/parser.js](https://github.com/vuejs/vue/blob/dev/src/sfc/parser.js#L14) 的 `parseComponent` 方法,用于实现源码解析生成组件 `SFCDescriptor`。

> 暂不支持组件和样式的动态引入，此处功能代码已经移除。

```js
// SFCDescriptor 接口声明
export interface SFCDescriptor {
  template: SFCBlock | undefined; //
  script: SFCBlock | undefined;
  styles: SFCBlock[];
  customBlocks: SFCBlock[];
}

export interface SFCBlock {
  type: string;
  content: string;
  attrs: Record<string, string>;
  start?: number;
  end?: number;
  lang?: string;
  src?: string;
  scoped?: boolean;
  module?: string | boolean;
}
```

`SFCDescriptor` 包含 `template`、`script`、`styles`、`customBlocks` 四个部分，将用于示例组件的动态构建。 其中 `styles`是数组，可以包含多个代码块并解析； `template`和`script` 若存在多个代码块只能解析最后一个。
`customBlocks`是没在`template`的HTML代码，处理逻辑暂未包含此内容。

# 0x03 组件动态样式

文件`src\utils\style-loader\addStylesClient.js` 移植 `vue-style-loader` 源码 [addStylesClient](https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js) 方法,用于在页面DOM中动态创建组件样式。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1c7fda5256549929e49f5be63326ffd~tplv-k3u1fbpfcp-watermark.image?)

根据 `SFCDescriptor` 中的 `styles`和组件编号，在DOM中添加对应样式内容，若新增删除 `<style>`，页面DOM中对应创建或移除该样式内容。若更新  `<style>`内容，DOM节点只更新对应块的内容，优化页面性能。

# 0x04 CodeViewer 组件

使用 `JSX` 语法实现组件核心代码。

```js
<script> 
export default {
  name: "CodeViewer", 
  props: {
    theme: { type: String, default: "dark" }, //light 
    source: { type: String }, 
  },
  data() {
    return {
      code: ``, 
      dynamicComponent: {
        component: {
          template: "<div>Hello Vue.js!</div>",
        },
      }, 
    };
  },
  created() {
    this.viewId = `vcv-${generateId()}`; 
    // 组件样式动态更新
    this.stylesUpdateHandler = addStylesClient(this.viewId, {});
  },
  mounted() {
    this._initialize();
  },
  methods: {
    // 初始化
    _initialize() {
      ...
    },
    // 生成组件
    genComponent() {
      ...
    },
    // 更新 code 内容
    handleCodeChange(val) {
      ...
    },
    // 动态组件render
    renderPreview() { 
      ...
    }, 
  },
  computed: {
    // 源码解析为sfcDescriptor
    sfcDescriptor: function () {
      return parseComponent(this.code);
    }, 
  },
  watch: { 
    // 监听源码内容
    code(newSource, oldSource) {
       this.genComponent();
    },
  },
  // JSX 渲染函数
  render() { 
    ...
  },
};
</script> 
```

组件初始化生成组件编号，注册方法 `stylesUpdateHandler` 用于样式的动态添加。

组件初始化调用 `handleCodeChange` 方法将传入prop `source`值赋值给`code`。

```js
methods: {
    _initialize() { 
      this.handleCodeChange(this.source);
    },
    handleCodeChange(val) {
      this.code = val;
    },
}
```

计算属性`sfcDescriptor` 调用`parseComponent`方法解析`code`内容生成组件的 `sfcDescriptor`。

```js
computed: {
    // 源码解析为sfcDescriptor
    sfcDescriptor: function () {
      return parseComponent(this.code);
    }, 
  },
```

组件监听`code`值是否发生变化，调用`genComponent`方法更新组件。

```js
 methods: { 
    // 生成组件
    genComponent() {
      ...
    }, 
  }, 
  watch: { 
    // 监听源码内容
    code(newSource, oldSource) {
       this.genComponent();
    },
  },
```

方法 `genComponent`将代码的`sfcDescriptor` 动态生成组件，更新至 `dynamicComponent` 用于示例呈现。同时调用 `stylesUpdateHandler`方法使用`addStylesClient`在DOM中添加实例中样式,用于示例样式渲染。

```js
  genComponent() {
      const { template, script, styles, customBlocks, errors } = this.sfcDescriptor; 
      
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
      demoComponent.template = `<section id="${this.viewId}" class="result-box" >
        ${templateCode}
      </section>`;

      // 组件 style 
      this.stylesUpdateHandler(styleCodes);

      // 组件内容更新
      extend(this.dynamicComponent, {
        name: this.viewId,
        component: demoComponent,
      });
    },
```

`JSX` 渲染函数展示基于`code`内容动态生成的组件内容。调用 `CodeEditor` 组件传入源码`value`和主题`theme`，提供了 codeHandler 处理方法`handleCodeChange`用于获取编辑器内最新的代码。

```js
  methods: { 
    renderPreview() { 
      const renderComponent = this.dynamicComponent.component;

      return (
        <div class="code-view zoom-1">
          <renderComponent></renderComponent>
        </div>
      );
    },
  },
  // JSX 渲染函数
  render() { 
    return (
      <div ref="codeViewer">
        <div class="code-view-wrapper"> 
          {this.renderPreview()}  
          ...
          <CodeEditor 
              codeHandler={this.handleCodeChange}
              theme={`base16-${this.theme}`}
              value={this.code}
            />
        </div>
      </div>
    );
  },
```

`handleCodeChange` 被调用后，触发 watch =>genComponent=>render ，页面内容刷新，从而达到代码在线编辑，实时预览效果的功能。

---

# 完结

此组件编写是个人对于 [📚Element 2 源码学习系列](https://juejin.cn/column/6961321064110489631 "https://juejin.cn/column/6961321064110489631") 学习实践的总结,希望会对您有所帮助!
