<template>
  <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, inject } from "vue";
import { debounce } from "../utils";
import CodeMirror from "./codemirror";

export interface Props {
  mode?: string;
  value?: string;
  readonly?: boolean;
  lineNumbers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "htmlmixed",
  value: "",
  readonly: false,
  lineNumbers: true,
});

const emit = defineEmits<(e: "change", value: string) => void>();

const el = ref();
// const el = ref<HTMLElement | null>(null);
const needAutoResize: Boolean = inject("autoresize") as Boolean;

onMounted(() => {
  const addonOptions = {
    autoCloseBrackets: true, // 括号自动关闭
    autoCloseTags: true, // 标签自动关闭
    matchTags: true, // 标签匹配
    matchBrackets: true, // 括号匹配
    foldGutter: true, // 代码折叠
    styleActiveLine: true, // 高亮选中行
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  };

  const editor = CodeMirror(el.value!, {
    value: "",
    mode: props.mode, // https://codemirror.net/5/mode/index.html
    readOnly: props.readonly ? "nocursor" : false, //  boolean|string  “nocursor” 设置只读外，编辑区域还不能获得焦点。
    tabSize: 2, // tab 字符的宽度
    lineNumbers: props.lineNumbers, //显示行号
    lineWrapping: true,
    scrollbarStyle: "simple", // 默认 "null" 不显示  'simple'  内侧 "overlay"外侧
    ...addonOptions,
  });

  editor.on("change", () => {
    emit("change", editor.getValue());
  });

  watchEffect(() => {
    const cur = editor.getValue();
    if (props.value !== cur) {
      editor.setValue(props.value);
    }
  });

  setTimeout(() => {
    editor.refresh();
  }, 50);

  if (needAutoResize) {
    window.addEventListener(
      "resize",
      debounce(() => {
        editor.refresh();
      })
    );
  }
});
</script>

<style>
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.CodeMirror {
  font-family: var(--font-code);
  line-height: 1.5;
  height: 100%;
}
</style>
