<script lang="ts">
import { PropType, defineComponent } from "vue";
import { MenuItemChild } from "../types/menu";
import _VCVMenuLink from "./VCVMenuLink.vue";

export default defineComponent({
  components: { VCVMenuLink: _VCVMenuLink },
  props: {
    text: String,
    items: Array as PropType<MenuItemChild[]>,
  },
});
</script>

<template>
  <div class="vt-menu-group">
    <p v-if="text" class="vt-menu-group-title">{{ text }}</p>

    <template v-for="item in items">
      <VCVMenuLink v-if="'link' in item" :item="item" :key="item.text" />
    </template>
  </div>
</template>
