<template>
  <li
    class="me-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'me-dropdown-menu__item--divided': divided,
    }"
    @click="handleClick"
  >
    <Icon :icon="icon" class="me-dropdown__icon" v-if="icon" />
    <slot></slot>
  </li>
</template>
<script>
import { Icon } from "@iconify/vue2";
import Emitter from "../mixins/emitter";

export default {
  name: "MeDropdownItem",
  mixins: [Emitter],
  components: {
    Icon,
  },
  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String,
  },

  methods: {
    handleClick(e) {
      this.dispatch("MeDropdown", "menu-item-click", [this.command, this]);
    },
  },
};
</script>
