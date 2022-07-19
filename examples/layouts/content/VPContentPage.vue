<script lang="ts">
import { defineComponent, onUpdated, ref, watch } from "vue";
import { useData } from "@examples/composables/config";
import _VPFooter from "./VPFooter.vue";
import type { Route, RouteMeta } from "vue-router";

export default defineComponent({
  props: {
    showFooter: {
      type: Boolean,
    },
  },
  components: {
    VPFooter: _VPFooter,
  },
  setup(props, context) {
    return {};
  },
});

function onMounted(arg0: () => void) {
  throw new Error("Function not implemented.");
}
</script>

<template>
  <div class="VPContentPage">
    <main>
      <router-view></router-view>
    </main>

    <slot name="footer-before" />
    <VPFooter v-if="!!showFooter" />
    <slot name="footer-after" />
  </div>
</template>
