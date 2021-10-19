// https://github.com/rsuite/dom-lib/blob/master/src/classNames/toggleClass.ts
import hasClass from "./hasClass";
import addClass from "./addClass";
import removeClass from "./removeClass";

export default function (target, className) {
  if (hasClass(target, className)) {
    return removeClass(target, className);
  }
  return addClass(target, className);
}
