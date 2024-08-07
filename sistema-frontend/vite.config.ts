import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/*' : './src/*',
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@customTypes': path.resolve(__dirname, 'src/types'),
      '@reduxConfig': path.resolve(__dirname, 'src/redux'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@skins': path.resolve(__dirname, 'src/skins'),
      '@editor': path.resolve(__dirname, 'src/editor'),
    },
  },
})
