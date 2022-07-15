<script lang="ts">
import { defineComponent } from "vue";
import _VCVLink from "@examples/components/VCVLink.vue";
import { useData } from "@examples/composables/config";

export default defineComponent({
  components: {
    VCVLink: _VCVLink,
  },
  setup() {
    const { theme } = useData();
    return {
      theme,
    };
  },
});
</script>

<template>
  <div class="VPFooter">
    <!-- theme.footer? -->
    <p v-if="theme.footer.license" class="license">
      Released under the
      <VCVLink class="link" :href="theme.footer.license.link" no-icon
        >{{ theme.footer.license.text }} </VCVLink
      >.
    </p>

    <p v-if="theme.footer.copyright" class="copyright">
      {{ theme.footer.copyright }}
    </p>
  </div>
</template>

<style scoped>
.VPFooter {
  border-top: 1px solid var(--vt-c-bg-soft);
  padding: 23px 0 24px;
  background-color: var(--vt-c-bg-soft);
  transition: border-top 0.5s, background-color 0.5s;
}

.dark .VPFooter {
  border-top: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
}

.license,
.copyright {
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.link {
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vt-c-text-2);
}
</style>
