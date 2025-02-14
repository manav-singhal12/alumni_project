import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     "/api/v1/": "https://alumni-kid1.onrender.com/",
  //     "/socket.io": {
  //       target: "https://alumni-project-3.onrender.com",
  //       ws: true,
  //     },
  //   },
  // },
});