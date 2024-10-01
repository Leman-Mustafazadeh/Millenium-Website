import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ['build.rollupOptions.external'], // Replace with your module name
  //   },
  // },
   build:{
    outDir: "build"
  }
});