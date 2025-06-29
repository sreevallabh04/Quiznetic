import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Production optimizations
    minify: 'esbuild',
    sourcemap: false, // Disable source maps in production for security
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          // Vendor chunks
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          auth: ['@clerk/clerk-react'],
          toast: ['react-toastify'],
          
          // App chunks
          components: [
            './src/components/Quiz.tsx',
            './src/components/ClassSelection.tsx',
            './src/components/SubjectSelection.tsx',
            './src/components/ChapterSelection.tsx'
          ],
          data: [
            './src/data/chapterData.ts',
            './src/data/subjects.ts'
          ]
        },
        // File naming for cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg|ico|webp/.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/.test(ext || '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Target modern browsers for better optimization
    target: 'es2020'
  },
  // Performance optimization
  server: {
    hmr: {
      overlay: false
    }
  },
  // Define environment variables for production
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  }
});
