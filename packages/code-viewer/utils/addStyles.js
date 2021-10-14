// https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesClient.js
var hasDocument = typeof document !== "undefined";

var head =
  hasDocument && (document.head || document.getElementsByTagName("head")[0]);
// var ssrIdKey = "data-vue-ssr-id";

export default function addStyles(css) {
  let stle = createStyleElement();
  stle.styleSheet.cssText = css;
}

function createStyleElement() {
  var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  head.appendChild(styleElement);
  return styleElement;
}
