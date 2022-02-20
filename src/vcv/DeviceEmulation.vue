<template>
  <div
    ref="output"
    class="test"
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
    console.log(this.disableScaling);
    if (this.disableScaling) {
      this.scale = "scale(1)";
    } else {
      let el = this.$refs.output;
      this.scale = `scale(${Math.min(
        el.offsetWidth / this.width,
        el.offsetHeight / this.height
      )})`;

      console.log(el.offsetWidth, el.offsetHeight, this.scale);
    }
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
.test {
  height: 600px;
  background-color: rgba(45, 45, 45, 0.1);
}
.test1 {
  background-color: rgba(27, 27, 27, 1);
}
</style>
