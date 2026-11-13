import { defineConfig } from 'vite'

export default defineConfig({
  root: 'app',
  base: './',
  build: { outDir: '../dist', emptyOutDir: true, assetsInlineLimit: asset => asset.endsWith('.woff2') ? true : undefined },
})

