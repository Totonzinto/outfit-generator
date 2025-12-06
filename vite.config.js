import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Tells Vite to look for index.html and all frontend source files inside the 'public' folder
  build: {

    outDir: '../dist',
    
  }
});