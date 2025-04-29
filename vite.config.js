import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite'; 
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    proxy: {
      '/terms': {
        target: 'http://localhost:3004',  
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/terms/, '/terms'),
      },
      '/products': {
        target: 'http://localhost:3004',
        changeOrigin: true,
      },
    },
  },
});
