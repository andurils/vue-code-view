<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import _VCVLink from "@examples/components/VCVLink.vue";

export default defineComponent({
  components: {
    VCVLink: _VCVLink,
  },
  props: {
    text: String,
    link: String,
  },
  setup(props) {
    const closeScreen = inject("close-screen") as () => void;
    return {
      closeScreen,
    };
  },
});
</script>

<template>
  <VCVLink class="VPNavScreenMenuLink" :href="link" @click="closeScreen">
    {{ text }}
  </VCVLink>
</template>

<style scoped>
.VPNavScreenMenuLink {
  display: block;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 12px 0 11px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: border-color 0.5s, color 0.25s;
}

.VPNavScreenMenuLink:hover {
  color: var(--vt-c-brand);
}
</style>
