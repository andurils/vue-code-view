<script lang="ts">
import { defineComponent } from "vue";
import { useConfig } from "@examples/composables/config";
import _VCVSocialLinks from "@examples/components/VCVSocialLinks.vue";

export default defineComponent({
  components: {
    VCVSocialLinks: _VCVSocialLinks,
  },
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
    class="VPNavScreenSocialLinks"
    size="medium"
    :links="config.socialLinks"
  />
</template>
