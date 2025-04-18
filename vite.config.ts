import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/movies-app/',
  plugins: [react()],
  server: {
    open: '/movies-app/',
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables" as *;`,
      },
    },
  },
});
