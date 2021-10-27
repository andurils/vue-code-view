const mdContainer = require("markdown-it-container");

module.exports = (md) => {
  // 约定的文档格式。
  // ::: demo 中写演示的例子，::: demo 中```(fence)中编写代码。
  // ::: 属于Markdown 中的拓展语法，通过它来自定义容器。
  md.use(mdContainer, "demo", {
    // 验证代码块为 :::demo ::: 才进行渲染
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    // 自定义容器 demo 就被转成了 demo-block 组件
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        // 获取第一行的内容使用markdown渲染html作为组件的描述
        const description = m && m.length > 1 ? m[1] : "";
        const content =
          tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";

        // 使用自定义开发组件 demo-block 来包裹内容并且渲染代码示例
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ""}
        <!--element-demo: ${content}:element-demo-->
        `;
      }
      return "</demo-block>";
    },
  });
  // 解析 :::tip :::
  md.use(mdContainer, "tip");
  // 解析 :::warning :::
  md.use(mdContainer, "warning");
};
