<script lang="ts">
import { defineComponent, computed } from "vue";
import { useData } from "@examples/composables/config";
import { useRoute } from "@examples/composables/router";

import VCVIconChevronLeft from "@examples/components/icons/VCVIconChevronLeft.vue";
import VCVIconChevronRight from "@examples/components/icons/VCVIconChevronRight.vue";

import { getSidebar } from "@examples/utils/sidebar";
import { isActive, normalizeLink } from "@examples/utils/utils";

import { MenuItemWithLink } from "@examples/types/menu";
import { SidebarGroup } from "@examples/types/config";
import { sidebarConfig } from "@examples/settings/projectSetting";
import { useSidebarStore } from "@examples/store/modules/sidebar";

export default defineComponent({
  components: {
    VCVIconChevronLeft,
    VCVIconChevronRight,
  },
  setup() {
    const { theme } = useData();
    const sidebarStore = useSidebarStore();
    // const route = useRoute();
    // const page = route.value;

    const links = computed(() => {
      const sidebar = sidebarStore.getSidebar;
      const candidates = getFlatSideBarLinks(sidebar);
      // console.log("VPContentDocFooter", candidates, sidebar);
      const index = candidates.findIndex((link) =>
        isActive(sidebarStore.getCurrentRoutePath.slice(1), link.link)
      );
      return {
        prev: candidates[index - 1],
        next: candidates[index + 1],
      };
    });

    function getFlatSideBarLinks(sidebar: SidebarGroup[]): MenuItemWithLink[] {
      const links: MenuItemWithLink[] = [];
      for (const group of sidebar) {
        for (const link of group.items) {
          links.push(link);
        }
      }
      return links;
    }
    return {
      // page,
      theme,
      links,
      isActive,
      normalizeLink,
    };
  },
});
</script>

<template>
  <footer v-if="links.prev || links.next" class="VPContentDocFooter">
    <!-- :href="normalizeLink(links.prev.link)" -->
    <router-link v-if="links.prev" class="prev-link" :to="links.prev.link">
      <span class="desc"
        ><VCVIconChevronLeft class="vt-link-icon" /> Previous</span
      >
      <span class="title">{{ links.prev.text }} </span>
    </router-link>
    <!-- :href="normalizeLink(links.next.link)" -->
    <router-link v-if="links.next" class="next-link" :to="links.next.link">
      <span class="desc"
        >Next <VCVIconChevronRight class="vt-link-icon"
      /></span>
      <span class="title">{{ links.next.text }}</span>
    </router-link>
  </footer>
</template>

<style scoped>
.VPContentDocFooter {
  border-top: 1px solid var(--vt-c-divider-light);
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
}

a {
  display: inline-block;
  font-weight: 500;
  font-size: 16px;
  max-width: 48%;
}

.desc {
  font-size: 11px;
  color: var(--vt-c-text-2);
  display: block;
}

.title {
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

a:hover .title {
  color: var(--vt-c-brand-highlight);
}

.next-link {
  margin-left: auto;
  text-align: right;
}

.vt-link-icon {
  margin: -2px 0 0;
  vertical-align: middle;
}
</style>
