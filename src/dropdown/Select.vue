<template>
  <div class="tab-buttons">
    <button>
      <slot />
      <Icon icon="ic:round-keyboard-arrow-down" class="vcv-icon" />
    </button>
    <div class="options">
      <slot name="items" />
    </div>
    <!-- <ListboxOptions
      position="absolute top-5 right-0"
      bg="dark:dark-900 light-300"
      shadow="~ lg"
      border="rounded-b rounded-tl"
      overflow="hidden"
      list="none"
      outline="focus:none"
      p="0"
      z="5000"
    >
      
    </ListboxOptions> -->
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  components: {
    Icon,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  computed: {
    buttonSize() {
      return this.size;
    },
  },

  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style scoped>
.tab-buttons {
  box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  height: var(--header-height);
  overflow: hidden;
}

.tab-buttons button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
  padding: 0 8px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
}
.tab-buttons span {
  font-size: 13px;
  font-family: var(--font-code);
  text-transform: uppercase;
  color: var(--text-light);
  display: inline-block;
  padding: 6px 6px;
  line-height: 20px;
}
button.active {
  color: var(--color-branding-dark);
  border-bottom: 3px solid var(--color-branding-dark);
}
</style>
