<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul
      class="me-dropdown-menu me-popper"
      :class="[isDark && `dark`]"
      v-show="showPopper"
    >
      <slot></slot>
    </ul>
  </transition>
</template>
<script>
import Popper from "../utils/vue-popper";

export default {
  name: "MeDropdownMenu",
  componentName: "MeDropdownMenu",
  mixins: [Popper],
  inject: ["dropdown", "vcv"],
  props: {
    visibleArrow: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      themeMode: this.vcv.themeMode,
    };
  },

  computed: {
    isDark() {
      console.log("themeMode", this.vcv.themeMode);
      return this.themeMode === "dark";
    },
  },
  created() {
    this.$on("updatePopper", () => {
      if (this.showPopper) this.updatePopper();
    });
    this.$on("visible", (val) => {
      this.showPopper = val;
    });
  },

  mounted() {
    this.dropdown.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.dropdown.$el;
    this.dropdown.initEvent();
  },

  watch: {
    "dropdown.placement": {
      immediate: true,
      handler(val) {
        this.currentPlacement = val;
      },
    },
    "vcv.themeMode": {
      immediate: true,
      handler(val) {
        this.themeMode = val;
      },
    },
  },
};
</script>
