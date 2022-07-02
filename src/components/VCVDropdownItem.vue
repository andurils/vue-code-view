<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Icon } from "@iconify/vue2";
import { MenuItemWithLink } from "@examples/types/menu";
import { DropdownItemWithLink, DropdownItemChild } from "types/vcv";
// import _VCVLink from "@examples/components/VCVLink.vue";

export default defineComponent({
  components: { Icon },
  props: {
    item: {
      type: Object as PropType<DropdownItemWithLink>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="vt-menu-link">
    <Icon :icon="item.icon" class="vcv-icon" v-if="item.icon" />
    {{ item.label }}
  </div>
</template>
