import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Strict build-time validation for required environment variables
    const requiredEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    if (mode === 'production') {
      for (const key of requiredEnv) {
        if (!env[key]) {
          throw new Error(`CRITICAL BUILD ERROR: Missing required environment variable ${key}. Build aborted.`);
        }
      }
    }

    return {
      logLevel: 'error',
      server: {
        port: 3000,
        host: true,
        strictPort: true,
        allowedHosts: ["all"],
        proxy: {
          '^/.netlify/functions/.*': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/\.netlify\/functions/, '/api/ai'),
          },
        },
      },
      plugins: [
        react(),
        tailwindcss()
      ],
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './'),
        },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      },
      build: {
        outDir: 'dist',
        reportCompressedSize: false,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('jspdf') || id.includes('jspdf-autotable')) {
                  return 'vendor-pdf';
                }
                if (id.includes('xlsx')) {
                  return 'vendor-excel';
                }
                if (id.includes('lucide-react') || id.includes('recharts') || id.includes('motion')) {
                  return 'vendor-ui';
                }
                return 'vendor';
              }
            }
          }
        }
      }
    };
});
