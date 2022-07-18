const Config = require("markdown-it-chain");
const highlight = require("../markdown/lib/highlight");
const { PLUGINS } = require("../markdown/lib/constant");
const containers = require("./containers");
const overWriteFenceRule = require("./fence");

const emojiPlugin = require("markdown-it-emoji");

// using chainedAPI
const config = new Config();

config.options
  .html(true)
  .highlight(highlight)
  .end()

  .plugin("containers")
  .use(containers)
  .end()

  .plugin(PLUGINS.EMOJI)
  .use(emojiPlugin)
  .end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
