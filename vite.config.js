// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Tells Vite to look for index.html and all frontend source files inside the 'public' folder
  build: {
    // Optional: Specify where to put the final optimized files
    outDir: '../dist',
    // You can also specify the entry file here, though 'root' often handles it
    // rollupOptions: {
    //   input: {
    //     main: 'public/index.html'
    //   }
    // }
  }
});