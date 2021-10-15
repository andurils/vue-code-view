// github.com/vuejs/vue-style-loader/blob/master/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */

export function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = parentId; //item[0];
    var content = item["content"];
    var css = item["css"];
    // var media = item[2];
    // var sourceMap = item[3];
    var part = {
      id: parentId + ":" + i,
      content: content,
      css: css,
      //   media: media,
      //   sourceMap: sourceMap,
    };
    if (!newStyles[id]) {
      styles.push((newStyles[id] = { id: id, parts: [part] }));
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
}
