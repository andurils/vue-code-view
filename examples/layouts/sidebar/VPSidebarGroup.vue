<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import { MenuItemWithLink } from "@examples/types/menu";
import { useData } from "@examples/composables/config";
import { isActive } from "@examples/utils/utils";
import _VPSidebarLink from "./VPSidebarLink.vue";
import { useRoute } from "@examples/composables/router";

export default defineComponent({
  components: {
    VPSidebarLink: _VPSidebarLink,
  },
  props: {
    text: {
      type: String,
      required: true,
    },

    items: {
      type: Array as PropType<MenuItemWithLink[]>,
      // required: true,
    },
  },
  setup(props) {
    const router = useRoute();
    const page = router.value;
    // const { page } = useData();

    const hasActiveLink = () => {
      const { path } = page;
      return props.items?.some((item) => isActive(path.slice(1), item.link));
    };

    return {
      isActive,
      page,
      hasActiveLink,
    };
  },
});
</script>

<template>
  <section class="VPSidebarGroup">
    <div class="title">
      <h2 class="title-text" :class="{ active: hasActiveLink() }">
        {{ text }}
      </h2>
    </div>

    <template>
      <VPSidebarLink v-for="item in items" :item="item" :key="item.link" />
    </template>
  </section>
</template>

<style scoped>
.title {
  padding: 6px 0;
}

@media (min-width: 960px) {
  .title {
    padding: 4px 0;
  }
}

.title-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
}
</style>
