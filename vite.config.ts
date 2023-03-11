import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: "./build",
  },
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  define: {
    global: {},
    process: {
      env: {
        REACT_APP_API: process?.env.REACT_APP_API || 'production',
      },
    },
  },
  resolve: {
    alias: [
      {find: 'components', replacement: path.join(__dirname, 'src', 'components')},
      {find: 'containers', replacement: path.join(__dirname, 'src', 'containers')},
      {find: 'contexts', replacement: path.join(__dirname, 'src', 'contexts')},
      {find: '@src', replacement: path.join(__dirname, 'src')},
    ],
  },
});
