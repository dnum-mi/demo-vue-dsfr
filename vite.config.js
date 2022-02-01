import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [vue()],
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/v1/, '/demo/v1.0'),
      },
    },
  },
})
