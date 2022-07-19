<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuItemWithLink } from "@examples/types/menu";
import _VPNavScreenMenuGroupLink from "./VPNavScreenMenuGroupLink.vue";

export default defineComponent({
  components: { VPNavScreenMenuGroupLink: _VPNavScreenMenuGroupLink },
  props: {
    text: String,
    items: {
      type: Array as PropType<MenuItemWithLink[]>,
    },
  },
});
</script>

<template>
  <div class="VPNavScreenMenuGroupSection">
    <p v-if="text" class="title">{{ text }}</p>
    <VPNavScreenMenuGroupLink
      v-for="item in items"
      :key="item.text"
      :text="item.text"
      :link="item.link"
    />
  </div>
</template>

<style scoped>
.VPNavScreenMenuGroupSection {
  display: block;
}

.title {
  line-height: 32px;
  font-size: 11px;
  font-weight: 700;
  color: var(--vt-c-text-2);
  text-transform: uppercase;
  transition: color 0.25s;
}
</style>
