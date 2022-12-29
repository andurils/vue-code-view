const Config = require("markdown-it-chain");
const highlight = require("./lib/highlight");
const { PLUGINS, REQUIRED_PLUGINS } = require("./lib/constant");
const containers = require("./lib/containers");
const overWriteFenceRule = require("./lib/fence");

const highlightLinesPlugin = require("./lib/highlightLines");
const preWrapperPlugin = require("./lib/preWrapper");
const lineNumbersPlugin = require("./lib/lineNumbers");
const hoistScriptStylePlugin = require("./lib/hoist");
const convertRouterLinkPlugin = require("./lib/link");
const snippetPlugin = require("./lib/snippet");

const emojiPlugin = require("markdown-it-emoji");
const anchorPlugin = require("markdown-it-anchor");
const tocPlugin = require("markdown-it-table-of-contents");

const overWriteHeadersRule = require("./lib/headers");


// const tocPlugin = require("markdown-it-toc-done-right");

const {
  slugify: _slugify,
  parseHeaders,
  logger,
  chalk,
  // normalizeConfig,
  // moduleResolver: { getMarkdownItResolver },
} = require("../markdown/utils");

/**
 * Create markdown by config.
 */
module.exports = (markdown = {}) => {
  const {
    externalLinks,
    pageSuffix,
    anchor,
    toc,
    plugins,
    // lineNumbers,
    beforeInstantiate,
    afterInstantiate,
  } = markdown;

  // const resolver = getMarkdownItResolver();

  // allow user config slugify
  const slugify = markdown.slugify || _slugify;

  // using chainedAPI
  const config = new Config();

  config.options
    .html(true)
    .highlight(highlight)
    .end()

    .plugin("containers")
    .use(containers)
    .end()

    .plugin(PLUGINS.HIGHLIGHT_LINES)
    .use(highlightLinesPlugin)
    .end()
    .plugin(PLUGINS.PRE_WRAPPER)
    .use(preWrapperPlugin)
    .end()

    .plugin(PLUGINS.SNIPPET)
    .use(snippetPlugin)
    .end()

    .plugin(PLUGINS.CONVERT_ROUTER_LINK)
    .use(convertRouterLinkPlugin, [
      Object.assign(
        {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        externalLinks
      ),
      pageSuffix,
    ])
    .end()

    .plugin(PLUGINS.HOIST_SCRIPT_STYLE)
    .use(hoistScriptStylePlugin)
    .end()

    .plugin(PLUGINS.EMOJI)
    .use(emojiPlugin)
    .end()

    .plugin(PLUGINS.LINE_NUMBERS)
    .use(lineNumbersPlugin)
    .end()

    .plugin(PLUGINS.ANCHOR)
    .use(anchorPlugin, [
      Object.assign(
        {
          slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: "§", // 默认值 ¶
        },
        anchor
      ),
    ])
    .end()

    .plugin(PLUGINS.TOC)
    .use(tocPlugin, [
      Object.assign(
        {
          slugify,
          includeLevel: [2, 3],
          format: parseHeaders,
        },
        toc
      ),
    ])
    .end();

  beforeInstantiate && beforeInstantiate(config);

  const md = config.toMd(require("markdown-it"), markdown);
  overWriteFenceRule(md);
  overWriteHeadersRule(md);

  // const pluginsConfig = normalizeConfig(plugins || []);
  // pluginsConfig.forEach(([pluginRaw, pluginOptions]) => {
  //   const plugin = resolver.resolve(pluginRaw);
  //   if (plugin.entry) {
  //     md.use(plugin.entry, pluginOptions);
  //   } else {
  //     // TODO: error handling
  //   }
  // });

  afterInstantiate && afterInstantiate(md);

  // expose slugify
  md.slugify = slugify;

  return md;
};

function isRequiredPlugin(plugin) {
  return REQUIRED_PLUGINS.includes(plugin);
}

function removePlugin(config, plugin) {
  logger.debug(
    `Built-in markdown-it plugin ${chalk.green(plugin)} was removed.`
  );
  config.plugins.delete(plugin);
}

function removeAllBuiltInPlugins(config) {
  Object.keys(PLUGINS).forEach((key) => {
    if (!isRequiredPlugin(PLUGINS[key])) {
      removePlugin(config, PLUGINS[key]);
    }
  });
}

module.exports.isRequiredPlugin = isRequiredPlugin;
module.exports.removePlugin = removePlugin;
module.exports.removeAllBuiltInPlugins = removeAllBuiltInPlugins;
module.exports.PLUGINS = PLUGINS;
