import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: './',  // Changed from '/' to './'
  publicDir: 'public',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'  // Explicitly point to your HTML file
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})