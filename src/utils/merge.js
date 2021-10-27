/**
 * 合并对象
 * @param target 要合并到的对象
 * @returns {Object} 合并后的新对象
 */

export default function (target) {
  // 从第二个参数开始
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}; // 获取该对象
    for (let prop in source) {
      // 只处理不是从原型链上继承来的属性
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}
