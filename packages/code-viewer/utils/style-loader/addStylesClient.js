// https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/
import { listToStyles } from "./listToStyles";

var hasDocument = typeof document !== "undefined";

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}
type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {
  /*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/
};

var head =
  hasDocument && (document.head || document.getElementsByTagName("head")[0]);

var isProduction = false;
var noop = function () {};
var options = null;
var ssrIdKey = "data-vue-ssr-id";

export function addStylesClient(parentId, list, _isProduction, _options) {
  isProduction = _isProduction;

  options = _options || {};

  var styles = listToStyles(parentId, list);
  console.log("addStylesClient", styles);
  addStylesToDom(styles);

  return function update(newList) {
    var mayRemove = [];
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];
      domStyle.refs--;
      mayRemove.push(domStyle);
    }
    if (newList) {
      styles = listToStyles(parentId, newList);
      addStylesToDom(styles);
    } else {
      styles = [];
    }
    // eslint-disable-next-line no-redeclare
    for (var i = 0; i < mayRemove.length; i++) {
      // eslint-disable-next-line no-redeclare
      var domStyle = mayRemove[i];
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]();
        }
        delete stylesInDom[domStyle.id];
      }
    }
  };
}
/**
 * 添加 Style 至 DOM 中
 */
function addStylesToDom(styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    if (domStyle) {
      domStyle.refs++;
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]));
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length;
      }
    } else {
      var parts = [];
      // eslint-disable-next-line no-redeclare
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]));
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
    }
  }
}

function createStyleElement() {
  var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  head.appendChild(styleElement);
  return styleElement;
}

function addStyle(obj /* StyleObjectPart */) {
  var update, remove;
  var styleElement = document.querySelector(
    "style[" + ssrIdKey + '~="' + obj.id + '"]'
  );

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop;
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement);
    }
  }
  // OldIE 暂不支持
  // use multi-style-tag mode in all other cases
  styleElement = createStyleElement();
  update = applyToTag.bind(null, styleElement);
  remove = function () {
    styleElement.parentNode.removeChild(styleElement);
  };

  update(obj);

  return function updateStyle(newObj /* StyleObjectPart */) {
    if (newObj) {
      if (
        newObj.css === obj.css
        // newObj.media === obj.media &&
        // newObj.sourceMap === obj.sourceMap
      ) {
        return;
      }
      update((obj = newObj));
    } else {
      remove();
    }
  };
}

function applyToTag(styleElement, obj) {
  var css = obj.css;
  // var media = obj.media;
  var sourceMap = obj.sourceMap;

  // if (media) {
  //   styleElement.setAttribute("media", media);
  // }

  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id);
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */";
    // http://stackoverflow.com/a/26603875
    css +=
      "\n/*# sourceMappingURL=data:application/json;base64," +
      btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) +
      " */";
  }

  // if (styleElement.styleSheet) {
  if (styleElement.type === "text/css") {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
