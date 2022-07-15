<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { MenuItemChild } from "@examples/types/menu";
import VCVIconPlus from "@examples/components/icons/VCVIconPlus.vue";
import _VPNavScreenMenuGroupLink from "./VPNavScreenMenuGroupLink.vue";
import _VPNavScreenMenuGroupSection from "./VPNavScreenMenuGroupSection.vue";

export default defineComponent({
  components: {
    VCVIconPlus,
    VPNavScreenMenuGroupLink: _VPNavScreenMenuGroupLink,
    VPNavScreenMenuGroupSection: _VPNavScreenMenuGroupSection,
  },
  props: {
    text: String,
    items: {
      type: Array as PropType<MenuItemChild[]>,
    },
  },
  setup(props) {
    const isOpen = ref(false);

    const groupId = computed(
      () => `NavScreenGroup-${props.text?.replace(" ", "-").toLowerCase()}`
    );

    function toggle() {
      isOpen.value = !isOpen.value;
    }
    return {
      isOpen,
      groupId,
      toggle,
    };
  },
});
</script>

<template>
  <div class="VPNavScreenMenuGroup" :class="{ open: isOpen }">
    <button
      class="button"
      :aria-controls="groupId"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="button-text">{{ text }}</span>
      <VCVIconPlus class="button-icon" />
    </button>

    <div :id="groupId" class="items">
      <template v-for="item in items">
        <div v-if="'link' in item" :key="item.text" class="item">
          <VPNavScreenMenuGroupLink :text="item.text" :link="item.link" />
        </div>

        <div v-else class="group" :key="item.text + ''">
          <VPNavScreenMenuGroupSection :text="item.text" :items="item.items" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.VPNavScreenMenuGroup {
  border-bottom: 1px solid var(--vt-c-divider-light);
  height: 48px;
  overflow: hidden;
  transition: border-color 0.5s;
}
.VPNavScreenMenuGroup .items {
  visibility: hidden;
}
.VPNavScreenMenuGroup.open .items {
  visibility: visible;
}

.VPNavScreenMenuGroup.open {
  padding-bottom: 10px;
  height: auto;
}

.VPNavScreenMenuGroup.open .button {
  padding-bottom: 6px;
  color: var(--vt-c-brand);
}

.VPNavScreenMenuGroup.open .button-icon {
  transform: rotate(45deg);
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px 11px 0;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.button:hover {
  color: var(--vt-c-brand);
}

.button-icon {
  width: 14px;
  height: 14px;
  fill: var(--vt-c-text-2);
  transition: fill 0.5s, transform 0.25s;
}

.group:first-child {
  padding-top: 4px;
}
.group + .group {
  padding-top: 8px;
}
.group + .item {
  padding-top: 8px;
}
</style>
