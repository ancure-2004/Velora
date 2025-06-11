import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: '0.0.0.0',   // <== MUST for tunnels to reach your server
    port: 5173,        // Optional, but recommended
    strictPort: true   // Fail fast if port is in use
  }
})
