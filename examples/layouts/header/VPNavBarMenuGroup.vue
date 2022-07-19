<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NavItemWithChildren } from "@examples/types/config";
import { useData } from "@examples/composables/config";
import _VCVFlyout from "@examples/components/VCVFlyout.vue";
import { isActive } from "@examples/utils/utils";
import { useRoute } from "@examples/composables/router";

export default defineComponent({
  components: { VCVFlyout: _VCVFlyout },
  props: {
    item: {
      type: Object as PropType<NavItemWithChildren>,
      required: true,
    },
  },
  setup(props) {
    const page = useRoute();
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
