<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    active: Boolean,
  },
});
</script>

<template>
  <button
    type="button"
    class="vt-hamburger"
    :class="{ 'is-active': active }"
    aria-label="mobile navigation"
    :aria-expanded="active"
    aria-controls="VPNavScreen"
  >
    <span class="vt-hamburger-container">
      <span class="vt-hamburger-top" />
      <span class="vt-hamburger-middle" />
      <span class="vt-hamburger-bottom" />
    </span>
  </button>
</template>
