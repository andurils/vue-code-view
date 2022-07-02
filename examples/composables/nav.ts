import { ref, unref } from "vue";

export function useNav() {
  const isScreenOpen = ref(false);
  // const isScreenOpen = ref(true); // 测试

  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }

  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }

  function toggleScreen() {
    // console.log("toggleScreen", unref(isScreenOpen));
    isScreenOpen.value ? closeScreen() : openScreen();
  }

  /**
   * Close screen when the user resizes the window wider than tablet size.
   */
  function closeScreenOnTabletWindow() {
    window.outerWidth >= 768 && closeScreen();
  }

  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen,
  };
}
