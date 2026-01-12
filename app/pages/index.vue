<template>
    <div class="flex gap-2">
        <Button label="Teste" href="https://www.google.com/?hl=pt_BR" />
        <TestModal />
    </div>
</template>

<script lang="ts" setup>
import TestModal from '~/components/TestModal.vue';
import Button from '~/components/Utils/Button.vue'
</script>
