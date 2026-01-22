<template>
    <header class="bg-white shadow-sm">
        <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-3">
                <!-- Left Side - The Menu Component with its own button -->
                <MenuLateral />

                <!-- Right Side - User Info -->
                <div class="flex items-center gap-4">
                    <img :src="user?.avatar" @click="openedModal = true" :title="user?.name" class="cursor-pointer w-10 h-10 rounded-full object-cover" />
                </div>
            </div>
        </div>

        <Modal backgroundColor="bg-white" :showButtonOpen="false" modalTitle="Configurações do Usuário" :modalWidth="'w-[700px]'" :isOpen="openedModal" @close="openedModal = false">
            <div>teste aaaa</div>
        </Modal>
    </header>
</template>

<script setup lang="ts">
import MenuLateral from '~/components/MenuLateral.vue'
import Modal from './Utils/Modal.vue'

const { user, fetchUser } = useUser()

const openedModal = ref(false)

onNuxtReady(async () => {
    await fetchUser()
})
</script>
