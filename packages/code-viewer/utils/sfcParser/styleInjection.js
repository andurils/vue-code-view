import { compile } from "tiny-sass-compiler";
// import { compiler } from "../less-compiler";
const nonWhitespaceRE = /\S+/;

export function genStyleInjectionCode(styles) {
  let styleArray = [];
  let styleCodes = [];
  // 不支持 css link src为空，且 <style>标签内容不为空
  const isNotEmptyStyle = (style) =>
    !style.src && nonWhitespaceRE.test(style.content);
  // eslint-disable-next-line no-unused-vars
  styles.forEach((style, i) => {
    if (isNotEmptyStyle(style)) {
      if (style.lang === "scss" || style.lang === "sass") {
        // scss compiler
        const result = compile(style.content.trim());
        styleCodes.push(result.code);

        style.css = result.code;
        styleArray.push(style);
      } else if (style.lang === "less") {
        // less compiler
        // compiler.fromSource(style.content.trim()).then((res) => {
        //   styleCodes.push(res.css.trim());
        // });
      } else {
        styleCodes.push(style.content.trim());

        style.css = style.content.trim();
        styleArray.push(style);
      }
    } else {
      console.log("not support style import!!");
    }
  });

  // console.log("genStyles", styleCodes, styleCodes.join("\n"));
  return { styles: styleArray, styleCode: styleCodes.join("\n") };
}
