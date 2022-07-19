<script lang="ts">
import { computed, defineComponent } from "vue";
import { useConfig } from "@examples/composables/config";
// import { SocialLink } from "@examples/types/socialLink";
import _VCVFlyout from "@examples/components/VCVFlyout.vue";
import _VCVSwitchAppearance from "@examples/components/VCVSwitchAppearance.vue";
import _VCVSocialLinks from "@examples/components/VCVSocialLinks.vue";

export default defineComponent({
  components: {
    VCVFlyout: _VCVFlyout,
    VCVSwitchAppearance: _VCVSwitchAppearance,
    VCVSocialLinks: _VCVSocialLinks,
  },
  setup(props) {
    const { config } = useConfig();
    // var config = {
    //   socialLinks: [
    //     {
    //       icon: "github",
    //       link: "https://github.com/andurils/vue-code-view",
    //     },
    //     {
    //       icon: "languages",
    //       link: "https://staging-cn.vuejs.org/guide/typescript/options-api.html#typing-component-props",
    //     },
    //   ] as SocialLink[],
    //   appearance: true,
    // };
    const hasContent = computed(() => {
      // return true;
      return config.appearance || config.socialLinks;
    });

    return {
      hasContent,
      config,
    };
  },
});
</script>

<template>
  <VCVFlyout v-if="hasContent" class="VPNavBarExtra" label="extra navigation">
    <div v-if="config.appearance" class="vt-menu-group">
      <div class="vt-menu-item item">
        <p class="vt-menu-label">Appearance</p>
        <div class="vt-menu-action action">
          <VCVSwitchAppearance />
        </div>
      </div>
    </div>

    <div v-if="config.socialLinks" class="vt-menu-group">
      <div class="vt-menu-item item">
        <VCVSocialLinks
          class="social-links"
          size="small"
          :links="config.socialLinks"
        />
      </div>
    </div>
  </VCVFlyout>
</template>

<style scoped>
.VPNavBarExtra {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarExtra {
    display: block;
  }
}

@media (min-width: 1280px) {
  .VPNavBarExtra {
    display: none;
  }
}

.item {
  display: flex;
  align-items: center;
}

.action {
  margin-right: -2px;
}

.social-links {
  margin: -4px -8px;
}
</style>
