import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

// Resolve __dirname and __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Export Vite configuration
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), '');

  // Log the value of VITE_SERVER_BASE_URL to the console
  console.log('VITE_SERVER_BASE_URL:', env.VITE_SERVER_BASE_URL);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_BASE_URL, // Use loaded environment variable for API base URL
          changeOrigin: true, // Change the origin header to the target URL
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite the path
        },
      },
    },
  };
});

// resolve cors and environment errors: 
// - https://chatgpt.com/share/fd278027-6a40-415c-a57d-390bab309c71
// - https://chatgpt.com/share/301b4ff2-2c7a-4cb6-9856-94f7a2d8dda6