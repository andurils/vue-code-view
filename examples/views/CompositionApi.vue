<template>
  <div>
    {{ props.test }}
    <HW></HW>

    <!-- 挂载DOM元素 -->
    <p ref="msg">留意该节点，有一个ref属性</p>
    <!-- 挂载DOM元素 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import HW from "./Test2.vue";

import { useDark, useToggle } from "@vueuse/core";
import { useLocaleStore } from "@examples/store/modules/locale"; //引入store

export default defineComponent({
  components: {
    HW,
  },
  props: {
    test: {
      type: String,
      //   required: true,
      default: "xxxxxxxxxxx",
    },
  },
  setup(props) {
    console.log(1);

    const store = useLocaleStore();
    // 定义挂载节点，声明的类型详见下方附表
    const msg = ref<HTMLElement | null>(null);

    const isDark = useDark({
      selector: "body",
      attribute: "class",
      valueDark: "dark",
      valueLight: "light",
    });
    const toggleDark = useToggle(isDark);

    onBeforeMount(() => {
      console.log(2);
    });

    onMounted(() => {
      console.log(3);
      // 比如获取DOM的文本
      console.log(msg.value!.innerText);
      console.log("pinia", store.getShowPicker, store.getLocale);
    });

    console.log(4);
    return {
      props,
      msg,
      isDark,
      toggleDark,
    };
  },
});
</script>
