const emojiData = require("markdown-it-emoji/lib/data/full.json");

// Since VuePress needs to extract the header from the markdown source
// file and display it in the sidebar or title (#238), this file simply
// removes some unnecessary elements to make header displays well at
// sidebar or title.
//
// But header's parsing in the markdown content is done by the markdown
// loader based on markdown-it. markdown-it parser will always keep
// HTML in headers, so in VuePress, after being parsed by the markdown
// loader, the raw HTML in headers will finally be parsed by Vue-loader.
// so that we can write HTML/Vue in the header. One exception is the HTML
// wrapped by <code>(markdown token: '`') tag.
const removeMarkdownTokens = (str) =>
  String(str)
    .replace(/(\[(.[^\]]+)\]\((.[^)]+)\))/g, "$2") // []()
    .replace(/(`|\*{1,3}|_)(.*?[^\\])\1/g, "$2") // `{t}` | *{t}* | **{t}** | ***{t}*** | _{t}_
    .replace(/(\\)(\*|_|`|\!|<)/g, "$2"); // remove escape char '\'

const remvoeCustomAnchor = (str) => str.replace(/\{#([a-z0-9\-_]+?)\}\s*$/, ""); // {#custom-header}

const trim = (str) => str.trim();

const unescapeHtml = (html) =>
  html
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x3A;/g, ":")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const parseEmojis = (str) => {
  return String(str).replace(
    /:(.+?):/g,
    (placeholder, key) => emojiData[key] || placeholder
  );
};

const compose = (...processors) => {
  if (processors.length === 0) return (input) => input;
  if (processors.length === 1) return processors[0];
  return processors.reduce((prev, next) => {
    return (str) => next(prev(str));
  });
};

// Unescape html, parse emojis and remove some md tokens.
const parseHeaders = compose(
  unescapeHtml,
  parseEmojis,
  remvoeCustomAnchor,
  removeMarkdownTokens,
  trim
);

module.exports = parseHeaders;
