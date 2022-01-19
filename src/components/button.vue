<template>
  <button
    class="me-button"
    @click="handleClick"
    :class="[
      buttonSize ? 'me-button--' + buttonSize : '',
      {
        'is-circle': circle,
      },
    ]"
  >
    <i :class="['iconfont', 'me-icon-' + icon]"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: "MeButton",
  props: {
    size: String,
    icon: {
      type: String,
      default: "",
    },
    circle: Boolean,
  },

  computed: {
    buttonSize() {
      return this.size;
    },
  },

  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
<style lang="scss">
$state-prefix: "is-"; // 状态前缀

@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

.me-button {
  display: inline-block;
  position: relative;
  line-height: 1;
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin: 0;
  color: #8e8e93;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
  outline: none !important;
  user-select: none;
  text-decoration: none;
  font-weight: 400;
  overflow: hidden;

  // transition: 0.1s;
  transition: color 0.2s linear, background-color 0.3s linear;

  & + & {
    margin-left: 10px;
  }

  &:hover,
  &:focus {
    background-color: #f7f7fa;
    color: #575757;
  }

  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(52, 152, 255, 0.25);
  }

  &:active {
    outline: none !important;
    background-color: #e5e5ea;
    color: #272c36;
  }

  & [class*="el-icon-"] {
    & + span {
      margin-left: 5px;
    }
  }

  @include when(circle) {
    border-radius: 50%;
    padding: 12px;
  }
}

.me-button--xs {
  padding: 10px;
  font-size: 12px;
}

// .el-button:focus,
// .el-button:hover {
//   color: #409eff;
//   border-color: #c6e2ff;
//   background-color: #ecf5ff;
// }
// .el-button:active {
//   color: #3a8ee6;
//   border-color: #3a8ee6;
//   outline: 0;
// }
// .el-button::-moz-focus-inner {
//   border: 0;
// }
// .el-button [class*="el-icon-"] + span {
//   margin-left: 5px;
// }
// .el-button.is-plain:focus,
// .el-button.is-plain:hover {
//   background: #fff;
//   border-color: #409eff;
//   color: #409eff;
// }
// .el-button.is-active,
// .el-button.is-plain:active {
//   color: #3a8ee6;
//   border-color: #3a8ee6;
// }
// .el-button.is-plain:active {
//   background: #fff;
//   outline: 0;
// }
// .el-button.is-disabled,
// .el-button.is-disabled:focus,
// .el-button.is-disabled:hover {
//   color: #c0c4cc;
//   cursor: not-allowed;
//   background-image: none;
//   background-color: #fff;
//   border-color: #ebeef5;
// }
// .el-button.is-disabled.el-button--text {
//   background-color: transparent;
// }
// .el-button.is-disabled.is-plain,
// .el-button.is-disabled.is-plain:focus,
// .el-button.is-disabled.is-plain:hover {
//   background-color: #fff;
//   border-color: #ebeef5;
//   color: #c0c4cc;
// }
// .el-button.is-loading {
//   position: relative;
//   pointer-events: none;
// }
// .el-button.is-loading:before {
//   pointer-events: none;
//   content: "";
//   position: absolute;
//   left: -1px;
//   top: -1px;
//   right: -1px;
//   bottom: -1px;
//   border-radius: inherit;
//   background-color: rgba(255, 255, 255, 0.35);
// }
// .el-button.is-round {
//   border-radius: 20px;
//   padding: 12px 23px;
// }
// .el-button.is-circle {
//   border-radius: 50%;
//   padding: 12px;
// }
// .el-button--primary {
//   color: #fff;
//   background-color: #409eff;
//   border-color: #409eff;
// }
// .el-button--primary:focus,
// .el-button--primary:hover {
//   background: #66b1ff;
//   border-color: #66b1ff;
//   color: #fff;
// }
// .el-button--primary:active {
//   background: #3a8ee6;
//   border-color: #3a8ee6;
//   color: #fff;
//   outline: 0;
// }
// .el-button--primary.is-active {
//   background: #3a8ee6;
//   border-color: #3a8ee6;
//   color: #fff;
// }
// .el-button--primary.is-disabled,
// .el-button--primary.is-disabled:active,
// .el-button--primary.is-disabled:focus,
// .el-button--primary.is-disabled:hover {
//   color: #fff;
//   background-color: #a0cfff;
//   border-color: #a0cfff;
// }
// .el-button--primary.is-plain {
//   color: #409eff;
//   background: #ecf5ff;
//   border-color: #b3d8ff;
// }
// .el-button--primary.is-plain:focus,
// .el-button--primary.is-plain:hover {
//   background: #409eff;
//   border-color: #409eff;
//   color: #fff;
// }
// .el-button--primary.is-plain:active {
//   background: #3a8ee6;
//   border-color: #3a8ee6;
//   color: #fff;
//   outline: 0;
// }
// .el-button--primary.is-plain.is-disabled,
// .el-button--primary.is-plain.is-disabled:active,
// .el-button--primary.is-plain.is-disabled:focus,
// .el-button--primary.is-plain.is-disabled:hover {
//   color: #8cc5ff;
//   background-color: #ecf5ff;
//   border-color: #d9ecff;
// }
// .el-button--success {
//   color: #fff;
//   background-color: #67c23a;
//   border-color: #67c23a;
// }
// .el-button--success:focus,
// .el-button--success:hover {
//   background: #85ce61;
//   border-color: #85ce61;
//   color: #fff;
// }
// .el-button--success.is-active,
// .el-button--success:active {
//   background: #5daf34;
//   border-color: #5daf34;
//   color: #fff;
// }
// .el-button--success:active {
//   outline: 0;
// }
// .el-button--success.is-disabled,
// .el-button--success.is-disabled:active,
// .el-button--success.is-disabled:focus,
// .el-button--success.is-disabled:hover {
//   color: #fff;
//   background-color: #b3e19d;
//   border-color: #b3e19d;
// }
// .el-button--success.is-plain {
//   color: #67c23a;
//   background: #f0f9eb;
//   border-color: #c2e7b0;
// }
// .el-button--success.is-plain:focus,
// .el-button--success.is-plain:hover {
//   background: #67c23a;
//   border-color: #67c23a;
//   color: #fff;
// }
// .el-button--success.is-plain:active {
//   background: #5daf34;
//   border-color: #5daf34;
//   color: #fff;
//   outline: 0;
// }
// .el-button--success.is-plain.is-disabled,
// .el-button--success.is-plain.is-disabled:active,
// .el-button--success.is-plain.is-disabled:focus,
// .el-button--success.is-plain.is-disabled:hover {
//   color: #a4da89;
//   background-color: #f0f9eb;
//   border-color: #e1f3d8;
// }
// .el-button--warning {
//   color: #fff;
//   background-color: #e6a23c;
//   border-color: #e6a23c;
// }
// .el-button--warning:focus,
// .el-button--warning:hover {
//   background: #ebb563;
//   border-color: #ebb563;
//   color: #fff;
// }
// .el-button--warning.is-active,
// .el-button--warning:active {
//   background: #cf9236;
//   border-color: #cf9236;
//   color: #fff;
// }
// .el-button--warning:active {
//   outline: 0;
// }
// .el-button--warning.is-disabled,
// .el-button--warning.is-disabled:active,
// .el-button--warning.is-disabled:focus,
// .el-button--warning.is-disabled:hover {
//   color: #fff;
//   background-color: #f3d19e;
//   border-color: #f3d19e;
// }
// .el-button--warning.is-plain {
//   color: #e6a23c;
//   background: #fdf6ec;
//   border-color: #f5dab1;
// }
// .el-button--warning.is-plain:focus,
// .el-button--warning.is-plain:hover {
//   background: #e6a23c;
//   border-color: #e6a23c;
//   color: #fff;
// }
// .el-button--warning.is-plain:active {
//   background: #cf9236;
//   border-color: #cf9236;
//   color: #fff;
//   outline: 0;
// }
// .el-button--warning.is-plain.is-disabled,
// .el-button--warning.is-plain.is-disabled:active,
// .el-button--warning.is-plain.is-disabled:focus,
// .el-button--warning.is-plain.is-disabled:hover {
//   color: #f0c78a;
//   background-color: #fdf6ec;
//   border-color: #faecd8;
// }
// .el-button--danger {
//   color: #fff;
//   background-color: #f56c6c;
//   border-color: #f56c6c;
// }
// .el-button--danger:focus,
// .el-button--danger:hover {
//   background: #f78989;
//   border-color: #f78989;
//   color: #fff;
// }
// .el-button--danger.is-active,
// .el-button--danger:active {
//   background: #dd6161;
//   border-color: #dd6161;
//   color: #fff;
// }
// .el-button--danger:active {
//   outline: 0;
// }
// .el-button--danger.is-disabled,
// .el-button--danger.is-disabled:active,
// .el-button--danger.is-disabled:focus,
// .el-button--danger.is-disabled:hover {
//   color: #fff;
//   background-color: #fab6b6;
//   border-color: #fab6b6;
// }
// .el-button--danger.is-plain {
//   color: #f56c6c;
//   background: #fef0f0;
//   border-color: #fbc4c4;
// }
// .el-button--danger.is-plain:focus,
// .el-button--danger.is-plain:hover {
//   background: #f56c6c;
//   border-color: #f56c6c;
//   color: #fff;
// }
// .el-button--danger.is-plain:active {
//   background: #dd6161;
//   border-color: #dd6161;
//   color: #fff;
//   outline: 0;
// }
// .el-button--danger.is-plain.is-disabled,
// .el-button--danger.is-plain.is-disabled:active,
// .el-button--danger.is-plain.is-disabled:focus,
// .el-button--danger.is-plain.is-disabled:hover {
//   color: #f9a7a7;
//   background-color: #fef0f0;
//   border-color: #fde2e2;
// }
// .el-button--info {
//   color: #fff;
//   background-color: #909399;
//   border-color: #909399;
// }
// .el-button--info:focus,
// .el-button--info:hover {
//   background: #a6a9ad;
//   border-color: #a6a9ad;
//   color: #fff;
// }
// .el-button--info.is-active,
// .el-button--info:active {
//   background: #82848a;
//   border-color: #82848a;
//   color: #fff;
// }
// .el-button--info:active {
//   outline: 0;
// }
// .el-button--info.is-disabled,
// .el-button--info.is-disabled:active,
// .el-button--info.is-disabled:focus,
// .el-button--info.is-disabled:hover {
//   color: #fff;
//   background-color: #c8c9cc;
//   border-color: #c8c9cc;
// }
// .el-button--info.is-plain {
//   color: #909399;
//   background: #f4f4f5;
//   border-color: #d3d4d6;
// }
// .el-button--info.is-plain:focus,
// .el-button--info.is-plain:hover {
//   background: #909399;
//   border-color: #909399;
//   color: #fff;
// }
// .el-button--info.is-plain:active {
//   background: #82848a;
//   border-color: #82848a;
//   color: #fff;
//   outline: 0;
// }
// .el-button--info.is-plain.is-disabled,
// .el-button--info.is-plain.is-disabled:active,
// .el-button--info.is-plain.is-disabled:focus,
// .el-button--info.is-plain.is-disabled:hover {
//   color: #bcbec2;
//   background-color: #f4f4f5;
//   border-color: #e9e9eb;
// }
// .el-button--medium {
//   padding: 10px 20px;
//   font-size: 14px;
//   border-radius: 4px;
// }
// .el-button--mini,
// .el-button--small {
//   font-size: 12px;
//   border-radius: 3px;
// }
// .el-button--medium.is-round {
//   padding: 10px 20px;
// }
// .el-button--medium.is-circle {
//   padding: 10px;
// }
// .el-button--small,
// .el-button--small.is-round {
//   padding: 9px 15px;
// }
// .el-button--small.is-circle {
//   padding: 9px;
// }
// .el-button--mini,
// .el-button--mini.is-round {
//   padding: 7px 15px;
// }
// .el-button--mini.is-circle {
//   padding: 7px;
// }
// .el-button--text {
//   border-color: transparent;
//   color: #409eff;
//   background: 0 0;
//   padding-left: 0;
//   padding-right: 0;
// }
// .el-button--text:focus,
// .el-button--text:hover {
//   color: #66b1ff;
//   border-color: transparent;
//   background-color: transparent;
// }
// .el-button--text:active {
//   color: #3a8ee6;
//   border-color: transparent;
//   background-color: transparent;
// }
// .el-button--text.is-disabled,
// .el-button--text.is-disabled:focus,
// .el-button--text.is-disabled:hover {
//   border-color: transparent;
// }
</style>
