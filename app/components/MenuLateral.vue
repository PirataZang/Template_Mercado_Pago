<template>
    <div>
        <!-- Toggle button -->
        <button @click="toggle" :aria-expanded="isOpen.toString()" aria-label="Abrir menu" class="z-50 bg-[var(--menu-button)] text-white p-2.5 rounded-lg shadow-md hover:opacity-95 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z" clip-rule="evenodd" />
            </svg>
        </button>

        <transition enter-active-class="transition-all ease-in-out duration-300" enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
            <div v-if="isOpen" class="fixed inset-0 z-70 flex">
                <!-- overlay: blur + darken -->
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-out" :class="opacity" @click.self="close" aria-hidden="true"></div>

                <!-- menu (left) -->
                <aside class="relative z-50 w-80 max-w-[92vw] h-full bg-gradient-to-b from-white to-gray-400 rounded-r-2xl p-5 shadow-2xl flex flex-col" role="dialog" aria-modal="true">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-lg font-semibold">Menu</h2>
                        <Button @click="close" label="<i class='fa-solid fa-xmark'></i>" class="w-auto h-[35px]" color="var(--menu-button)" />
                    </div>

                    <nav class="flex flex-col gap-[5px]" aria-label="Menu principal">
                        <div v-for="(item, i) in itemsList" :key="i" class="flex flex-col gap-2 items-baseline">
                            <NuxtLink :to="item?.to" class="text-[var(--menu-button)] w-full font-medium flex-1 flex gap-4 p-2 hover:shadow-md duration-150 rounded-lg" @click="isOpen = false">
                                <span v-html="item?.icon"></span>
                                {{ item?.label }}
                            </NuxtLink>
                        </div>
                    </nav>
                </aside>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Button from './Utils/Button.vue'

const itemsList = [
    {
        to: '/',
        label: 'Início',
        icon: '<i class="fa-solid fa-user"></i>',
    },
    {
        to: '/sucess',
        label: 'Sucesso',
        icon: '<i class="fa-solid fa-check-circle"></i>',
    },
]

const isOpen = ref(false)
const opacity = ref('opacity-0')

watch(isOpen, (value) => {
    if (value) {
        setTimeout(() => {
            opacity.value = 'opacity-100'
        }, 300) // 1s de delay
    } else {
        opacity.value = 'opacity-0'
    }
})

function toggle() {
    isOpen.value = !isOpen.value
}

function close() {
    isOpen.value = false
}
</script>

<style></style>
