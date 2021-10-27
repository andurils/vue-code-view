import Vue from "vue";

/**
 * 获取滚动条宽度
 */
let scrollBarWidth;

export default function () {
  if (Vue.prototype.$isServer) return 0; // 服务器端直接返回
  if (scrollBarWidth !== undefined) return scrollBarWidth; // 如果已经计算过就直接返回之前的

  const outer = document.createElement("div"); // 创建外部的容器
  outer.className = "el-scrollbar__wrap"; // 同样会加入overflow: scroll
  outer.style.visibility = "hidden"; // 不可见
  outer.style.width = "100px"; // 设置一个宽度
  outer.style.position = "absolute"; // 绝对定位
  outer.style.top = "-9999px"; // 移除可视区域
  document.body.appendChild(outer); // 插入

  const widthNoScroll = outer.offsetWidth; // 可是宽度
  outer.style.overflow = "scroll"; // 会显示出滚动条

  const inner = document.createElement("div"); // 创建内部
  inner.style.width = "100%"; // 宽度为100%，实际上因为父级有滚动条，父级的 width 会变成 100px - 滚动条宽度
  outer.appendChild(inner); // 插入

  const widthWithScroll = inner.offsetWidth; // 内部宽度
  outer.parentNode.removeChild(outer); // 移除

  scrollBarWidth = widthNoScroll - widthWithScroll; // 滚动条宽度

  return scrollBarWidth;
}
