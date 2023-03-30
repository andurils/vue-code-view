/// <reference types="vite/client" />
/// <reference types="@vitejs/plugin-vue2" />

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}