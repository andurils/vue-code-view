<template>
    <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, watchEffect, } from "vue";
import * as monaco from "monaco-editor";
import './userWorker';

export interface Props {
    mode?: string;
    value?: string;
    readonly?: boolean;
    // lineNumbers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    mode: "html",  // html css  json  typescript  or  [basic-languages]
    value: "",
    readonly: false,
    // lineNumbers: true,
});

const needAutoResize: Boolean = inject("autoresize") as Boolean;

const emit = defineEmits<(e: "change", value: string) => void>();
const el = ref();
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(() => {
    const defaultEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
        fontSize: 14,
        formatOnPaste: true,
        scrollBeyondLastLine: false,
        codeLens: true,
        wordWrap: 'bounded',
        showFoldingControls: 'mouseover',
        // cursorStyle: 'line',
        minimap: {
            enabled: true,
        },
    }

    // monaco.editor.defineTheme('my-theme', theme)
    // monaco.editor.setTheme('my-theme')

    editor = monaco.editor.create(el.value, {
        value: '',                                      // 内容
        language: 'html',                               // 语言
        readOnly: props.readonly,                       // 只读
        automaticLayout: needAutoResize.valueOf(),      // 自动调整大小
        theme: 'vs-dark',                               // 主题
        ...defaultEditorOptions
    });

    editor.onDidChangeModelContent(() => {
        emit("change", editor?.getValue() || '');
    });

    watchEffect(() => {
        const cur = editor?.getValue();
        if (props.value !== cur) {
            editor?.setValue(props.value);
        }
    });

    // setTimeout(() => {
    //     editor?.layout();
    // }, 50);

    // if (needAutoResize) {
    //     window.addEventListener(
    //         "resize",
    //         debounce(() => {
    //             editor?.layout();
    //         })
    //     );
    // }
});

onBeforeUnmount(() => {
    editor?.dispose();
});
</script>


 

<style scoped>
.editor {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>
