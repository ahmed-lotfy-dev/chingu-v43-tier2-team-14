import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      api: "http://localhost:4000",
    },
  },
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
})
