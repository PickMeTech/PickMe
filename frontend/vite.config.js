import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true
        },
        //  proxy: {
        //      '/api': {
        //          target: 'http://localhost:8080',
        //          changeOrigin: true,
        //         secure: false
        //   }
        // }
    },
});