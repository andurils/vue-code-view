<script setup lang="ts">
import { ref, computed, Ref } from "vue";
// import { useElementSize } from "@vueuse/core";
import { useElementSize } from "../utils/useElementSize";

const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  disableScaling: { type: Boolean },
});

const output = ref<HTMLElement>();
const size = useElementSize(output as Ref<HTMLElement | null>);
const scale = computed(() => {
  if (props.disableScaling) return "scale(1)";
  return `scale(${Math.min(
    size.width.value / props.width,
    size.height.value / props.height
  )})`;
});
</script>

<template>
  <div
    ref="output"
    class="device-container"
    :style="{
      display: 'grid',
      placeItems: !disableScaling ? 'center' : 'unset',
      placeContent: !disableScaling ? 'center' : 'unset',
    }"
  >
    <div
      :style="{
        width: disableScaling ? '100%' : `${width}px`,
        height: disableScaling ? '100%' : `${height}px`,
        transform: scale,
        transformOrigin: 'center center',
      }"
    >
      <slot :width="width" :height="height" :scale="scale" />
    </div>
  </div>
</template>

<style scoped>
.device-container {
  height: 100%;
  /* overflow: hidden; */
  position: relative;
  /* background-color: var(--bg-device); */
  /* background-color: rgba(255, 255, 255, 0); */
  background-image: url(../assets/grid.svg);
  /* mask-image: linear-gradient(180deg, white, rgba(255, 255, 255, 0)); */
}
</style>
