<script lang="ts">
import { defineComponent } from "vue";
import { useData } from "@examples/composables/config";

export default defineComponent({
  setup() {
    const { page } = useData();
    return {
      page,
    };
  },
});
</script>

<template>
  <div class="visually-hidden" aria-live="polite">
    {{ page.title }} has loaded
  </div>
</template>
