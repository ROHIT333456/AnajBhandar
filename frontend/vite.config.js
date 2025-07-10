import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    port: 5173,
    open: true,
  },

  // ✅ Fixes "Cannot GET /reset-password/:token" on refresh or deep link
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },

  // ✅ Handles client-side routing fallback (important for React Router)
  resolve: {
    alias: {
      // Optional: Add aliases if you want cleaner imports
    },
  },

  // ✅ Most important for deep linking
  base: '/',
})
