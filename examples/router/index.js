import Demo from "../views/REPL.vue";
import sideNavConfig from "./side-nav.config.json";

const lang = "zh-CN";

// 组件侧边导航 路由注册
const registerRoute = (navConfig) => {
  let route = [];
  // 多语言配置
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/doc`,
      // 重定向
      redirect: `/doc/overview`,
      component: LOAD_Component("pages/zh-CN/main-content.vue"),
      children: [],
    });

    // 组件侧边导航
    navs.forEach((nav) => {
      // 存在外链 不做处理
      if (nav.href) return;
      // group  节点下页面导航
      if (nav.type === "group" && nav.children) {
        nav.children.forEach((nav) => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });

  // 添加路由配置
  function addRoute(page, lang, index) {
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        // description: page.description,
        lang,
      },
      name: page.name,
      component: LOAD_Component(page.componentPath),
    };

    route[index].children.push(child);
  }

  return route;
};

const LOAD_Component = (path) => {
  return (r) => require.ensure([], () => r(require(`@examples/${path}`)));
};

let route = [
  {
    path: "/",
    name: "Home",
    // component: Demo,
    component: () => import("@examples/pages/zh-CN/home.vue"),
  },
  {
    path: "/repl",
    name: "repl",
    component: Demo,
  },
  {
    path: "/changelog",
    name: "changelog",
    component: (r) =>
      require.ensure([], () => r(require("../../CHANGELOG.zh-CN.md"))),
  },
];

let sideRoutes = registerRoute(sideNavConfig);
route = route.concat(sideRoutes);

export default route;
