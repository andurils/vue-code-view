const Config = require("markdown-it-chain");
const highlight = require("../markdown/lib/highlight");
const containers = require("./containers");
const overWriteFenceRule = require("./fence");

// using chainedAPI
const config = new Config();

config.options
  .html(true)
  .highlight(highlight)
  .end()

  .plugin("containers")
  .use(containers)
  .end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
