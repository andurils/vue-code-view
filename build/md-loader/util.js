// eslint-disable-next-line no-useless-escape
var templateStringsEscaper = /\`/g;

// 模板字符串  反引号转义
function escapeBackticks(content) {
  return content
    .replace(templateStringsEscaper, "<--backticks-->")
    .replace(/<\/script>/g, `<\\/script>`);
}

module.exports = {
  escapeBackticks,
};
