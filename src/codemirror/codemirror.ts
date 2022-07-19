import CodeMirror from "codemirror";
// 自定义主题
import "./codemirror.css";

// 语言 modes
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// addons
// 括号/标签 匹配自动关闭
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/matchtags.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";
// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/comment-fold.js";
// 缩进文件
import "codemirror/addon/fold/indent-fold.js";
// 光标行背景高亮
import "codemirror/addon/selection/active-line.js";
// 滚动条样式
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars.js";

export default CodeMirror;
