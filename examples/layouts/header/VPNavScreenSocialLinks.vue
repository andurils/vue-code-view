<script lang="ts">
import { defineComponent } from "vue";
// import { useConfig } from "@examples/composables/config";
import _VCVSocialLinks from "@examples/components/VCVSocialLinks.vue";
import { socialLinks } from "@examples/settings/projectSetting";

export default defineComponent({
  components: {
    VCVSocialLinks: _VCVSocialLinks,
  },
  setup(props) {
    // const { config } = useConfig();
    return {
      // config,
      socialLinks,
    };
  },
});
</script>

<template>
  <VCVSocialLinks
    v-if="socialLinks"
    class="VPNavScreenSocialLinks"
    size="medium"
    :links="socialLinks"
  />
</template>
