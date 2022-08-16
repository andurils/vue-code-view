<script lang="ts">
import { defineComponent } from "vue";
import { useConfig } from "@examples/composables/config";
import _VPNavBarMenuLink from "./VPNavBarMenuLink.vue";
import _VPNavBarMenuGroup from "./VPNavBarMenuGroup.vue";
import { nav } from "@examples/settings/projectSetting";

export default defineComponent({
  components: {
    VPNavBarMenuLink: _VPNavBarMenuLink,
    VPNavBarMenuGroup: _VPNavBarMenuGroup,
  },
  setup() {
    // const { config } = useConfig();
    return {
      nav,
    };
  },
});
</script>

<template>
  <nav v-if="nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden"
      >Main Navigation</span
    >
    <template v-for="item in nav">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" :key="item.text" />
      <VPNavBarMenuGroup v-else :item="item" :key="item.text + 'g'" />
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
