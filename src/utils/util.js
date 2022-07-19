// 使用了 core-js
// string hash
// https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function hashCode(content) {
  var hash = 0;
  if (content.length == 0) return hash;
  for (let i = 0; i < content.length; i++) {
    let char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

//  function hashId(filename: string) {
//    const msgUint8 = new TextEncoder().encode(filename); // encode as (utf-8) Uint8Array
//    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
//    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
//    const hashHex = hashArray
//      .map((b) => b.toString(16).padStart(2, "0"))
//      .join(""); // convert bytes to hex string
//    return hashHex.slice(0, 8);
//  }

// 生成一个随机的ID 基于random
export const generateId = function () {
  return Math.floor(Math.random() * 10000);
};

export const isEmpty = function (val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === "boolean") return false;

  if (typeof val === "number") return !val;

  if (val instanceof Error) return val.message === "";

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case "[object String]":
    case "[object Array]":
      return !val.length;

    // Map or Set or File
    case "[object File]":
    case "[object Map]":
    case "[object Set]": {
      return !val.size;
    }
    // Plain Object
    case "[object Object]": {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";

const hasOwnProperty = Object.prototype.hasOwnProperty;

// 用来判断一个属性是定义在对象本身而不是继承自原型链
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * @function  将一个对象的内容合并到目标对象
 * @description 如果对象具有相同的属性，则后者会覆盖前者的属性值
 * @param to 目标对象
 * @param _from 被合并的对象
 */
export function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
}
