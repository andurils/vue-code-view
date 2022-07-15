<script lang="ts">
import { provide, defineComponent } from "vue";
import { useNav } from "@examples/composables/nav";
import { useSidebar } from "@examples/composables/sidebar";
import { useRoute } from "@examples/composables/router";
import _VPNavBar from "./VPNavBar.vue";
import _VPNavScreen from "./VPNavScreen.vue";

export default defineComponent({
  components: {
    VPNavBar: _VPNavBar,
    VPNavScreen: _VPNavScreen,
  },
  setup(props) {
    const router = useRoute();
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const { hasSidebar } = useSidebar(router.value);
    provide("close-screen", closeScreen);

    return {
      hasSidebar,
      isScreenOpen,
      closeScreen,
      toggleScreen,
    };
  },
});
</script>

<template>
  <header class="VPNav nav-bar" :class="{ stick: !hasSidebar }">
    <VPNavBar :is-screen-open="isScreenOpen" @toggle-screen="toggleScreen">
      <template #navbar-title>
        <slot name="navbar-title" />
      </template>
    </VPNavBar>
    <VPNavScreen :open="isScreenOpen" />
  </header>
</template>

<style scoped>
.VPNav {
  position: relative;
  top: 0;
  left: 0;
  z-index: var(--vp-z-index-nav);
}

@media (min-width: 960px) {
  .VPNav {
    position: fixed;
    top: var(--vt-banner-height, 0px);
    width: 100%;
  }
}
</style>
