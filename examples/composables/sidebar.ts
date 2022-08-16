import { ref, computed } from "vue";
import { getSidebar } from "../utils/sidebar";
import { useConfig, useData } from "./config";
import type { Route, RouteMeta } from "vue-router";
import { sidebarConfig } from "@examples/settings/projectSetting";

export function useSidebar(curRoute: Route) {
  const { config } = useConfig();
  const { frontmatter } = useData();
  // const route = useRoute();
  const route = ref<Route>(curRoute);

  const isOpen = ref(false);

  const sidebar = computed(() => {
    // const sidebarConfig = sidebar;
    const relativePath = route.value.path;
    // console.log(`path`, route, route.value.path, relativePath);
    // console.log(`sidebarConfig`, sidebarConfig);
    // console.log(`sidebarConfig`, getSidebar(sidebarConfig, relativePath));
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });

  const hasSidebar = computed(
    () => sidebar.value.length > 0
    // () => frontmatter.sidebar !== false && sidebar.value.length > 0
  );
  // const hasSidebar = false;

  function open() {
    console.log(`useSidebar`, isOpen);
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    isOpen.value ? close() : open();
  }

  return {
    isOpen,
    sidebar,
    hasSidebar,
    open,
    close,
    toggle,
  };
}
