<script setup lang="ts">
import { PropType } from "vue";
import { Icon } from "@iconify/vue2";
import { DropdownItemWithLink } from "types/vcv";

defineProps({
  item: {
    type: Object as PropType<DropdownItemWithLink>,
    required: true,
  },
});
</script>

<template>
  <div class="vcv-menu-link">
    <Icon :icon="item.icon" class="vcv-icon" v-if="item.icon" />
    {{ item.label }}
  </div>
</template>

<style scoped>
.vcv-menu-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 18px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 400;
  color: var(--vt-c-text-1);
  white-space: nowrap;
  transition: color 0.25s;
}

.vcv-menu-link:hover {
  color: var(--vt-c-brand);
}

.vcv-menu-link .vcv-icon {
  margin-right: 8px;
}
</style>
