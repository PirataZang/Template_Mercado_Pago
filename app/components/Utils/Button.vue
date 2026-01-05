<template>
    <NuxtLink v-if="to && !href" :to="to" :class="buttonClasses" :style="buttonStyle" v-bind="$attrs">
        <span v-html="label"></span>
    </NuxtLink>

    <a v-else-if="href && !to" :href="href" target="_blank" :class="buttonClasses" :style="buttonStyle" v-bind="$attrs">
        <span v-html="label"></span>
    </a>

    <button v-else :to="to" :class="buttonClasses" :style="buttonStyle" v-bind="$attrs">
        <span v-html="label"></span>
    </button>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: null,
    },
    to: {
        type: String,
        default: null,
    },
    href: {
        type: String,
        default: null,
    },
})

// Estilos inline para a cor de fundo customizada
const buttonStyle = computed((): StyleValue => {
    const style: { backgroundColor?: string } = {}
    if (props.color) {
        style.backgroundColor = props.color
    }
    return style
})

// Classes de estilização do botão
const buttonClasses = computed(() => [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'py-2',
    'font-medium',
    'rounded-lg',
    'cursor-pointer',
    'shadow-sm',
    'text-white', // Cor de texto padrão para bom contraste
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    {
        // Classes de cor padrão se a prop 'color' não for fornecida
        'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500': !props.color,
        'hover:shadow-md': true,
    },
])
</script>
