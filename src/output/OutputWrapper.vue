<template>
  <div class="output-wrapper">
    <div class="output-header">
      <div class="tab-buttons">
        <button
          v-for="(m, index) of outputModes"
          :class="['is-button', { active: mode === m }]"
          @click="mode = m"
          :key="index"
        >
          <span>{{ m }}</span>
        </button>
      </div>
      <div class="toolbar-navs">
        <button
          class="item is-button"
          @click="changeShowCodeState"
          v-if="isVertical"
        >
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
          class="item"
          :button="deviceSizeSeleted"
          :items="screenSizes"
          @click-item="changeDeviceSizes"
          v-show="false"
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

<script setup lang="ts">
import { ref, computed, inject, watchEffect } from "vue";
import { Icon } from "@iconify/vue2";
import OutputContainer from "./OutputContainer.vue";
import DeviceEmulation from "../vcv/DeviceEmulation.vue";
import VCVFlyout from "../components/Dropdown.vue";
import { screenSizes, dockSides } from "../settings/sysSetting";

defineProps({
  sourceCode: { type: String, required: true },
});

const emit = defineEmits<{
  (event: "dock", dockSide: string): void;
  (event: "codeshow", isShowCode: boolean): void;
}>();
//  const emit = defineEmits(["dock", "codeshow"]);

// const showCodeEditor = inject("showCodeEditor")!;
const layoutName = inject("layoutName") as string;

const dockSide = ref<string>("top");
const isShowCode = ref<boolean>(false);
const deviceSizeSeleted = ref<string>("Default");
const deviceWidth = ref<number>(0);
const deviceHeight = ref<number>(0);
const mode = ref<string>("preview");
const outputModes = ref(["preview"]);

const changeDockTo = (item: { key: string }) => {
  dockSide.value = item.key;
  emit("dock", dockSide.value);
};

const changeShowCodeState = () => {
  isShowCode.value = !isShowCode.value;
  emit("codeshow", isShowCode.value);
};

const changeDeviceSizes = (item: { label: string; key: [number, number] }) => {
  deviceSizeSeleted.value = item.label;
  deviceWidth.value = item.key[0];
  deviceHeight.value = item.key[1];
};

const isVertical = computed(() => dockSide.value === "top");

const enabled = computed(() => deviceSizeSeleted.value === "Default");

watchEffect(() => {
  dockSide.value = layoutName;
});
</script>

<style scoped>
.is-button {
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
