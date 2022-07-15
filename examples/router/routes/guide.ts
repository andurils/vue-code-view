import type { RouteConfig } from "vue-router";

const guide: RouteConfig = {
  path: `/guide`,
  name: "Guide",
  redirect: `/guide/introduction`,
  component: (r) =>
    require.ensure([], () => r(require("@examples/docs/guides/overview.md"))),
  meta: {
    hasSidebar: true, // 是否有侧边栏
  },
  children: [
    {
      path: "introduction",
      name: "Introduction",
      meta: {
        hasSidebar: true, // 是否有侧边栏
      },
      // component: () => import("@examples/views/home/Home.vue"),
      component: (r) =>
        require.ensure([], () =>
          r(require("@examples/docs/guides/overview.md"))
        ),
    },
    {
      path: "project-intro",
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
      path: "code-logic-intro",
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
  ],
};

export default guide;
