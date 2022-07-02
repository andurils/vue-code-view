<template>
  <div class="test">
    <h1>VueUse工具插件</h1>
    <div>
      <input type="text" />
    </div>
    <h5 @click="toggle">useFullscreen全屏展示</h5>
    <h5>useActiveElement()当前点击的元素</h5>
    <h5>useBreakpoints选择当前窗口范围</h5>
    <h5>useBrowserLocation浏览器URL信息</h5>

    <div>useClipboard 粘贴功能</div>
    <p>
      当前粘贴内容:
      <code>{{ text || "none" }}</code>
    </p>
    <input v-model="input" type="text" />
    <button @click="copy(input)">Copy</button>

    <div v-if="!isSupported">你的浏览器不支持当前api</div>
    <div>
      <h5>useCssVar控制css变量</h5>
      <div ref="el" style="color: var(--color)">颜色值, {{ color }}</div>
      <button @click="switchColor">改变颜色</button>
    </div>
    <div>
      <h3>开启useDark 黑暗模式</h3>
      <button @click="toggleDark">开启暗黑模式</button>
    </div>

    <div>
      <h4>useEventListener 页面卸载自动卸载监听</h4>
    </div>
    <div>
      <h4>
        useFavicon网站图标更换 一般跟 usePreferredDark当前页面是否是暗黑主题
        还有useDark 一起使用
      </h4>
    </div>
    <div>
      <h4>
        useFetch一款http请求插件，感觉axios的功能都有反正没什么区别感觉可能比axios方便
      </h4>
    </div>
    <div>
      <h4>useMediaControls媒体控制器提供了自定义媒体组件的基本元素</h4>
    </div>
    <div>
      <h4>useMediaQuery媒体查询跟原生html类似</h4>
    </div>
    <div>
      <h4>usePermission</h4>
      <h5>
        未来提高用户体验截止到2021年5月当前api还在实验阶段无法使用,
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API"
          >MDN Web api介绍</a
        >
      </h5>
    </div>
    <div>
      <h4>usePreferredColorScheme</h4>
      <h5>查询当前配色方案 跟,useDark相关函数配合使用</h5>
    </div>
    <div>
      <h4>usePreferredDark</h4>
      <h5>当前页面是否是暗黑主题</h5>
    </div>
    <div>
      <h4>useShare</h4>
      <h5 @click="startShare">点击分享谷歌支持其他平台估计不支持</h5>
    </div>
    <div>
      <h4>useTitle</h4>
      <h5>设置浏览器标题</h5>
    </div>
    <div>
      <h4>useUrlSearchParams</h4>
      <h5>设置浏览器Url参数</h5>
      <ul>
        <li v-for="key in Object.keys(params)" :key="key">
          {{ key }}={{ params[key] }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { reactive, watch, ref } from "vue";
import {
  useFullscreen,
  useActiveElement,
  useBreakpoints,
  useBrowserLocation,
  useClipboard,
  usePermission,
  useCssVar,
  useDark,
  useToggle,
  useScriptTag,
  useShare,
  useTitle,
  useUrlSearchParams,
} from "@vueuse/core";

export default {
  setup() {
    const title = useTitle();
    console.log(title.value); // print current title
    title.value = "Hello"; // change current title
    const { share } = useShare();
    function startShare() {
      share({
        title: "Hello",
        text: "Hello my friend!",
        url: location.href,
      });
    }
    const params = useUrlSearchParams("history");
    params.foo = "bar";
    params.vueuse = "awesome";
    const microphoneAccess = usePermission("microphone");
    const breakpoints = useBreakpoints({
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    });
    const isDark = useDark({
      selector: "body",

      valueDark: "dark",
      valueLight: "light",
    });

    const toggleDark = useToggle(isDark);
    let input = "";
    let el = null;
    const color = useCssVar("--color", el);
    const switchColor = (color) => {
      color.value = color;
    };
    const laptop = breakpoints.between("tablet", "desktop");
    const location = useBrowserLocation();
    const { isFullscreen, toggle } = useFullscreen();
    const activeElement = useActiveElement(); //当前点击的元素
    const { text, copy, isSupported } = useClipboard({ copiedDuring: 1500 });
    watch(isDark, (el) => {
      console.log("是否是含黑模式", el);
    });

    watch(activeElement, (el) => {
      console.log("focus changed to", el);
    });

    return {
      input,
      text,
      isSupported,
      params,
      microphoneAccess,
      copy,
      isFullscreen,
      toggle,
      laptop,
      color,
      switchColor,
      startShare,
      toggleDark,
    };
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Noto+Serif&display=swap"); */
html,
body,
h1,
h2,
h3,
p {
  font-family: "Noto Serif", serif;
  user-select: none;
}
#test {
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
}
img {
  width: 500px;
}
a {
  color: #41b883;
  text-decoration: none;
  cursor: pointer;
}
</style>
