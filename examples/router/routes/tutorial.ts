import type { RouteConfig } from "vue-router";

const tutorial: RouteConfig = {
  path: `/tutorial`,
  name: "Tutorial",
  component: () => import("../../views/home/Home.vue"),
  meta: {
    hasSidebar: false, // 属性不设置时，默认为 false
  },
};

export default tutorial;
