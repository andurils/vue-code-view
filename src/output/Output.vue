<template>
  <div class="output-wrapper">
    <div class="output-header">
      <div class="tab-buttons">
        <button
          v-for="(m, index) of outputModes"
          :class="{ active: mode === m }"
          @click="mode = m"
          :key="index"
        >
          <span>{{ m }}</span>
        </button>
      </div>
      <div class="toolbar-navs">
        <button class="item" @click="changeShowCodeState" v-if="isVertical">
          <Icon icon="ic:round-code-off" class="vcv-icon" v-if="isShowCode" />
          <Icon icon="ic:round-code" class="vcv-icon" v-if="!isShowCode" />
        </button>
        <!-- docker side -->
        <VCVFlyout
          class="item"
          :button="dockSide"
          :items="dockSides"
          @click-item="changeDockTo"
        />
        <!-- 设备模拟 -->
        <VCVFlyout
          v-if="showDevice"
          class="item"
          :button="deviceSizeSeleted"
          :items="screenSizes"
          @click-item="changeDeviceSizes"
        />
      </div>
    </div>
    <div class="output-container" :class="{ 'padding-32': !enabled }">
      <!-- <Preview :show="mode === 'preview'" v-if="mode === 'preview'" /> -->
      <!-- -->
      <!-- <OutputContainer :code="sourceCode"></OutputContainer> -->
      <!-- 设备仿真 -->
      <DeviceEmulation
        :width="deviceWidth"
        :height="deviceHeight"
        :disable-scaling="enabled"
      >
        <OutputContainer :code="sourceCode"></OutputContainer>
      </DeviceEmulation>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue2";
// import Preview from "./Preview.vue";
import { screenSizes, dockSides } from "../settings/sysSetting";
import OutputContainer from "./OutputContainer.vue";
import DeviceEmulation from "../vcv/DeviceEmulation.vue";
import VCVFlyout from "../components/VCVDropdown.vue";

export default {
  name: "OutputDemo",
  inject: [
    "vcv",
    // "handleShowCode",
    "handleChangeTransparent",
    // "showCode",
    "code",
  ],
  components: {
    // Preview,
    Icon,
    OutputContainer,
    DeviceEmulation,
    VCVFlyout,
  },
  props: {
    sourceCode: { type: String },
    showDevice: { type: Boolean },
  },
  data() {
    return {
      outputModes: ["preview"], //"preview", "css"
      mode: "preview",
      // dockSides: {
      //   top: "mdi:dock-top",
      //   right: "mdi:dock-right",
      //   left: "mdi:dock-left",
      //   bottom: "mdi:dock-bottom",
      // },
      dockSide: this.vcv.layoutName, // 默认"top",
      isShowCode: this.vcv.showCodeEditor,
      screenSizes: screenSizes,
      dockSides: dockSides,
      deviceSizeSeleted: "Default",
      deviceWidth: 0,
      deviceHeight: 0,
    };
  },
  created() {
    // console.log("output created", this.vcv.layoutName);
  },
  methods: {
    changeDockTo(item) {
      this.dockSide = item.key;
      this.$emit("dock", this.dockSide);
    },

    changeShowCodeState() {
      this.isShowCode = !this.isShowCode;
      this.$emit("codeshow", this.isShowCode);
    },
    changeDeviceSizes(item) {
      this.deviceSizeSeleted = item.label;
      this.deviceWidth = item.key[0];
      this.deviceHeight = item.key[1];
      // console.log("changeDeviceSizes", this.deviceWidth, this.deviceHeight);
    },
  },
  computed: {
    isVertical() {
      return this.dockSide === "top";
    },
    enabled() {
      return this.deviceSizeSeleted === "Default";
    },
  },
  watch: {
    "vcv.layoutName": {
      immediate: true,
      handler(val) {
        this.dockSide = val;
      },
    },
  },
};
</script>
<style scoped>
button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}

.output-wrapper {
  height: 100%;
  position: relative;
}
.output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  height: var(--header-height);
  /* overflow: hidden; */
  white-space: nowrap;
  position: relative;
  z-index: 5;
}
.tab-buttons button {
  padding: 0;
  box-sizing: border-box;
}
.tab-buttons span {
  font-size: 13px;
  font-family: var(--font-code);
  text-transform: uppercase;
  color: var(--text-light);
  display: inline-block;
  padding: 5px 16px 4px;
  line-height: 20px;
}
button.active {
  color: var(--color-branding-dark);
  border-bottom: 3px solid var(--color-branding-dark);
}

.toolbar-navs {
  padding-left: 30px;
  display: flex;
  /* flex: 0 1 auto; */
  /* overflow: hidden; */
}

.toolbar-navs .item {
  padding: 6px 8px 6px;
  border-left: 1px solid var(--border);
}

.output-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
  background-color: var(--bg-device);
}

/* dropdown-btn 文字样式 */
.dropdown-btn {
  display: flex;
  align-items: center;
}
.dropdown-btn span {
  font-size: 13px;
  line-height: 20px;
  margin: 0 2px 0 6px;
  font-family: var(--font-code);
  text-transform: uppercase;
  color: var(--text-light);
  max-width: 80px;
}

span.more-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.padding-32 {
  padding: 32px;
}
</style>
