const Config = require("markdown-it-chain");
const anchorPlugin = require("markdown-it-anchor");
const slugify = require("transliteration").slugify;
const containers = require("./containers");
const overWriteFenceRule = require("./fence");

// 实例化配置对象
const config = new Config();

// 使用链式API调用配置
config.options // markdown-it 选项配置
  .html(true) // 在源码中启用 HTML 标签
  .end()

  // 插件配置
  .plugin("anchor")
  // 标题锚点生成插件
  // 第一个参数：使用的插件模块  第二个参数：插件使用配置参数
  .use(anchorPlugin, [
    {
      level: 2, // 最少包含的渲染层级
      slugify: slugify, // 生成有效url的自定义函数
      permalink: true, // 是否在标题旁加入永久链接
      permalinkBefore: true, // 将永久链接放在标题的前面
    },
  ])
  .end()

  .plugin("containers")
  // 创建块级自定义容器的解析插件
  .use(containers)
  .end();

// 使用上述配置创建一个 markdown-it 的实例
const md = config.toMd();
// 针对代码块（fence）覆盖默认渲染规则。当代码块在 demo 容器内要做一下特殊处理。
overWriteFenceRule(md);

module.exports = md;
