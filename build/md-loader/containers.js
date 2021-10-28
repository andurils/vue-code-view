const mdContainer = require("markdown-it-container");

module.exports = (md) => {
  // 自定义容器的解析
  // 解析 ::: demo 文字描述  :::
  md.use(mdContainer, "demo", {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : "";
        const content =
          tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ""}
        <!--vcv-demo: ${content}:vcv-demo-->
        `;
      }
      return "</demo-block>";
    },
  });
  // 解析 :::tip :::
  md.use(mdContainer, "tip");
  // 解析 :::warning :::
  md.use(mdContainer, "warning");
  // 解析 :::danger :::
  md.use(mdContainer, "danger");
  // 解析 :::details :::
  md.use(mdContainer, "details");
};
