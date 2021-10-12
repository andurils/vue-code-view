"use strict";

// see https://vue-loader.vuejs.org/en/start/spec.html

const styleStartPatt = "<style>";
const styleEndPatt = "</style>";

const templateStartPatt = "<template>";
const templateEndPatt = "</template>";

const scriptStartPatt = "<script>";
const scriptEndPatt = "</script>";

class Parser {
  constructor() {
    this.tail = "";
    this.state = "";
    this.results = {
      styles: [],
      scripts: [],
      templates: [],
    };
  }

  exec(chunk) {
    this.tail += chunk;
    this.parse();
  }

  skipWhitespace() {
    var index = 0;
    while (index < this.tail.length) {
      var char = this.tail[index];
      if (char !== " " && char !== "\n" && char !== "\r") {
        // 遇到非空格退出
        break;
      }
      index++;
    }
    this.tail = this.tail.substring(index);
  }

  style() {
    this.skipWhitespace();
    if (!this.state && this.tail.startsWith(styleStartPatt)) {
      this.state = "style";
      var index = styleStartPatt.length;
      while (index < this.tail.length) {
        var char = this.tail[index];
        if (char !== "<") {
          index++;
          continue;
        }

        var next = this.tail.substring(index, index + styleEndPatt.length);
        if (next !== styleEndPatt) {
          index++;
          continue;
        }

        var style = this.tail.substring(styleStartPatt.length, index);
        this.results.styles.push(style);
        this.tail = this.tail.substring(index + styleEndPatt.length);
        this.state = "";
      }
    }
  }

  template() {
    this.skipWhitespace();
    if (!this.state && this.tail.startsWith(templateStartPatt)) {
      this.state = "template";
      var index = templateStartPatt.length;
      while (index < this.tail.length) {
        var char = this.tail[index];
        if (char !== "<") {
          index++;
          continue;
        }

        var next = this.tail.substring(index, index + templateEndPatt.length);
        if (next !== templateEndPatt) {
          index++;
          continue;
        }

        var style = this.tail.substring(templateStartPatt.length, index);
        this.results.templates.push(style);
        this.tail = this.tail.substring(index + templateEndPatt.length);
        this.state = "";
      }
    }
  }

  script() {
    this.skipWhitespace();
    if (!this.state && this.tail.startsWith(scriptStartPatt)) {
      this.state = "script";
      var index = scriptStartPatt.length;
      while (index < this.tail.length) {
        var char = this.tail[index];
        if (char !== "<") {
          index++;
          continue;
        }

        var next = this.tail.substring(index, index + scriptEndPatt.length);
        if (next !== scriptEndPatt) {
          index++;
          continue;
          // throw new SyntaxError(`Unexpected '<', at ${index}.`);
        }

        var content = this.tail.substring(scriptStartPatt.length, index);
        this.results.scripts.push(content);
        this.tail = this.tail.substring(index + scriptEndPatt.length);
        this.state = "";
      }
    }
  }

  parse() {
    this.style();
    this.template();
    this.script();

    // continue to process
    if (this.state === "" && this.tail.length) {
      this.parse();
    }
  }
}

class Builder {
  constructor(results) {
    this.scripts = results.scripts;
    this.styles = results.styles;
    this.templates = results.templates;
    this.output = [];
  }

  genStyle(content) {
    var code = `(function () {
  var css = ${JSON.stringify(content)};
  var elem = document.createElement('style');
  elem.setAttribute('type', 'text/css');

  if ('textContent' in elem) {
    elem.textContent = css;
  } else {
    elem.styleSheet.cssText = css;
  }

  document.getElementsByTagName('head')[0].appendChild(elem);
})();`;
    return code;
  }

  buildStyles() {
    for (var i = 0; i < this.styles.length; i++) {
      this.output.push(this.genStyle(this.styles[i]));
    }
  }

  genTemplate(content) {
    var code = `var template = ${JSON.stringify(content)};`;
    return code;
  }

  buildTemplates() {
    for (var i = 0; i < this.templates.length; i++) {
      this.output.push(this.genTemplate(this.templates[i]));
    }
  }

  genScript(content) {
    var code = `(function () {
${content}
})();`;
    return code;
  }

  buildScripts() {
    for (var i = 0; i < this.scripts.length; i++) {
      this.output.push(this.genScript(this.scripts[i]));
    }
  }

  build() {
    this.buildStyles();
    this.buildTemplates();
    this.buildScripts();
  }
}

module.exports = function (input) {
  var parser = new Parser();
  parser.exec(input);
  var builder = new Builder(parser.results);
  builder.build();
  return builder.output.join("\n\n");
};

module.exports.Parser = Parser;
module.exports.Builder = Builder;
