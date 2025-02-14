import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      "/api":"https://alumni-project-3.onrender.com/",
      "/socket.io":"https://alumni-project-3.onrender.com/",
      "/server":" https://alumni-project-qwg6.vercel.app",
      //
    }
  }
})
