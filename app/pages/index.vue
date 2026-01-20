<template>
    <div class="flex w-full flex-col gap-6 p-4">
        <div class="flex gap-2">
            <Button label="Teste" href="https://www.google.com/?hl=pt_BR" />
            <TestModal />
            <Button label="Chamar API" @click="getMe" />
        </div>

        <div class="flex gap-2">
            <!-- Gráfico de Linha -->
            <div class="flex-1">
                <h2 class="text-lg font-semibold mb-2">Vendas por Mês</h2>
                <ChartBase type="line" label="Vendas" :labels="['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']" :data="[45, 67, 52, 78, 89, 64]" borderColor="rgb(59, 130, 246)" :backgroundColor="'rgba(59, 130, 246, 0.1)'" />
            </div>

            <!-- Gráfico de Barras -->
            <div class="flex-1">
                <h2 class="text-lg font-semibold mb-2">Produtos Mais Vendidos</h2>
                <ChartBase type="bar" label="Quantidade" :labels="['Produto A', 'Produto B', 'Produto C', 'Produto D']" :data="[85, 72, 68, 90]" borderColor="rgb(34, 197, 94)" :backgroundColor="'rgba(34, 197, 94, 0.5)'" />
            </div>
        </div>

        <div class="flex gap-2">
            <!-- Gráfico Pizza -->
            <div class="">
                <h2 class="text-lg font-semibold mb-2">Distribuição de Categorias</h2>
                <ChartBase width="350px" type="pie" label="Percentual" :labels="['Eletrônicos', 'Roupas', 'Alimentos', 'Outros']" :data="[30, 25, 20, 25]" border-color="white" :backgroundColor="['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)']" />
            </div>
            <!-- Gráfico Doughnut -->
            <div class="">
                <h2 class="text-lg font-semibold mb-2">Taxa de Conversão</h2>
                <ChartBase width="350px" type="doughnut" label="Conversão" :datasets="dataSetPie" :labels="['Conversão', 'Não Conversão']" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TestModal from '~/components/TestModal.vue'
import Button from '~/components/Utils/Button.vue'
import ChartBase from '~/components/Charts/ChartBase.vue'

const dataSetPie = [
    {
        label: 'Conversão',
        data: [30],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(255, 99, 132, 1)',
    },
    {
        label: 'Não Conversão',
        data: [2],
        backgroundColor: 'rgba(17, 207, 20)',
        borderWidth: 1,
        borderColor: 'rgba(25, 112, 26)',
    },
]

async function callApi() {
    const { data: response } = await useFetch('/api/teste', {
        method: 'POST',
    })
}

async function getMe() {
    const { data: response } = await useFetch('/api/me', {
        method: 'GET',
    })
}
</script>
