// https://github.com/rsuite/dom-lib/blob/master/src/classNames/removeClass.ts

export default function (target, className) {
  if (className) {
    if (target.classList) {
      target.classList.remove(className);
    } else {
      target.className = target.className
        .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, "g"), "$1")
        .replace(/\s+/g, " ") // multiple spaces to one
        .replace(/^\s*|\s*$/g, ""); // trim the ends
    }
  }
  return target;
}
