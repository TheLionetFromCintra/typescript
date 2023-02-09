import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '^/api': {
                target: 'https://kviza.ra1z.ru',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            '^/dictionary': {
                target: 'https://modern-vue.netlify.app/',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            '^/promo': {
                target: 'https://kviza.ra1z.ru',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            '^/conf': {
                target: 'https://kviza.ra1z.ru',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/var.scss";`,
            },
        },
    },
})
