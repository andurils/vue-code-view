import Vue from "vue";
import VueRouter from "vue-router";
import Demo from "../views/Demo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Demo,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/changelog",
    name: "Changelog",
    component: (r) =>
      require.ensure([], () => r(require("../../CHANGELOG.zh-CN.md"))),
  },
  {
    path: "/about",
    name: "About",
    component: (r) =>
      require.ensure([], () => r(require("../docs/example.md"))),
  },
];

const router = new VueRouter({
  mode: "hash", // 'hash' | 'history'
  base: process.env.BASE_URL,
  routes,
});

export default router;
