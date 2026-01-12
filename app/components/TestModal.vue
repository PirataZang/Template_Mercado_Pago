<template>
    <Modal label="Abrir teste" modalTitle="Teste de Modal" :modalWidth="'w-[700px]'" button-size="45px">
        <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Conteúdo do Modal de Teste</h2>
            <p>Este é um modal de teste utilizando o componente Modal reutilizável.</p>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import Modal from './Utils/Modal.vue'
</script>
