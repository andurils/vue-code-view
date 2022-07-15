<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BannerCom",
  setup() {
    /**
     * Adding a new banner:
     * 1. uncomment the banner slot in ../index.ts
     * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
     * 3. update --vt-banner-height if necessary
     */

    let open = ref(true); //$ref(true);
    // restorePreferences.ts
    // (() => {
    //   const restore = (key, cls, def = false) => {
    //     const saved = localStorage.getItem(key);
    //     if (saved ? saved !== "false" : def) {
    //       document.documentElement.classList.add(cls);
    //     }
    //   };
    //   restore("vue-docs-prefer-composition", "prefer-composition");
    //   restore("vue-docs-prefer-sfc", "prefer-sfc", true);

    //   window.__VUE_BANNER_ID__ = "wip";
    //   restore(`vue-docs-banner-${__VUE_BANNER_ID__}`, "banner-dismissed");
    // })();

    /**
     * Call this if the banner is dismissible
     */
    function dismiss() {
      open.value = false;
      document.documentElement.classList.add("banner-dismissed");
      // localStorage.setItem(`vue-docs-banner-${__VUE_BANNER_ID__}`, "true");
    }
    return {
      open,
      dismiss,
    };
  },
});
</script>

<template>
  <div class="banner" v-if="open" @click="dismiss">
    newsletter 已上线！
    <a href="https://www.getrevue.co/profile/vcvnewsletter" target="_blank"
      >欢迎订阅</a
    >
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 24px;
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: var(--vp-z-index-banner);
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vt-banner-height);
  line-height: var(--vt-banner-height);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--vt-c-white);
  background-color: var(--vt-c-blue);
}

.banner-dismissed .banner {
  display: none;
}

a {
  text-decoration: underline;
  color: var(--vt-c-white);
  transition: color 0.5s;
}

.dark a {
  color: var(--vt-c-indigo);
}
</style>
