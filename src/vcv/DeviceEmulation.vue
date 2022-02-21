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
<script>
import { debounce } from "throttle-debounce";
export default {
  components: {},
  props: {
    width: { type: Number },
    height: { type: Number },
    disableScaling: { type: Boolean },
  },
  data() {
    return {
      scale: "scale(1)",
    };
  },
  mounted() {
    window.addEventListener(
      "resize",
      debounce(100, () => {
        console.log("dev emulator autoResize");
        this.scale = this.calcScale();
      })
    );

    this.scale = this.calcScale();
  },
  methods: {
    calcScale() {
      console.log(this.disableScaling);
      if (this.disableScaling) return "scale(1)";

      let el = this.$refs.output;
      console.log(
        "el-w/h",
        el.offsetWidth,
        el.offsetHeight,
        "out-w/h",
        this.width,
        this.height,
        el.offsetWidth / this.width,
        el.offsetHeight / this.height,
        this.scale
      );
      console.log(
        Math.min(el.offsetWidth / this.width, el.offsetHeight / this.height)
      );
      return `scale(${Math.min(
        el.offsetWidth / this.width,
        el.offsetHeight / this.height
      )})`;
    },
  },
  watch: {
    width() {
      this.scale = this.calcScale();
    },
    height() {
      this.scale = this.calcScale();
    },
    disableScaling() {
      this.scale = this.calcScale();
    },
  },
};
</script>
<style scoped>
.device-container {
  height: 100%;
  /* overflow: hidden; */
  position: relative;
  background-color: var(--bg-device);
}
/* .test {
  height: 600px;
  background-color: rgba(45, 45, 45, 0.1);
} */
/* .test1 {
  background-color: rgba(27, 27, 27, 1);
} */
</style>
