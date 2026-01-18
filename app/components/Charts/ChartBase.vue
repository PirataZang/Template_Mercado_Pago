<template>
    <div class="rounded-2xl p-2 border border-gray-200 shadow-md flex items-center justify-center">
        <canvas ref="chartContainer"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

interface Props {
    type: 'line' | 'bar' | 'doughnut' | 'pie'
    labels?: string[]
    data?: any[]
    label: string
    height?: string
    datasets?: any[] | null
    width?: string
    borderColor?: string
    backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
    height: '500px',
    width: '500px',
})

const chartContainer = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

onMounted(() => {
    if (!chartContainer.value) return

    chartInstance = new Chart(chartContainer.value, {
        type: props.type,
        data: {
            labels: props.labels,
            datasets: props.datasets ?? [
                {
                    label: props.label,
                    data: props.data,
                    borderColor: props.borderColor,
                    backgroundColor: props.backgroundColor,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom' as const,
                    labels: {
                        font: {
                            size: 10,
                        },
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: {
                            size: 10,
                        },
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 10,
                        },
                    },
                },
            },
        },
    })
})

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy()
    }
})
</script>
