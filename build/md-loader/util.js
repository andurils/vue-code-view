const { compileTemplate } = require("@vue/component-compiler-utils");
const compiler = require("vue-template-compiler");

// 获取 <script> 标签中的文本内容
function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

// 获取 <style> 标签中的文本内容
function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, "").trim();
}

// 参考 templateLoader.js  源码
// 将自定义容器中的 代码块（fence） 转成一个个内联component注入到整个页面中
function genInlineComponentText(template, script) {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: "inline-component",
    compiler,
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach((tip) => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map((e) => `  - ${e}`).join("\n") +
        "\n"
    );
  }
  // 组件内容
  let demoComponentContent = `
    ${compiled.code}
  `;
  // script内容
  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, "const democomponentExport =");
  } else {
    script = "const democomponentExport = {}";
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
  return demoComponentContent;
}

// 每行增加空格
function pad(source) {
  return source
    .split(/\r?\n/)
    .map((line) => `  ${line}`)
    .join("\n");
}

module.exports = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText,
};
