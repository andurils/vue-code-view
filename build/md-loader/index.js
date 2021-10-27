const {
  stripScript,
  stripTemplate,
  genInlineComponentText,
} = require("./util");
const md = require("./config");

module.exports = function (source) {
  const content = md.render(source);
  // 注释Tag 开始结束的名称和长度
  const startTag = "<!--element-demo:";
  const startTagLen = startTag.length;
  const endTag = ":element-demo-->";
  const endTagLen = endTag.length;

  let componenetsString = "";
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag); // 获取注释开始Tag内容起始位置
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen); // 从注释开始Tag之后的位置 获取注释结束Tag位置
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart)); // 剔除注释开始Tag
    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    ); // 获取注释内容

    const html = stripTemplate(commentContent); // 获取template的html信息
    const script = stripScript(commentContent); // 获取script信息
    let demoComponentContent = genInlineComponentText(html, script); // 转成一个内联组件
    const demoComponentName = `element-demo${id}`; // 内联组件名称

    output.push(`<template slot="source"><${demoComponentName} /></template>`); // 使用slot插槽 运行组件
    componenetsString += `${JSON.stringify(
      demoComponentName
    )}: ${demoComponentContent},`; // 页面组件注册   组件名称:组件内容

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  let pageScript = "";
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf("<script>") === 0) {
    // 硬编码，有待改善
    start = content.indexOf("</script>") + "</script>".length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content me-doc">
        ${output.join("")}
      </section>
    </template>
    ${pageScript}
  `;
};
