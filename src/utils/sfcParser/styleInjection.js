import { compile } from "tiny-sass-compiler";
import { isEmpty } from "../util";
import stylusLoader from "../style-loader/stylusLoader";
// import { compiler } from "../less-compiler";

/* styles
  SFCBlock {
    type: string;
    content: string;
    attrs: Record<string, string>;
    start?: number;
    end?: number;
    lang?: string;
    src?: string;
    scoped?: boolean;
    module?: string | boolean;
  }*/

const nonWhitespaceRE = /\S+/;

export function genStyleInjectionCode(styles, parentId) {
  let styleCodes = [];

  // // 添加组件 reset 样式
  // styleCodes.push(addRestStyle(parentId));

  // 不支持 css link src为空，且 <style>标签内容不为空
  const isNotEmptyStyle = (style) =>
    !style.src && nonWhitespaceRE.test(style.content);

  // eslint-disable-next-line no-unused-vars
  styles.forEach((style, i) => {
    if (!isNotEmptyStyle(style)) {
      console.log(`the css link  or style content empty is  not support !`);
      return;
    }

    if (style.lang === "scss" || style.lang === "sass") {
      // scss compiler
      const result = sassCompiler(style.content.trim());
      style.css = rootParentIdMixIn(result.code, parentId);
      styleCodes.push(style);
      return;
    }

    if (style.lang === "less") {
      console.log(`the less is  not support !`);
      // less compiler
      // compiler.fromSource(style.content.trim()).then((res) => {
      //   styleCodes.push(res.css.trim());
      // });
      return;
    }

    if (style.lang === "stylus") {
      // stylus compiler
      const result = stylusLoader(style.content.trim());
      style.css = rootParentIdMixIn(result, parentId);
      styleCodes.push(style);
      return;
    }

    if (isEmpty(style.lang)) {
      style.css = rootParentIdMixIn(style.content.trim(), parentId);
      styleCodes.push(style);
      return;
    }
    // 更多预处理格式 暂不支持
    if (style.lang != null) {
      console.log(`the ${style.lang} is  not support !`);
      return;
    }
  });

  return styleCodes;
}

// 样式增加 组件ID 作为根元素，进行样式隔离
function rootParentIdMixIn(cssText, parentId) {
  const rootMixin = ` 
#${parentId}.result-box {
  ${cssText}
}  
`;
  // 使用 sass 进行处理 格式化
  const result = sassCompiler(rootMixin);
  return result.code;
}

function sassCompiler(template) {
  try {
    const result = compile(template);
    return result;
  } catch (error) {
    console.log(
      "%c sassCompiler:",
      "color: #FFFFFF; background: #f5222d; font-size: 13px;",
      error
    );
    return { code: "" };
  }
}

// // 添加组件 reset 样式
// function addRestStyle(parentId) {
//   const resetStyle = {
//     type: "style",
//     content: `

// a{
//   color: #409eff;
//   text-decoration: none;
//   &:focus{
//     color: #66b1ff;
//   }
//   &:hover {
//     color: #66b1ff;
//   }
//   &:active {
//     color: #3a8ee6;
//   }
// }

// small {
//   font-size: 12px;
// }
// hr {
//   margin-top: 20px;
//   margin-bottom: 20px;
//   border: 0;
//   border-top: 1px solid #eee;
// }

// `,
//     attrs: {},
//   };
//   resetStyle.css = rootParentIdMixIn(resetStyle.content.trim(), parentId);
//   return resetStyle;
// }
