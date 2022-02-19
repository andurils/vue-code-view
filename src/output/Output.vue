<template>
  <div>
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
        <!-- <button class="item" @click="handleShowCode">
          <Icon icon="ic:round-code-off" class="vcv-icon" v-if="showCode" />
          <Icon icon="ic:round-code" class="vcv-icon" v-if="!showCode" />
        </button> -->
        <!-- <button class="item">
          <Icon icon="radix-icons:transparency-grid" class="vcv-icon" />
        </button> -->

        <button class="item" @click="changView('top')">
          <Icon icon="mdi:dock-top" class="vcv-icon" />
        </button>
        <button class="item" @click="changView('left')">
          <Icon icon="mdi:dock-left" class="vcv-icon" />
        </button>
        <button class="item" @click="changView('right')">
          <Icon icon="mdi:dock-right" class="vcv-icon" />
        </button>
        <!-- <button class="item">
          <Icon icon="ic:round-devices" class="vcv-icon" />
          <span>default</span>
          <Icon icon="ic:round-keyboard-arrow-down" class="vcv-icon" />
        </button>  -->
        <!-- <Dropdown class="item">
          <span class="el-dropdown-link">
            <Icon icon="ic:round-devices" class="vcv-icon" />
            <span> {{ svalue }} </span>
            <Icon icon="ic:round-keyboard-arrow-down" class="vcv-icon" />
          </span>
          <DropdownMenu slot="dropdown">
            <DropdownItem icon="ic:round-keyboard-arrow-down"
              >xxxx</DropdownItem
            >
            <DropdownItem icon="ic:round-devices">1111</DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
        <Dropdown class="item" @command="handleCommand">
          <span class="el-dropdown-link">
            <Icon icon="ic:round-devices" class="vcv-icon" />
            <span> {{ svalue }} </span>
            <Icon icon="ic:round-keyboard-arrow-down" class="vcv-icon" />
          </span>
          <DropdownMenu slot="dropdown">
            <DropdownItem
              v-for="(_, index) in deviceSizes"
              :key="index"
              :value="index"
              :command="index"
            >
              {{ index }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>

    <div class="output-container">
      <!-- <Preview :show="mode === 'preview'" v-if="mode === 'preview'" /> -->
      <OutputContainer :code="sourceCode"></OutputContainer>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue2";
import Preview from "./Preview.vue";
import sizes from "../settings/screen-sizes.json";
import OutputContainer from "../code-viewer/output-container.vue";
import Dropdown from "../dropdown/Dropdown.vue";
import DropdownMenu from "../dropdown/DropdownMenu.vue";
import DropdownItem from "../dropdown/DropdownItem.vue";

import "../dropdown/dropdown.css";

export default {
  inject: [
    "handleShowCode",
    "handleChangeTransparent",
    "changView",
    "showCode",
    "code",
  ],
  components: {
    // Preview,
    Icon,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    OutputContainer,
  },
  props: {
    sourceCode: { type: String },
  },
  data() {
    return {
      outputModes: ["preview"], //"preview", "css"
      mode: "preview",
      svalue: "default1",
      deviceSizes: sizes,
      arrayOfObjects: [1, 2, 3, 4, 5],
      object: {
        name: "Object Name",
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
    },
    handleCommand(command) {
      console.log("click on item " + command);
      this.svalue = command;
      console.log(this.svalue);
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

.output-header {
  /* box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  height: var(--header-height);
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  height: var(--header-height);
  overflow: hidden;
  white-space: nowrap;
  position: relative;
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
  flex: 0 1 auto;
  overflow: hidden;
  /* display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;

  font-size: 13px;
  text-transform: uppercase;
  color: var(--text-light); */

  /* position: sticky;
  margin-left: auto;
  top: 0;
  right: 0; */
  /* background-color: var(--bg); */
}

.toolbar-navs .item {
  padding: 6px 12px 6px;
  border-left: 1px solid var(--border);
}

.output-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>
