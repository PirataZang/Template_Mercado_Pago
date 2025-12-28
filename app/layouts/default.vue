<template>
    <div class="bg-gray-100 min-h-screen">
        <Header />
        <main class="flex p-4">
            <slot />
        </main>
        <footer></footer>
    </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>
