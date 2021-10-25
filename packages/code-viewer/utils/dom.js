/* istanbul ignore next */
import Vue from "vue";

const isServer = Vue.prototype.$isServer; // Vue.prototype.$isServer表示当前是否是在服务器端渲染
// eslint-disable-next-line no-useless-escape
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode); // ieVersion IE版本

/* istanbul ignore next */
// 去除字符串首尾空白
const trim = function (string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
/* istanbul ignore next */
// 将字符串转为小驼峰命名的格式
const camelCase = function (name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
};

/* istanbul ignore next */
// 匿名函数自执行 绑定事件，兼容IE-attachEvent,chrome-addEventListener
export const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    // 兼容不支持 document.addEventListener，例如低版本IE
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
// 匿名函数自执行函数 移除绑定的事件，兼容IE-detachEvent,chrome-removeEventListener
export const off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    // 兼容不支持 document.removeEventListener，例如低版本IE
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
// once 注册事件，执行时自动移除所注册的事件
export const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      // 自动执行fn，并指定fn执行上下文，使用apply将数组参数传递给fn
      fn.apply(this, arguments);
    }
    // 执行过之后就 移除绑定的事件
    off(el, event, listener);
  };
  // 绑定listener，用listener 来执行fn,和释放fn
  on(el, event, listener);
};

/* istanbul ignore next */
// 指定 dom 上是否含有某个 class 类名
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  // 类名中不能包含空格
  if (cls.indexOf(" ") !== -1) {
    throw new Error("className should not contain space.");
  }
  if (el.classList) {
    // Element.classList： https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/* istanbul ignore next */
// 添加class类名
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  // 将 cls 以空格分割为 数组，也就是说支持一次性添加多个class类名
  var classes = (cls || "").split(" ");

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      // classList.add： 如果这些类已经存在于元素的属性中，那么它们将被忽
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      // 添加前需要检测是否已存在
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
// 移除class类名
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(" ");
  // 将 cls 以空格分割为 数组，也就是说支持一次性删除多个class类名
  var curClass = " " + el.className + " ";

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      // 防止出现多余空格
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
// 获取样式
export const getStyle =
  ieVersion < 9
    ? function (element, styleName) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === "float") {
          styleName = "styleFloat";
        }
        try {
          switch (styleName) {
            case "opacity":
              try {
                return element.filters.item("alpha").opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/currentStyle
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null;
          }
        } catch (e) {
          return element.style[styleName];
        }
      }
    : function (element, styleName) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === "float") {
          styleName = "cssFloat";
        }
        try {
          // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
          var computed = document.defaultView.getComputedStyle(element, "");
          return element.style[styleName] || computed
            ? computed[styleName]
            : null;
        } catch (e) {
          return element.style[styleName];
        }
      };

/* istanbul ignore next */
// 设置样式
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;
  // styleName 支持设置为对象格式，一次设置多个样式
  if (typeof styleName === "object") {
    for (var prop in styleName) {
      // eslint-disable-next-line no-prototype-builtins
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === "opacity" && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ""
        : "alpha(opacity=" + value * 100 + ")";
    } else {
      element.style[styleName] = value;
    }
  }
}

// 查看 dom 元素的 overflow 样式
export const isScroll = (el, vertical) => {
  if (isServer) return;

  const determinedDirection = vertical !== null || vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, "overflow-y")
      : getStyle(el, "overflow-x")
    : getStyle(el, "overflow");

  return overflow.match(/(scroll|auto)/);
};

// 由当前元素向上查找到第一个设置 overflow 为 scroll 或 auto 样式的祖先元素
export const getScrollContainer = (el, vertical) => {
  if (isServer) return;

  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

// 查看当前元素（el）是否在某个元素（container）中
export const isInContainer = (el, container) => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};
