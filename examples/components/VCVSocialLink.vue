<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SocialLinkSize, SocialLinkIcon } from "../types/socialLink";
import VTIconGitHub from "./icons/VCVIconGitHub.vue";
import VTIconLanguages from "./icons/VCVIconLanguages.vue";

export default defineComponent({
  props: {
    size: {
      type: String as PropType<SocialLinkSize>,
      default: "small",
    },
    icon: {
      type: String as PropType<SocialLinkIcon>,
      required: true,
    },
    link: { type: String },
  },
  setup(props) {
    const target = /^[a-z]+:/i.test(props.link!) ? `_blank` : undefined;

    const icons: { [key: string]: any } = {
      github: VTIconGitHub,
      languages: VTIconLanguages,
    };

    return {
      target,
      icons,
    };
  },
});
</script>

<template>
  <a
    class="vt-social-link"
    :class="{
      'is-small': size === 'small',
      'is-medium': size === 'medium',
    }"
    :href="link"
    :title="icon"
    :target="target"
    rel="noopener noreferrer"
  >
    <component :is="icons[icon]" class="vt-social-link-icon" />
    <span class="visually-hidden">{{ icon }}</span>
  </a>
</template>
