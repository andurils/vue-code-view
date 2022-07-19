<script lang="ts">
import { defineComponent } from "vue";
// import { useConfig } from "@examples/composables/config";
import _VCVSwitchAppearance from "@examples/components/VCVSwitchAppearance.vue";
import { appearance } from "@examples/settings/projectSetting";

export default defineComponent({
  components: {
    VCVSwitchAppearance: _VCVSwitchAppearance,
  },
  setup(props) {
    // const { config } = useConfig();
    return {
      // config,
      appearance,
    };
  },
});
</script>

<template>
  <div v-if="appearance" class="VPNavScreenAppearance">
    <p class="text">Appearance</p>
    <VCVSwitchAppearance />
  </div>
</template>

<style scoped>
.VPNavScreenAppearance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px 14px 12px 16px;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}
</style>
