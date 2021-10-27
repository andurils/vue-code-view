// https://github.com/rsuite/dom-lib/blob/master/src/classNames/addClass.ts
import hasClass from "./hasClass";

export default function (target, className) {
  if (className) {
    if (target.classList) {
      target.classList.add(className);
    } else if (!hasClass(target, className)) {
      target.className = `${target.className} ${className}`;
    }
  }
  return target;
}
