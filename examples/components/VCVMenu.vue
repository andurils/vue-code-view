<script lang="ts">
import { PropType, defineComponent } from "vue";
import { MenuItem, MenuItemChild } from "../types/menu";
import _VCVMenuLink from "./VCVMenuLink.vue";
import _VCVMenuGroup from "./VCVMenuGroup.vue";

export default defineComponent({
  components: {
    VCVMenuLink: _VCVMenuLink,
    VCVMenuGroup: _VCVMenuGroup,
  },
  props: {
    items: Array as PropType<(MenuItem | MenuItemChild)[]>,
  },
});
</script>

<template>
  <div class="vt-menu">
    <div v-if="items" class="vt-menu-items">
      <template v-for="item in items">
        <VCVMenuLink v-if="'link' in item" :item="item" :key="item.text" />
        <VCVMenuGroup
          v-else
          :text="item.text"
          :items="item.items"
          :key="item.text"
        />
      </template>
    </div>

    <slot />
  </div>
</template>
