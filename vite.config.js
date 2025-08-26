import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

 HEAD
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',   // 👈 this is important for Vercel

// https://vite.dev/config/
export default defineConfig({
  base: './',  //
  plugins: [react()],
 d9374bf2bbe1085ada73e381f0ef45430c53fc5d
})
