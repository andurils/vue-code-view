import { NavItem, SidebarConfig } from "@examples/types/config";

export const nav: NavItem[] = [
  {
    text: "REPL",
    activeMatch: "^/repl/",
    link: "/repl/",
  },
  {
    text: "文档",
    activeMatch: `^/(guide|tutorial)/`,
    items: [
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "教程",
        link: "/tutorial/",
      },
    ],
  },
  {
    text: "关于",
    activeMatch: "^/changelog/",
    items: [
      {
        items: [
          {
            text: "changelog",
            link: "/changelog/",
          },
          {
            text: "issues",
            link: "https://github.com/andurils/vue-code-view/issues",
          },
        ],
      },
      {
        items: [
          {
            text: "npm",
            link: "https://www.npmjs.com/package/vue-code-view",
          },
        ],
      },
      {
        text: "参考",
        items: [
          {
            text: "Ant Design",
            link: "https://ant.design/index-cn",
          },
          {
            text: "Ant Design Vue",
            link: "https://www.antdv.com/components/overview",
          },
          {
            text: "Element UI",
            link: "https://element.eleme.cn/#/zh-CN",
          },
        ],
      },
    ],
  },
];

export const sidebarConfig: SidebarConfig = {
  "/guide/": [
    {
      text: "简介",
      items: [{ text: "项目简介", link: "/guide/introduction" }],
    },
    {
      text: "组件原理",
      items: [
        { text: "项目工程化简介", link: "/guide/project-intro" },
        {
          text: "代码逻辑简介",
          link: "/guide/code-logic-intro",
        },
      ],
    },
    // {
    //   text: "使用示例",
    //   items: [
    //     {
    //       text: "TODO",
    //       link: "/guide/todo",
    //     },
    //   ],
    // },
  ],
};
