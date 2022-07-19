<script lang="ts">
import { defineComponent } from "vue";
import _VCVSocialLinks from "@examples/components/VCVSocialLinks.vue";
// import { useConfig } from "@examples/composables/config";
import { socialLinks } from "@examples/settings/projectSetting";

export default defineComponent({
  components: { VCVSocialLinks: _VCVSocialLinks },
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
    class="VPNavBarSocialLinks"
    size="small"
    :links="socialLinks"
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
