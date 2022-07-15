// import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";

import type { RouteConfig } from "vue-router";
import {
  REDIRECT_NAME,
  //   LAYOUT,
  EXCEPTION_COMPONENT,
  PAGE_NOT_FOUND_NAME,
} from "@examples/router/constant";

// import {
//   PAGE_NOT_FOUND_ROUTE,
//   //   REDIRECT_ROUTE,
// } from "@examples/router/routes/basic";

// import { mainOutRoutes } from "./mainOut";
// import { PageEnum } from "/@/enums/pageEnum";
// import { t } from "/@/hooks/web/useI18n";

// const modules = import.meta.globEager("./modules/**/*.ts");

// const routeModuleList: AppRouteModule[] = [];

// Object.keys(modules).forEach((key) => {
//   const mod = modules[key].default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   routeModuleList.push(...modList);
// });

// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 404 on a page
const PAGE_NOT_FOUND_ROUTE: RouteConfig = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: EXCEPTION_COMPONENT,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
};

export const RootRoute: RouteConfig = {
  path: "/",
  name: "Root",
  redirect: "/home",
  meta: {
    title: "Root",
  },
};

// Basic routing without permission
export const basicRoutes = [
  RootRoute,
  //   ...mainOutRoutes,
  //   REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
