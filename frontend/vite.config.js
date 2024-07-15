import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://babyboo-backend-test.onrender.com",
      "/uploads/": "https://babyboo-backend-test.onrender.com",
    },
  },
});
