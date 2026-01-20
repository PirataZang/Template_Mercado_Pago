<template>
    <header class="bg-white shadow-sm">
        <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-3">
                <!-- Left Side - The Menu Component with its own button -->
                <MenuLateral />

                <!-- Right Side - Placeholder for user icon, etc. -->
                <div class="w-10"></div>

                <div class="flex gap-2">
                    {{ user?.name ?? 'Usuário' }}
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import MenuLateral from '~/components/MenuLateral.vue'
const { fetchUser } = useUser()
const user = await fetchUser()

</script>
