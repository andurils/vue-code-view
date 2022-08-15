<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import { MenuItemWithLink } from "@examples/types/menu";
import { useData } from "@examples/composables/config";
import { isActive } from "@examples/utils/utils";
import { useRoute } from "@examples/composables/router";
import { useSidebarStore } from "@examples/store/modules/sidebar";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MenuItemWithLink>,
      required: true,
    },
  },

  setup() {
    const sidebarStore = useSidebarStore();
    const closeSideBar = inject("close-sidebar") as () => void;

    return {
      isActive,
      closeSideBar,
      sidebarStore,
    };
  },
});
</script>

<template>
  <router-link
    :to="item.link"
    :class="{
      link: true,
      active: isActive(sidebarStore.getCurrentRoutePath.slice(1), item.link),
    }"
    @click="closeSideBar"
  >
    <p class="link-text">{{ item.text }}</p>
  </router-link>
</template>

<style scoped>
.link {
  display: block;
  padding: 6px 0;
}

@media (min-width: 960px) {
  .link {
    padding: 4px 0;
  }
}

.link:hover .link-text {
  color: var(--vt-c-brand-text-1);
  transition: color 0.25s;
}

.link.active .link-text {
  font-weight: 600;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}
</style>
