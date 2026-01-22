<template>
    <ClientOnly>
        <div class="ag-theme-quartz" style="width: 100%; height: 400px">
            <AgGridVue theme="Quartz" class="w-full h-full" :rowData="props.rowData" :columnDefs="columnDefsWithSelection" :defaultColDef="props.defaultColDef" pagination :paginationAutoPageSize="true" rowSelection="multiple" :rowMultiSelectWithClick="true" :suppressRowClickSelection="false" @grid-ready="onGridReady" @selection-changed="onSelectionChanged" />
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { computed, ref } from 'vue'

const props = defineProps({
    rowData: { type: Array, default: () => [] },
    columnDefs: { type: Array, default: () => [] },
    defaultColDef: { type: Object, default: () => ({}) },
})

// Definimos o evento que será enviado para o pai
const emit = defineEmits(['update:selection'])

const gridApi = ref(null)

const onGridReady = (params: any) => {
    gridApi.value = params.api
}

const onSelectionChanged = () => {
    if (gridApi.value) {
        // Pega todos os nós selecionados
        const selectedNodes = gridApi.value.getSelectedNodes()
        // Extrai apenas os dados (data) de cada linha
        const selectedData = selectedNodes.map((node: any) => node.data)

        // Envia para o pai
        emit('update:selection', selectedData)
    }
}

const columnDefsWithSelection = computed(() => {
    return [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            filter: false,
            width: 50,
            suppressMenu: true,
        },
        ...props.columnDefs,
    ]
})
</script>
