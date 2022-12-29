const escapeHtml = require("escape-html");

/**
 * Resolve header title from markdown-it token
 *
 * Typically using the next token of `heading_open` token
 */

module.exports = (token, ResolveTitleOptions) => {
  const { shouldAllowHtml, shouldEscapeText } = ResolveTitleOptions;
  // children of the token contains the parsed result of the heading title
  const children = token.children ?? [];

  // type of tokens to be included in the heading title
  const titleTokenTypes = ["text", "emoji", "code_inline"];

  // include 'html_inline' or not
  if (shouldAllowHtml) {
    titleTokenTypes.push("html_inline");
  }

  // filter the token type to be included in the title
  const titleTokens = children.filter(
    (item) =>
      titleTokenTypes.includes(item.type) &&
      // filter permalink symbol that generated by markdown-it-anchor
      !(item.meta | undefined)?.isPermalinkSymbol
  );

  // get title from tokens
  return titleTokens
    .reduce((result, item) => {
      if (shouldEscapeText) {
        // escape the content of 'code_inline' and 'text'
        if (item.type === "code_inline" || item.type === "text") {
          return `${result}${escapeHtml(item.content)}`;
        }
      }

      // keep the content of 'emoji' and 'html_inline'
      return `${result}${item.content}`;
    }, "")
    .trim();
};
