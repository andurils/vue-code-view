// Modified from @vuepress/shared-utils

const logger = require("./logger");
const slugify = require("./slugify");
const parseHeaders = require("./parseHeaders");
const resolveHeadersFromTokens = require("./resolve-headers-from-tokens");
// const normalizeConfig = require("./normalizeConfig");

const chalk = require("chalk"); // v5.x 不支持 require
const escapeHtml = require("escape-html");
// const fs = require("fs-extra");
// const path = require("path"); // upath

module.exports = {
  chalk,
  // path,
  // fs,
  escapeHtml,
  logger,
  // normalizeConfig,
  slugify,
  parseHeaders,
  resolveHeadersFromTokens
};
