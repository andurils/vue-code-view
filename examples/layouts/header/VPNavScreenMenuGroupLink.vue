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
  <VCVLink class="VPNavScreenMenuGroupLink" :href="link" @click="closeScreen">
    {{ text }}
  </VCVLink>
</template>

<style scoped>
.VPNavScreenMenuGroupLink {
  display: block;
  line-height: 32px;
  font-size: 13px;
  font-weight: 400;
  color: var(--vt-c-text-1);
  transition: color 0.25s;
  margin-left: 0.6em;
}

.VPNavScreenMenuGroupLink:hover {
  color: var(--vt-c-brand);
}
</style>
