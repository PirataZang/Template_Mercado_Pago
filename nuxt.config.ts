// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    modules: ['@nuxt/ui'],
    css: ['./app/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
    },
    runtimeConfig: {
        MERCADO_PAGO_ACCESS_TOKEN: 'APP_USR-5946751472309474-111311-70c790bb511043dd6a42f647545d39d4-267525737',
        public: {
            NUXT_PUBLIC_MERCADO_PAGO_CLIENT: 'APP_USR-0fc3d37a-e179-40e1-add2-4eaf768a291d',
        },
    },
})
