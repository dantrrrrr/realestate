import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

const env = dotenv.config().parsed; // https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": { target: env.VITE_API_URL, secure: false },
    },
  },
  plugins: [react()],
});
