import Vue from "vue";
import VueRouter from "vue-router";
import Demo from "../views/Demo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Demo,
    component: () => import("../pages/zh-CN/index.vue"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/test",
    name: "Test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test.vue"),
  },
  {
    path: "/changelog",
    name: "Changelog",
    component: (r) =>
      require.ensure([], () => r(require("../../CHANGELOG.zh-CN.md"))),
  },
  {
    path: "/md",
    name: "Markdown",
    component: (r) =>
      require.ensure([], () => r(require("../docs/zh-CN/example.md"))),
  },
];

const router = new VueRouter({
  mode: "hash", // 'hash' | 'history'
  base: process.env.BASE_URL,
  routes,
});

export default router;
