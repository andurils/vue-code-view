import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'vcv-repl.js'
    },
    rollupOptions: {
      external: ['vue', '@vue/compiler-sfc']
    }
  }
})
