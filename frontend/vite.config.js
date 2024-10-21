import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          process.NODE_ENV === "development"
            ? "http://localhost:4000"
            : "http://books-app-b.ahmedlotfy.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],

  define: {
    "process.env": process.env,
  },
})
