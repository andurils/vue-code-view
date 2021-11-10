import Demo from "../views/Demo.vue";
import navConfig from "./nav.config.json";

const lang = "zh-CN";

// 加载网站多语言页面的 .vue 文件
const LOAD_MAP = {
  "zh-CN": (name) => {
    return (r) =>
      require.ensure(
        [],
        () => r(require(`../pages/zh-CN/${name}.vue`)),
        "zh-CN"
      );
  },
  // "en-US"
};

const load = function (lang, path) {
  console.log(lang, path);
  return LOAD_MAP[lang](path);
};
// 加载网站组件文档多语言的 .md 文件
const LOAD_DOCS_MAP = {
  "zh-CN": (path) => {
    return (r) =>
      require.ensure([], () => r(require(`../docs/zh-CN${path}.md`)), "zh-CN");
  },
  // "en-US": (path) => {
  //   return (r) =>
  //     require.ensure([], () => r(require(`./docs/en-US${path}.md`)), "en-US");
  // },
};

const loadDocs = function (lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

// 组件页面 路由注册
const registerRoute = (navConfig) => {
  let route = [];
  // 多语言配置
  Object.keys(navConfig).forEach((lang, index) => {
    // 页面导航配置
    let navs = navConfig[lang];
    // 添加"组件"页面路由
    route.push({
      path: `/component`,
      // 重定向
      // redirect: `/${lang}/component/installation`,
      component: load(lang, "component"),
      children: [],
    });

    // 组件文档路由添加  参考组件页面侧边导航
    navs.forEach((nav) => {
      // 存在外链 不做处理
      if (nav.href) return;
      // “组件” 节点下页面导航
      if (nav.groups) {
        nav.groups.forEach((group) => {
          group.list.forEach((nav) => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        // "开发指南" 节点下页面导航
        nav.children.forEach((nav) => {
          addRoute(nav, lang, index);
        });
      } else {
        // 没有子集菜单节点路由  例如 更新日志
        addRoute(nav, lang, index);
      }
    });
  });
  // 添加路由配置
  function addRoute(page, lang, index) {
    // 若是路径 更新日志 路由加载页面 load changelog.vue，
    // 其他路径 默认加载 项目文档 .md文件
    const component =
      page.path === "/changelog"
        ? load(lang, "changelog")
        : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang,
      },
      name: "component-" + lang + (page.title || page.name),
      component: component.default || component,
    };

    route[index].children.push(child);
  }

  return route;
};

// let route = registerRoute(navConfig);

const route = [
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

// route.concat(routesOther);

// route.push({
//   path: "/play",
//   name: "play",
//   component: require("../play/index.vue"),
// });

// // 添加"组件"页面路由
// route.push({
//   path: `/component`,
//   name: "component",
//   // 重定向
//   // redirect: `/component/installation`,
//   component: load(lang, "component"),
//   children: [],
// });

export default route;
