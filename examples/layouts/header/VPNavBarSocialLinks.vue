<script lang="ts">
import { defineComponent } from "vue";
import _VCVSocialLinks from "@examples/components/VCVSocialLinks.vue";
import { useConfig } from "@examples/composables/config";

export default defineComponent({
  components: { VCVSocialLinks: _VCVSocialLinks },
  setup(props) {
    const { config } = useConfig();

    return {
      config,
    };
  },
});
</script>

<template>
  <VCVSocialLinks
    v-if="config.socialLinks"
    class="VPNavBarSocialLinks"
    size="small"
    :links="config.socialLinks"
  />
</template>

<style scoped>
.VPNavBarSocialLinks {
  display: none;
  margin-right: -10px;
}

@media (min-width: 1280px) {
  .VPNavBarSocialLinks {
    display: flex;
  }
}
</style>
