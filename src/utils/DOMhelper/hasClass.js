// https://github.com/rsuite/dom-lib/blob/master/src/classNames/hasClass.ts
export default function (target, className) {
  if (target.classList) {
    return !!className && target.classList.contains(className);
  }
  return ` ${target.className} `.indexOf(` ${className} `) !== -1;
}
