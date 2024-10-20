import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
  define: {
    "process.env": process.env,
    "process.env.VITE_BACKEND_URL": process.env.VITE_BACKEND_URL,
  },
})
