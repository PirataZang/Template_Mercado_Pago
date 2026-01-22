<template>
    <div class="flex flex-col gap-2 w-full">
        <div class="flex gap-2">
            <Button label="teste" @click="openForm" />
        </div>
        <Grid :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" @update:selection="handleSelection" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/Utils/Button.vue'
import Grid from '~/components/Utils/Grid.vue'

const selectedIds = ref<number[]>([])

const handleSelection = (data: any[]) => {
    selectedIds.value = data.map((item) => item.id)
}

const openForm = () => {
    alert('Abrindo registro(s): ' + selectedIds.value.join(', '))
}

const columnDefs = ref([
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Nome', GridOptions: { flex: 1 }, sortable: true, filter: true, resizable: true },
    { field: 'age', headerName: 'Idade' },
    { field: 'country', headerName: 'País' },
])

const rowData = ref([
    { id: 1, name: 'Igor', age: 22, country: 'Brasil' },
    { id: 2, name: 'Ana', age: 25, country: 'Portugal' },
])

const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
}
// ... seus columnDefs e rowData continuam iguais
</script>
