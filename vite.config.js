import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // This is an example, use your actual project path
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
