import { defineStore } from "pinia";
import { store } from "@examples/store";
import { getSidebar } from "@examples/utils/sidebar";
import type { Route, RouteMeta } from "vue-router";
import { sidebarConfig } from "@examples/settings/projectSetting";
import { SidebarGroup } from "@examples/types/config";

interface SidebarState {
  curRoute: Nullable<Route>;
  isOpen: boolean;
}

export const useSidebarStore = defineStore("app-sidebar", {
  state: (): SidebarState => ({
    curRoute: null,
    isOpen: false,
  }),
  getters: {
    // getCurrentRoute(): Nullable<Route> {
    //   return this.curRoute;
    // },
    getCurrentRoutePath(): string {
      return this.curRoute?.path || "";
    },
    getSidebarOpen(): boolean {
      return this.isOpen;
    },
    getSidebar(): SidebarGroup[] {
      const relativePath = this.curRoute?.path || "";
      return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
    },
    getHasSidebar(): boolean {
      return this.getSidebar.length > 0;
    },
  },
  actions: {
    setCurrentRoute(pageRoute: Route) {
      this.curRoute = pageRoute;
      this.isOpen = this.getHasSidebar;
    },
    setSidebarOpen() {
      this.isOpen = true;
    },
    setSidebarClose() {
      this.isOpen = false;
    },
    setSidebarToggle() {
      this.isOpen ? this.setSidebarClose() : this.setSidebarOpen();
    },
  },
  persist: true,
});

// Need to be used outside the setup
export function useSidebarStoreWithOut() {
  return useSidebarStore(store);
}
