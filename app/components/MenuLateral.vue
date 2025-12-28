<template>
    <div>
        <!-- Toggle button -->
        <button @click="toggle" :aria-expanded="isOpen.toString()" aria-label="Abrir menu" class="z-50 bg-purple-600 text-white p-2.5 rounded-lg shadow-md hover:opacity-95 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z" clip-rule="evenodd" />
            </svg>
        </button>

        <transition enter-active-class="transition-transform duration-300" enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
            <div v-if="isOpen" class="fixed inset-0 z-70 flex">
                <!-- overlay: blur + darken -->
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click.self="close" aria-hidden="true"></div>

                <!-- menu (left) -->
                <aside class="relative z-50 w-80 max-w-[92vw] h-full bg-gradient-to-b from-white to-purple-50 rounded-r-2xl p-5 shadow-2xl flex flex-col" role="dialog" aria-modal="true">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-purple-800 text-lg font-semibold">Menu</h2>
                        <UButton color="neutral" variant="ghost" @click="close" aria-label="Fechar menu">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </UButton>
                    </div>

                    <nav class="flex flex-col gap-[5px]" aria-label="Menu principal">
                        <div v-for="(item, i) in itemsList" :key="i" class="flex items-center rounded-lg hover:bg-purple-100 px-2 py-1">
                            <!-- espaço para ícone -->
                            <div class="w-9 h-9 mr-3 flex items-center justify-center text-purple-600">
                                <div class="w-5 h-5 bg-purple-100 rounded-full"></div>
                            </div>

                            <div class="flex-1">
                                <NuxtLink :to="item?.to" class="block w-full px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 ease-in-out text-left">
                                    {{ item?.label }}
                                </NuxtLink>
                            </div>
                        </div>
                    </nav>

                    <div class="mt-auto pt-4 border-t border-purple-100">
                        <NuxtButton color="neutral" variant="ghost" class="w-full justify-start">Sair</NuxtButton>
                    </div>
                </aside>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const itemsList = [
    {
        to: '/',
        label: 'Início',
        icon: 'home',
    },
]

const isOpen = ref(false)

function toggle() {
    isOpen.value = !isOpen.value
}

function close() {
    isOpen.value = false
}
</script>

<style>
/* No additional CSS needed; Tailwind handles styles and transitions via classes */
</style>
