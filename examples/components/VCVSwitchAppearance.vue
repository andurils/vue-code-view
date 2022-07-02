<script lang="ts">
import { defineComponent } from "vue";
import VCVSwitch from "./VCVSwitch.vue";
import VCVIconSun from "./icons/VCVIconSun.vue";
import VCVIconMoon from "./icons/VCVIconMoon.vue";
import { useDark, useToggle } from "@vueuse/core";

export default defineComponent({
  components: { VCVSwitch, VCVIconSun, VCVIconMoon },
  setup() {
    // const isDark = useDark({
    //   selector: "body",
    //   attribute: "class",
    //   valueDark: "dark",
    //   valueLight: "light",
    // });
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return {
      toggleDark,
    };
  },
});
</script>

<template>
  <VCVSwitch
    class="vt-switch-appearance"
    aria-label="toggle dark mode"
    @click.native="toggleDark()"
  >
    <VCVIconSun class="vt-switch-appearance-sun" />
    <VCVIconMoon class="vt-switch-appearance-moon" />
  </VCVSwitch>
</template>
