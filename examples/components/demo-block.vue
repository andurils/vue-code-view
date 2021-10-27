<template>
  <div
    class="demo-block"
    :class="[blockClass, { hover: hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="description" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="source">
      <slot name="source"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  .source {
    padding: 0 24px;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #e6effb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 12px 24px;
    background-color: #f6f8fa;

    p {
      margin: 0;
      line-height: 26px;
    }
  }

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
}
</style>

<script>
export default {
  data() {
    return {
      hovering: false,
      isExpanded: false,
    };
  },
  computed: {
    blockClass() {
      return ` demo-${this.$router.currentRoute.path.split("/").pop()}`;
    },
    controlText() {
      return this.isExpanded ? "隐藏代码" : "显示代码";
    },
    codeArea() {
      return this.$el.getElementsByClassName("meta")[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName("description").length > 0) {
        return (
          this.$el.getElementsByClassName("description")[0].clientHeight +
          this.$el.getElementsByClassName("highlight")[0].clientHeight +
          20
        );
      }
      return this.$el.getElementsByClassName("highlight")[0].clientHeight;
    },
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : "0";
      if (!val) {
        this.$refs.control.style.left = "0";
        return;
      }
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
