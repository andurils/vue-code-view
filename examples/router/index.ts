import type { RouteConfig } from "vue-router";

import tutorial from "@examples/router/routes/tutorial";
import guide from "@examples/router/routes/guide";

import Demo from "../views/REPL.vue";

const RootRoute: RouteConfig = {
  path: "/",
  name: "Root",
  redirect: "/home",
  meta: {
    title: "Root",
  },
};
const HomeRoute: RouteConfig = {
  path: "/home",
  name: "Home",
  component: () => import("../views/home/Home.vue"),
  meta: {
    hasFooter: true,
  },
};
const ReplRoute: RouteConfig = {
  path: "/repl",
  name: "repl",
  meta: {
    hasFooter: false, // 隐藏 footer
    hasSidebar: false, // 没有 Siderbar
  },
  component: Demo,
};

const route: Array<RouteConfig> = [
  RootRoute,
  HomeRoute,
  ReplRoute,
  {
    path: "/changelog",
    name: "changelog",
    component: (r) =>
      require.ensure([], () => r(require("../../CHANGELOG.zh-CN.md"))),
  },
  guide,
  tutorial,
];

// // const sideRoutes: Array<RouteConfig> = registerRoute(sideNavConfig);
// // route = route.concat(sideRoutes);

// export const RootRoute: RouteConfig = {
//   path: "/",
//   name: "Root",
//   redirect: "/home",
//   meta: {
//     title: "Root",
//   },
// };

// // Basic routing
// export const basicRoutes = [
//   RootRoute,
//   // ...mainOutRoutes,
//   // REDIRECT_ROUTE,
//   // PAGE_NOT_FOUND_ROUTE,
// ];

export default route;
