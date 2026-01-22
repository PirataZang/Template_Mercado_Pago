<template>
    <Grid :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef" />
</template>

<script setup lang="ts">
import Grid from '~/components/Utils/Grid.vue';


const columnDefs = ref([
    { field: 'name', headerName: 'Nome' },
    { field: 'age', headerName: 'Idade' },
    { field: 'country', headerName: 'País' },
])

const rowData = ref([
    { name: 'Igor', age: 22, country: 'Brasil' },
    { name: 'Ana', age: 25, country: 'Portugal' },
])

const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
}
</script>
