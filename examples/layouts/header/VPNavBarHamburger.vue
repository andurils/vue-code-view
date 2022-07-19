<script lang="ts">
import { computed, defineComponent } from "vue";
import { useConfig } from "@examples/composables/config";
import _VCVHamburger from "@examples/components/VCVHamburger.vue";

export default defineComponent({
  components: {
    VCVHamburger: _VCVHamburger,
  },
  props: {
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    const { config } = useConfig();
    const hasContent = computed(() => {
      return true;
      // return config.value.appearance || config.value.socialLinks;
    });

    return {
      hasContent,
    };
  },
});
</script>

<template>
  <VCVHamburger v-if="hasContent" class="VPNavBarHamburger" :active="active" />
</template>

<style scoped>
.VPNavBarHamburger {
  width: 40px;
  height: var(--vt-nav-height);
}

@media (min-width: 768px) {
  .VPNavBarHamburger {
    display: none;
  }
}
</style>
