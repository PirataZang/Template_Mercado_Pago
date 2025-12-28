<template>
    <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-3">
                <!-- Left Side - The Menu Component with its own button -->
                <MenuLateral />

                <!-- Middle - Logo or Title -->
                <div class="text-xl font-bold text-gray-800">
                    <NuxtLink to="/">MySystem</NuxtLink>
                </div>

                <!-- Right Side - Placeholder for user icon, etc. -->
                <div class="w-10"></div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import MenuLateral from '~/components/MenuLateral.vue'
import Button from './Utils/Button.vue'
</script>
