<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul
      class="me-dropdown-menu me-popper me-dropdown-menu--small dark"
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
  inject: ["dropdown"],
  props: {
    visibleArrow: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      size: "small",
    };
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
  },
};
</script>
