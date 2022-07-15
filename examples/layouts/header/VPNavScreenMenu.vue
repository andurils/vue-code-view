<script lang="ts">
import { defineComponent, ref } from "vue";
import { useConfig } from "@examples/composables/config";
import _VPNavScreenMenuLink from "./VPNavScreenMenuLink.vue";
import _VPNavScreenMenuGroup from "./VPNavScreenMenuGroup.vue";

export default defineComponent({
  components: {
    VPNavScreenMenuLink: _VPNavScreenMenuLink,
    VPNavScreenMenuGroup: _VPNavScreenMenuGroup,
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
  <nav v-if="config.nav" class="VPNavScreenMenu">
    <template v-for="item in config.nav">
      <VPNavScreenMenuLink
        v-if="'link' in item"
        :text="item.text"
        :link="item.link"
        :key="item.text"
      />
      <VPNavScreenMenuGroup
        v-else
        :text="item.text || ''"
        :items="item.items"
        :key="item.text"
      />
    </template>
  </nav>
</template>
