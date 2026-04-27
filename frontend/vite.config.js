import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // Allows external access (0.0.0.0)
    port: 3000,
    open: true,
    allowedHosts: [
      '.trycloudflare.com',    // Allows all Cloudflare tunnels
      '.loca.lt',              // Allows localtunnel
      '.ngrok.io',             // Allows ngrok
      '.ngrok-free.app',       // Allows new ngrok domains
      'localhost',
      '127.0.0.1'
    ]
  }
})