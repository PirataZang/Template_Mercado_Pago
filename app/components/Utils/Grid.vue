<template>
    <ClientOnly>
        <div class="ag-theme-quartz" style="width: 100%; height: 400px">
            <AgGridVue theme="Quartz" class="w-full h-full" :rowData="props.rowData" :columnDefs="columnDefsWithSelection" :defaultColDef="props.defaultColDef" pagination :paginationAutoPageSize="true" rowSelection="multiple" :rowMultiSelectWithClick="true" :suppressRowClickSelection="false" />
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { computed } from 'vue'

const props = defineProps({
    rowData: {
        type: Array,
        default: () => [],
    },
    columnDefs: {
        type: Array,
        default: () => [],
    },
    defaultColDef: {
        type: Object,
        default: () => ({}),
    },
})

const theme = {
    theme: 'quartz',
    headerHeight: 42,
    rowHeight: 40,
}

// Coluna de seleção (checkbox)
const columnDefsWithSelection = computed(() => {
    return [
        {
            headerName: '',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 50,
            pinned: 'left',
        },
        ...props.columnDefs,
    ]
})
</script>
