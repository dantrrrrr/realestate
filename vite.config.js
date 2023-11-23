import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const API_URL = "https://api-realestate-blue.vercel.app";

export default defineConfig({
  server: {
    proxy: {
      "/api": { target: API_URL, secure: false },
    },
  },
  plugins: [react()],
});
