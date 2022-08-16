<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  watchEffect,
  provide,
  onUnmounted,
  watch,
} from "vue";
import { useSidebar } from "@examples/composables/sidebar";
import { useRoute } from "@examples/composables/router";
import { useSidebarStore } from "./store/modules/sidebar";

export default {
  name: "App",
  components: {
    Banner: () => import("./views/banner/Banner.vue"),
    VPNav: () => import("./layouts/header/VPNav.vue"),
    VPLocalNav: () => import("./layouts/sidebar/VPLocalNav.vue"),
    VPAnnouncer: () => import("./layouts/content/VPAnnouncer.vue"),
    VPContent: () => import("./layouts/content/VPContent.vue"),
    VPSidebar: () => import("./layouts/sidebar/VPSidebar.vue"),
    VCVBackdrop: () => import("./components/VCVBackdrop.vue"),
  },

  setup() {
    const router = useRoute();
    const sidebarStore = useSidebarStore();
    sidebarStore.setCurrentRoute(router.value);

    watch(router, (newValue, oldValue) => {
      sidebarStore.setCurrentRoute(newValue);
    });

    // https://stackoverflow.com/questions/53126710/how-to-get-current-name-of-route-in-vue
    let triggerElement: HTMLButtonElement | undefined;
    watchEffect(() => {
      triggerElement = sidebarStore.getSidebarOpen
        ? (document.activeElement as HTMLButtonElement)
        : undefined;
    });

    const onEsacpe = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarStore.getSidebarOpen) {
        sidebarStore.setSidebarClose();
        triggerElement?.focus();
      }
    };

    onMounted(() => {
      // console.log("vcv is mounted!");
      window.addEventListener("keyup", onEsacpe);
    });
    onUnmounted(() => {
      window.removeEventListener("keyup", onEsacpe);
    });

    provide("close-sidebar", sidebarStore.setSidebarClose);

    const isComponent = computed(
      () =>
        // return /^component-/.test(this.$route.name || "");
        router.value.path.indexOf("component") > -1
    );
    const isRepl = computed(() => router.value.path.indexOf("repl") > -1);
    const isChangelog = computed(() =>
      /^changelog/.test(router.value.name || "")
    );
    const isHome = computed(
      () =>
        // return /^home/.test(this.$route.name || "");
        router.value.path.length <= 1
    );

    return {
      isComponent,
      isRepl,
      isChangelog,
      isHome,

      sidebarStore,
      openSidebar: sidebarStore.setSidebarOpen,
      closeSidebar: sidebarStore.setSidebarClose,
    };
  },
};
</script>
<template>
  <div id="app" class="VPApp" :class="{ 'is-component': isComponent }">
    <!-- <VPSkipLink /> -->
    <VCVBackdrop
      class="backdrop"
      :show="sidebarStore.getSidebarOpen"
      @click.native="closeSidebar"
    />
    <Banner />
    <VPNav />
    <!-- 左侧导航隐藏后显示 -->
    <VPLocalNav :open="sidebarStore.getSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="sidebarStore.getSidebarOpen">
      <template #top> </template>
      <template #bottom> </template>
    </VPSidebar>
    <VPContent />
    <VPAnnouncer />
  </div>
</template>
<style scoped>
.VPApp {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--vt-c-bg);
  transition: background-color 0.5s;
  padding-top: var(--vt-banner-height);
}

.backdrop {
  z-index: var(--vp-z-index-backdrop);
}

.markdown-body {
  box-sizing: border-box;
  max-width: 980px;
  margin: 0 auto;
  padding: 40px;
}
</style>
