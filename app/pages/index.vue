<template>
    <div class="flex w-full flex-col gap-6 p-4">
        <div class="flex gap-2">
            <Button label="Teste" href="https://www.google.com/?hl=pt_BR" />
            <TestModal />
        </div>

        <div class="flex gap-2">
            <!-- Gráfico de Linha -->
            <div>
                <h2 class="text-lg font-semibold mb-2">Vendas por Mês</h2>
                <ChartBase height="450px" width="700px" type="line" label="Vendas" :labels="['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']" :data="[45, 67, 52, 78, 89, 64]" borderColor="rgb(59, 130, 246)" :backgroundColor="'rgba(59, 130, 246, 0.1)'" />
            </div>

            <!-- Gráfico de Barras -->
            <div>
                <h2 class="text-lg font-semibold mb-2">Produtos Mais Vendidos</h2>
                <ChartBase height="450px" width="700px" type="bar" label="Quantidade" :labels="['Produto A', 'Produto B', 'Produto C', 'Produto D']" :data="[85, 72, 68, 90]" borderColor="rgb(34, 197, 94)" :backgroundColor="'rgba(34, 197, 94, 0.5)'" />
            </div>
        </div>

        <div class="flex gap-2">
            <!-- Gráfico Pizza -->
            <div>
                <h2 class="text-lg font-semibold mb-2">Distribuição de Categorias</h2>
                <ChartBase height="450px" width="700px" type="pie" label="Percentual" :labels="['Eletrônicos', 'Roupas', 'Alimentos', 'Outros']" :data="[30, 25, 20, 25]" :backgroundColor="'rgba(255, 99, 132, 0.5)'" />
            </div>
            <!-- Gráfico Doughnut -->
            <div>
                <h2 class="text-lg font-semibold mb-2">Taxa de Conversão</h2>
                <ChartBase height="750px" type="doughnut" label="Conversão" :labels="['Conversão', 'Não Conversão']" :data="[65, 35]" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TestModal from '~/components/TestModal.vue'
import Button from '~/components/Utils/Button.vue'
import ChartBase from '~/components/Charts/ChartBase.vue'
</script>
