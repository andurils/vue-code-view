<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    show: Boolean,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="vt-backdrop" />
  </transition>
</template>
