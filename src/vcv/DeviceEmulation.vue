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
      class="test1"
    >
      <slot :width="width" :height="height" :scale="scale" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useElementSize } from "@vueuse/core";

export default defineComponent({
  props: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    disableScaling: { type: Boolean },
  },
  setup(props, context) {
    const output = ref<HTMLElement | null>(null);
    const size = useElementSize(output);

    const scale = computed(() => {
      if (props.disableScaling) return "scale(1)";
      return `scale(${Math.min(
        size.width.value / props.width,
        size.height.value / props.height
      )})`;
    });

    return {
      output,
      scale,
    };
  },
});
</script>
<style scoped>
.device-container {
  height: 100%;
  /* overflow: hidden; */
  position: relative;
  /* background-color: var(--bg-device); */
  /* background-color: rgba(255, 255, 255, 0); */
  background-image: url(grid.svg);
  /* mask-image: linear-gradient(180deg, white, rgba(255, 255, 255, 0)); */
}
</style>
