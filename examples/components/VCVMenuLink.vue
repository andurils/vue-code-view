<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuItemWithLink } from "../types/menu";
import _VCVLink from "./VCVLink.vue";

export default defineComponent({
  components: { VCVLink: _VCVLink },
  props: {
    item: {
      type: Object as PropType<MenuItemWithLink>,
      required: true,
    },
  },
});
</script>

<template>
  <VCVLink class="vt-menu-link" :href="item.link">
    {{ item.text }}
  </VCVLink>
</template>
