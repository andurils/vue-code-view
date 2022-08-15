<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref, watch } from "vue";

import { useData } from "@examples/composables/config";
import { useSidebar } from "@examples/composables/sidebar";
import { useRoute } from "@examples/composables/router";

import _VPContentPage from "./VPContentPage.vue";
import _VPContentDoc from "./VPContentDoc.vue";
import type { Route, RouteMeta } from "vue-router";

export default defineComponent({
  components: {
    VPContentPage: _VPContentPage,
    VPContentDoc: _VPContentDoc,
  },
  setup(props) {
    const hasSidebar = ref<boolean>(false);
    const hasFooter = ref<boolean>(false);
    const curRoute = ref<Route>();
    const route = useRoute();
    // const { frontmatter } = useData();
    // const { hasSidebar } = useSidebar();

    onMounted(() => {
      // console.log("onMounted root details--", root, root.$route);
      const { hasSidebar: showSidebar, hasFooter: showFooter } = route.value
        .meta as RouteMeta;
      hasSidebar.value = showSidebar;
      hasFooter.value = showFooter;

      // console.log(hasSidebar);
    });

    watch(
      () => route.value,
      (newValue, oldValue) => {
        // console.log(
        //   "watch root details--",
        //   root.$route,
        //   // root.$router,
        //   newValue,
        //   oldValue
        // );
        const { hasSidebar: showSidebar, hasFooter: showFooter } =
          newValue.meta as RouteMeta;
        hasSidebar.value = showSidebar;
        hasFooter.value = showFooter;
      },
      { deep: true }
    );

    return {
      // frontmatter,
      hasFooter,
      hasSidebar,
      route,
    };
  },
});
</script>

<template>
  <div
    id="VPContent"
    class="VPContent"
    :class="{ 'has-sidebar': !!hasSidebar }"
  >
    <!-- <VPContentPage> </VPContentPage> -->
    <!-- <VPContentDoc :class="{ 'has-sidebar': hasSidebar }"> </VPContentDoc> -->

    <!-- <VPNotFound v-if="route.path === 'VPNotFound'" /> -->
    <!-- <VPContentPage v-else-if="!!frontmatter.page"> -->
    <!-- 文档展示 存在侧边/底部 -->
    <VPContentDoc v-if="!!hasSidebar" :class="{ 'has-sidebar': !!hasSidebar }">
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-mid><slot name="aside-mid" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
    </VPContentDoc>
    <VPContentPage v-else :show-footer="hasFooter">
      <template #footer-before><slot name="footer-before" /></template>
      <template #footer-after><slot name="footer-after" /></template>
    </VPContentPage>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .VPContent {
    overflow-x: hidden;
  }
}

@media (min-width: 960px) {
  .VPContent {
    padding-top: var(--vt-nav-height);
  }
  .VPContent.has-sidebar {
    padding-left: var(--vp-sidebar-width-small);
  }
}

@media (min-width: 1440px) {
  .VPContent.has-sidebar {
    padding-left: calc(
      (100vw - var(--vp-screen-max-width)) / 2 + var(--vp-sidebar-width-small)
    );
  }
}
</style>
