<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NavItemWithLink } from "@examples/types/config";
import { useData } from "@examples/composables/config";
import _VCVLink from "@examples/components/VCVLink.vue";
import { isActive } from "@examples/utils/utils";
import { useRoute } from "@examples/composables/router";

export default defineComponent({
  components: { VCVLink: _VCVLink },
  props: {
    item: {
      type: Object as PropType<NavItemWithLink>,
      required: true,
    },
  },
  setup(props) {
    const page = useRoute();
    // const { page } = useData();
    return {
      page,
      isActive,
    };
  },
});
</script>

<template>
  <VCVLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive(
        page.path.slice(1),
        item.activeMatch || item.link,
        !!item.activeMatch
      ),
    }"
    :href="item.link"
    :noIcon="true"
  >
    {{ item.text }}
  </VCVLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: block;
  padding: 0 12px;
  line-height: calc(var(--vt-nav-height) - 1px);
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.VPNavBarMenuLink.active {
  border-bottom: 1px solid var(--vt-c-brand);
}

.VPNavBarMenuLink:hover {
  color: var(--vt-c-brand);
}
</style>
