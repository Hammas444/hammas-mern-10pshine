/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ✅ required for React component tests
    globals: true,         // optional but convenient (so you can use `describe`, `it`, etc. without imports)
    setupFiles: './src/setupTests.js', // optional setup (like jest-dom)
  },
})