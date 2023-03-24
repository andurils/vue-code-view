import hasClass from "./hasClass";

export default (target: Element, className: string): Element => {
  if (className) {
    if (target.classList) {
      target.classList.add(className);
    } else if (!hasClass(target, className)) {
      target.className = `${target.className} ${className}`;
    }
  }
  return target;
};
