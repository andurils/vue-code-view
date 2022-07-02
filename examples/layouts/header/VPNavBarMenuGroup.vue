<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NavItemWithChildren } from "@examples/types/config";
import { useData } from "@examples/composables/config";
import _VCVFlyout from "@examples/components/VCVFlyout.vue";
import { isActive } from "@examples/utils/utils";

export default defineComponent({
  components: { VCVFlyout: _VCVFlyout as any },
  props: {
    item: {
      type: Object as PropType<NavItemWithChildren>,
      required: true,
    },
  },
  setup(_, { root }) {
    const page = root.$route;
    return {
      page,
      isActive,
    };
  },
});
</script>

<template>
  <VCVFlyout
    :class="{
      VPNavBarMenuGroup: true,
      active: isActive(page.path.slice(1), item.activeMatch, true),
    }"
    :button="item.text"
    :items="item.items"
  />
</template>

<style scoped>
.VPNavBarMenuGroup.active {
  border-bottom: 1px solid var(--vt-c-brand);
  height: var(--vt-nav-height);
}
</style>
