import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3000,
    proxy:{
      '/api': {
        target: 'https://chingu-v43-team14b.ahmedlotfy.dev/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
  }
},
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
});
