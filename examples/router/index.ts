import type { RouteConfig } from "vue-router";

import tutorial from "@examples/router/routes/tutorial";
import guide from "@examples/router/routes/guide";
import Demo from "../views/repl/REPL.vue";

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
  name: "REPL",
  meta: {
    hasFooter: false, // 隐藏 footer
    hasSidebar: false, // 没有 Siderbar
  },
  component: Demo,
};

const ChangelogRoute: RouteConfig = {
  path: "/changelog",
  name: "Changelog",
  component: (r) =>
    require.ensure([], () => r(require("../../CHANGELOG.zh-CN.md"))),
};

const route: Array<RouteConfig> = [
  RootRoute,
  HomeRoute,
  ReplRoute,
  ChangelogRoute,
  guide,
  tutorial,
  {
    path: "/guide/introduction",
    name: "Introduction",
    meta: {
      hasSidebar: true, // 是否有侧边栏
    },
    // component: () => import("@examples/views/home/Home.vue"),
    component: (r) =>
      require.ensure([], () => r(require("@examples/docs/guides/overview.md"))),
  },
  {
    path: "/guide/project-intro",
    name: "ProjectIntro",
    meta: {
      hasSidebar: true, // 是否有侧边栏
      title: "项目工程化简介",
    },
    component: (r) =>
      require.ensure([], () =>
        r(require("@examples/docs/guides/project-intro.md"))
      ),
  },
  {
    path: "/guide/code-logic-intro",
    name: "CodeLogicIntro",
    meta: {
      hasSidebar: true, // 是否有侧边栏
      title: "代码逻辑简介",
    },
    component: (r) =>
      require.ensure([], () =>
        r(require("@examples/docs/guides/code-logic-intro.md"))
      ),
  },
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
