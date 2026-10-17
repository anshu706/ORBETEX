import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
    exclude: ['react-markdown', 'rehype-highlight', 'rehype-katex', 'remark-gfm', 'remark-math'],
  },
})
