const { escapeBackticks } = require("./util");
const md = require("./config");

module.exports = function (source) {
  const content = md.render(source);
  const startTag = "<!--vcv-demo:";
  const startTagLen = startTag.length;
  const endTag = ":vcv-demo-->";
  const endTagLen = endTag.length;

  let componenetsString = "";
  let id = 0;
  let output = [];
  let start = 0;

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));
    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    );
    const demoComponentName = `vcv${id}`;
    // output.push(
    //   `<template slot="source"><code-viewer :source="${demoComponentName}"></code-viewer></template>`
    // ); // 使用slot插槽 运行组件
    output.push(
      `<template slot="source"><code-viewer :source="${demoComponentName}"></code-viewer></template>`
    ); // 使用slot插槽 运行组件
    // output.push(`<template slot="source"><${demoComponentName} /></template>`); // 使用slot插槽 运行组件
    componenetsString += `${demoComponentName}: \`${escapeBackticks(
      commentContent
    )}\`,`;

    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  let pageScript = "";
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc', 
        data() {
          return {
            ${componenetsString}
          };
        }, 
      }
    </script>`;
  } else if (content.indexOf("<script>") === 0) {
    start = content.indexOf("</script>") + "</script>".length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));

  return `
    <template>
      <section class="markdown api-container">
        ${output.join("")}
      </section>
    </template>
    ${pageScript}
  `;
};
