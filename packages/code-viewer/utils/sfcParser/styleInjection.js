import { compile } from "tiny-sass-compiler";
const nonWhitespaceRE = /\S+/;

export function genStyleInjectionCode(styles) {
  let styleCodes = [];
  // 不支持 css link src为空，且 <style>标签内容不为空
  const isNotEmptyStyle = (style) =>
    !style.src && nonWhitespaceRE.test(style.content);
  // eslint-disable-next-line no-unused-vars
  styles.forEach((style, i) => {
    if (isNotEmptyStyle(style)) {
      if (style.lang === "scss" || style.lang === "sass") {
        // scss compiler
        // console.log("scss", style);
        const result = compile(style.content.trim());
        styleCodes.push(result.code);
      } else if (style.lang === "less") {
        // less compiler
        console.log("less", style);
      } else {
        // console.log("css", style);
        styleCodes.push(style.content.trim());
      }
    } else {
      console.log("not support style import!!");
    }
  });

  // console.log(styleCodes);
  return styleCodes.join("\n");
}
