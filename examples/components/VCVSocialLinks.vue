<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SocialLinkSize, SocialLink } from "../types/socialLink";
import _VCVSocialLink from "./VCVSocialLink.vue";

const props = {
  size: {
    type: String as PropType<SocialLinkSize>,
  },
  links: Array as PropType<SocialLink[]>,
};

export default defineComponent({
  components: { VCVSocialLink: _VCVSocialLink },
  props,
});
</script>

<template>
  <div class="vt-social-links">
    <!-- { link, icon } (item, index)-->
    <VCVSocialLink
      v-for="(item, index) in links"
      :key="index"
      :size="size"
      :icon="item.icon"
      :link="item.link"
    />
  </div>
</template>
