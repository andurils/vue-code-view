<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  watchEffect,
  provide,
  onUnmounted,
} from "vue";
import { useSidebar } from "@examples/composables/sidebar";
import { useRoute } from "@examples/composables/router";

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
    // 解构
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar,
    } = useSidebar(router.value);

    // https://stackoverflow.com/questions/53126710/how-to-get-current-name-of-route-in-vue
    let triggerElement: HTMLButtonElement | undefined;
    watchEffect(() => {
      triggerElement = isSidebarOpen.value
        ? (document.activeElement as HTMLButtonElement)
        : undefined;
    });

    const onEsacpe = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen.value) {
        closeSidebar();
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

    provide("close-sidebar", closeSidebar);

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
      // Sidebar
      isSidebarOpen,
      openSidebar,
      closeSidebar,
    };
  },
};
</script>
<template>
  <div id="app" class="VPApp" :class="{ 'is-component': isComponent }">
    <!-- <VPSkipLink /> -->
    <VCVBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <Banner />
    <VPNav />
    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="isSidebarOpen">
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
