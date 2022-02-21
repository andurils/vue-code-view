<template>
  <div class="demo-block">
    <div class="description" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="highlight" v-if="false">
      <slot name="highlight"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin: 24px 0;

  .source {
    padding: 12px 24px;
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

  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
}
</style>

<script>
export default {
  created() {},
  mounted() {},
  methods: {},
};
</script>
