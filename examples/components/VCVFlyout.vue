<script lang="ts">
import { ref, PropType, defineComponent } from "vue";
import { MenuItem, MenuItemChild } from "../types/menu";
import { useFocusContainer } from "../composables/focusContainer";
import VCVIconChevronDown from "./icons/VCVIconChevronDown.vue";
import VCVIconMoreHorizontal from "./icons/VCVIconMoreHorizontal.vue";
import _VCVMenu from "./VCVMenu.vue";

export default defineComponent({
  components: {
    VCVIconChevronDown,
    VCVIconMoreHorizontal,
    VCVMenu: _VCVMenu,
  },
  props: {
    button: String,
    items: Array as PropType<(MenuItem | MenuItemChild)[]>,
    label: String,
  },
  setup(props) {
    const open = ref(false);
    const elRef = ref<HTMLElement>();

    const onBlur = () => {
      open.value = false;
    };

    useFocusContainer({
      elRef,
      onBlur,
    });

    return {
      open,
      elRef,
    };
  },
});
</script>

<template>
  <div
    class="vt-flyout"
    ref="elRef"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="vt-flyout-button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="button" class="vt-flyout-button-text">
        {{ button }}
        <VCVIconChevronDown class="vt-flyout-button-text-icon" />
      </span>

      <VCVIconMoreHorizontal v-else class="vt-flyout-button-icon" />
    </button>

    <div class="vt-flyout-menu">
      <VCVMenu :items="items">
        <slot />
      </VCVMenu>
    </div>
  </div>
</template>
