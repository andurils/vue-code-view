import defaultLang from "../locale/lang/zh-CN"; // 默认语言 中文简体
import Vue from "vue";
import deepmerge from "deepmerge";
import Format from "./format";

const format = Format(Vue);
let lang = defaultLang;
let merged = false;

// i18nHandler 是一个 i18n 的处理函数，这块逻辑就是用来兼容外部的 i18n 方案如 vue-i18n@5.x。
let i18nHandler = function () {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === "function" && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};

// 国际化处理函数
export const t = function (path, options) {
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  const array = path.split(".");
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) {
      return format(value, options);
    }
    if (!value) return "";
    current = value;
  }
  return "";
};

// 语言切换
export const use = function (l) {
  lang = l || lang;
};

// i18n 的处理方法（支持引入自定义方法）
export const i18n = function (fn) {
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
