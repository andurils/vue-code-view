import type { RouteConfig } from "vue-router";

const tutorial: RouteConfig = {
  path: `/tutorial`,
  name: "Tutorial",
  component: (r) =>
    require.ensure([], () => r(require("@examples/docs/tutorials/todo.md"))),
  meta: {
    hasSidebar: false, // 属性不设置时，默认为 false
  },
};

export default tutorial;
