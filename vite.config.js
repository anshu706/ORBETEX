import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-markdown') ||
              id.includes('rehype') ||
              id.includes('remark') ||
              id.includes('katex') ||
              id.includes('highlight')
            ) {
              return 'vendor-markdown';
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('react-helmet')
            ) {
              return 'vendor-core';
            }
          }
        },
      },
    },
  },
})
