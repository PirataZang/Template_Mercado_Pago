import { defineNuxtPlugin } from '#app'
import { AgGridVue } from 'ag-grid-vue3'

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

export default defineNuxtPlugin((nuxtApp) => {
    // Registra todos os módulos da versão Community
    ModuleRegistry.registerModules([AllCommunityModule])

    // Registra o componente globalmente
    nuxtApp.vueApp.component('AgGridVue', AgGridVue)
})
