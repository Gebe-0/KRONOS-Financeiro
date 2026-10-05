import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Caminho base relativo para deploy perfeito em qualquer subpasta (como GitHub Pages)
  base: './',
})
