import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactIcons from "vite-plugin-react-icons";
import reactRefresh from "@vitejs/plugin-react-refresh";

const API_URL = "https://api-realestate-blue.vercel.app";

export default defineConfig({
  server: {
    proxy: {
      "/api": { target: API_URL, secure: false },
    },
  },
  plugins: [reactRefresh(),reactIcons],
  build: {
    rollupOptions: {
      external: ["react-icons"],
    },
  },
});
