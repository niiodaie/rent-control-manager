import { defineConfig } from 'vite'; // ✅ This is the missing import
import react from '@vitejs/plugin-react';
import path from 'path';
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
