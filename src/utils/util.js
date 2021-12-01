const qs = require("querystring");
/**
 * Always return false.
 */
// eslint-disable-next-line no-unused-vars
export const no = (a, b, c) => false;

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val];
}

// src/platforms/web/compiler/util.js
// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
export const isNonPhrasingTag = makeMap(
  "address,article,aside,base,blockquote,body,caption,col,colgroup,dd," +
    "details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form," +
    "h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta," +
    "optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead," +
    "title,tr,track"
);

// /src/core/util/lang.js
/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
export const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

// these are built-in query parameters so should be ignored
// if the user happen to add them as attrs
const ignoreList = ["id", "index", "src", "type"];

// transform the attrs on a SFC block descriptor into a resourceQuery string
export function attrsToQuery(attrs, langFallback) {
  let query = ``;
  for (const name in attrs) {
    const value = attrs[name];
    if (!ignoreList.includes(name)) {
      query += `&${qs.escape(name)}=${value ? qs.escape(value) : ``}`;
    }
  }
  if (langFallback && !(`lang` in attrs)) {
    query += `&lang=${langFallback}`;
  }
  return query;
}

// string hash
// https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function hashCode(content) {
  var hash = 0;
  if (content.length == 0) return hash;
  for (let i = 0; i < content.length; i++) {
    let char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// 生成一个随机的ID 基于random
export const generateId = function () {
  return Math.floor(Math.random() * 10000);
};

export const isEmpty = function (val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === "boolean") return false;

  if (typeof val === "number") return !val;

  if (val instanceof Error) return val.message === "";

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case "[object String]":
    case "[object Array]":
      return !val.length;

    // Map or Set or File
    case "[object File]":
    case "[object Map]":
    case "[object Set]": {
      return !val.size;
    }
    // Plain Object
    case "[object Object]": {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";

const hasOwnProperty = Object.prototype.hasOwnProperty;

// 用来判断一个属性是定义在对象本身而不是继承自原型链
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * @function  将一个对象的内容合并到目标对象
 * @description 如果对象具有相同的属性，则后者会覆盖前者的属性值
 * @param to 目标对象
 * @param _from 被合并的对象
 */
export function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
}
