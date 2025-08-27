import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // 👈 important for deployment (e.g. Vercel, GitHub Pages)
  plugins: [react()],
});
