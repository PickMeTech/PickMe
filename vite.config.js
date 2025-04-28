import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    root: 'frontend/starter',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'frontend/starter/src'),
        },
    },
});
