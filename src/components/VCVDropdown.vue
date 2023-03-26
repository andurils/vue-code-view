<script setup lang="ts">
import { ref, PropType } from "vue";
import { DropdownItem, DropdownItemChild } from "types/vcv";
import VCVIconChevronDown from "./IconChevronDown.vue";
import VCVMenuLink from "./VCVDropdownItem.vue";
import { useFocusContainer } from "../composables/focusContainer";

defineProps({
  button: String,
  items: Array as PropType<(DropdownItem | DropdownItemChild)[]>,
  label: String,
});
const emit = defineEmits(["click-item"]);

const open = ref(false);
const elRef = ref<HTMLElement>();

const onBlur = () => {
  open.value = false;
};

useFocusContainer({
  elRef,
  onBlur,
});

const selectItem = (item: any) => {
  emit("click-item", item);
};
</script>

<template>
  <div
    class="vcv-dropdown"
    ref="elRef"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="vcv-dropdown-button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span class="vcv-dropdown-button-text">
        {{ button }}
        <VCVIconChevronDown class="vcv-dropdown-button-text-icon" />
      </span>
    </button>

    <div class="vcv-dropdown-menu">
      <div class="vcv-menu">
        <div v-if="items" class="vcv-menu-items">
          <template v-for="item in items">
            <VCVMenuLink
              v-if="'key' in item"
              :item="item"
              :key="item.label"
              @click.native="selectItem(item)"
            />
            <div class="vcv-menu-group" v-else :key="item.label + '-g'">
              <p v-if="item.label" class="vcv-menu-group-title">
                {{ item.label }}
              </p>
              <template v-for="subItem in item.items">
                <VCVMenuLink
                  v-if="'key' in subItem"
                  :item="subItem"
                  :key="subItem.label"
                  @click.native="selectItem(subItem)"
                />
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vcv-dropdown {
  position: relative;
  width: 100px;
}

.vcv-dropdown:hover {
  color: var(--vt-c-bland);
  transition: color 0.25s;
}

.vcv-dropdown:hover .vcv-dropdown-button-text {
  color: var(--vt-c-text-2);
}

.vcv-dropdown:hover .vcv-dropdown-button-icon {
  fill: var(--vt-c-text-2);
}

.vcv-dropdown:hover .vcv-dropdown-menu,
.vcv-dropdown-button[aria-expanded="true"] + .vcv-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.vcv-dropdown-button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  /* height: var(--vt-nav-height); */
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.vcv-dropdown-button-text {
  display: flex;
  align-items: center;
  /* line-height: var(--vt-nav-height); */
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.vcv-dropdown-button-text-icon {
  margin-left: 4px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.vcv-dropdown-button-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill 0.25s;
}

.vcv-dropdown-menu {
  position: absolute;
  top: calc(var(--vt-nav-height) / 2 + 15px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
}

.vcv-menu {
  border-radius: 8px;
  padding: 12px 0;
  min-width: 192px;
  border: 1px solid transparent;
  background: var(--vt-c-bg);
  box-shadow: var(--vt-shadow-3);
  transition: background-color 0.5s;
}

.dark .vcv-menu {
  background: var(--vt-c-bg);
  box-shadow: var(--vt-shadow-1);
  border: 1px solid var(--vt-c-divider-light);
}

.vcv-menu-items {
  transition: border-color 0.5s;
}

.vcv-menu .vcv-menu-group {
  padding: 0 0 12px;
}

.vcv-menu .vcv-menu-group + .vcv-menu-group {
  border-top: 1px solid var(--vt-c-divider-light);
  padding: 11px 0 12px;
}

.vcv-menu .vcv-menu-group:last-child {
  padding-bottom: 0;
}

.vcv-menu .vcv-menu-group + .vcv-menu-item-item {
  border-top: 1px solid var(--vt-c-divider-light);
  padding: 11px 16px 0;
}

.vcv-menu .vcv-menu-item {
  padding: 0 16px;
  white-space: nowrap;
}

.vcv-menu-label {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

.vcv-menu-action {
  padding-left: 24px;
}

.vcv-menu-group-title {
  padding: 0 18px;
  line-height: 28px;
  font-size: 10px;
  font-weight: 600;
  color: var(--vt-c-text-3);
  text-transform: uppercase;
  transition: color 0.25s;
}
</style>
