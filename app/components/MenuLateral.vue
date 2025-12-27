<template>
    <div>
        <button class="toggle-btn" @click="toggle" :aria-expanded="isOpen.toString()">☰</button>

        <transition name="fade">
            <div v-if="isOpen" class="overlay" @click.self="close">
                <aside class="side-menu" role="dialog" aria-modal="true">
                    <div class="menu-header">
                        <h2 class="menu-title">Menu</h2>
                        <NuxtButton color="neutral" variant="ghost" @click="close">✕</NuxtButton>
                    </div>

                    <nav class="menu-items">
                        <div class="menu-item" v-for="(item, i) in items" :key="i">
                            <NuxtButton color="neutral" variant="ghost">{{ item }}</NuxtButton>
                        </div>
                    </nav>
                </aside>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import Nuxt UI button (adjust import if your project uses a different UI package)
const isOpen = ref(false)
const items = ['Início', 'Perfil', 'Pagamentos', 'Configurações', 'Sair']

function toggle() {
    isOpen.value = !isOpen.value
}

function close() {
    isOpen.value = false
}
</script>

<style scoped>
/* Overlay covers entire viewport and dims background */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.28);
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    z-index: 1200;
}

/* Side menu styles: white + purple accent, rounded border */
.side-menu {
    width: 320px;
    max-width: 92vw;
    background: linear-gradient(180deg, #ffffff 0%, #fbf8ff 100%);
    border-radius: 12px 0 0 12px;
    padding: 18px;
    box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu-title {
    margin: 0;
    color: #3b0b61; /* deep purple */
    font-size: 1.05rem;
}

.menu-items {
    display: flex;
    flex-direction: column;
    gap: 5px; /* 5px between each button as requested */
    margin-top: 6px;
}

.menu-item {
    display: flex;
}

/* Minimal toggle button, sits above content */
.toggle-btn {
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 1300;
    background: #6b21a8; /* purple */
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 1.05rem;
    cursor: pointer;
}

/* Simple fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
