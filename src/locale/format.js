import { hasOwn } from "../utils/util";

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

export default function (Vue) {
  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === "object") {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      let result;
      if (string[index - 1] === "{" && string[index + match.length] === "}") {
        return i;
      } else {
        result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return "";
        }
        return result;
      }
    });
  }

  return template;
}
