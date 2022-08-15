<script lang="ts">
import { defineComponent, computed } from "vue";
import VCVIconExternalLink from "./icons/VCVIconExternalLink.vue";

export default defineComponent({
  components: { VCVIconExternalLink },
  props: {
    href: String,
    noIcon: Boolean,
  },
  setup(props) {
    // const isExternal = computed(
    //   () => props.href && /^[a-z]+:/i.test(props.href)
    // );

    const isExternal = computed(
      () => props.href && /^https?:/.test(props.href)
    );
    // console.log(props.href, isExternal.value);
    return {
      isExternal,
    };
  },
});
</script>

<template>
  <span>
    <router-link :to="href" v-if="!isExternal"><slot /></router-link>
    <component
      :is="href ? 'a' : 'span'"
      class="vt-link"
      :class="{ link: href }"
      :href="href"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      v-else
    >
      <slot />
      <VCVIconExternalLink v-if="isExternal && !noIcon" class="vt-link-icon" />
    </component>
  </span>
</template>
