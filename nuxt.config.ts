// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    modules: ['@nuxt/ui'],
    css: ['./app/assets/css/main.css', '@fortawesome/fontawesome-free/css/all.min.css', 'ag-grid-community/styles/ag-grid.css', 'ag-grid-community/styles/ag-theme-quartz.css'],

    vite: {
        plugins: [tailwindcss()],
    },
    runtimeConfig: {
        GMAIL_USER: process.env.GMAIL_USER,
        GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
        MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR-5946751472309474-111311-70c790bb511043dd6a42f647545d39d4-267525737',
        MP_WEBHOOK_ACCESS: 'fa3fa9fe0a88727d0f7d757d13608b0f2890cd5a8c6d7d1ac3c2b1b600ff43ce',
        public: {
            NUXT_PUBLIC_MERCADO_PAGO_CLIENT: 'APP_USR-0fc3d37a-e179-40e1-add2-4eaf768a291d',
        },
    },
})
