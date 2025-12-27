<template>
    <div>
        <div>
            <span>teste</span>
            <NuxtLink to="/payment">Pagamento Teste</NuxtLink>
        </div>

        <div class="mt-8">
            <UButton @click="handleSendMail" :loading="loading"> Send Test Email </UButton>

            <p v-if="error" class="text-red-500 mt-2">Error: {{ error.message }}</p>

            <p v-if="data" class="text-green-500 mt-2">Email sent successfully! Message ID: {{ data.messageId }}</p>
        </div>
    </div>

    <MenuLateral />
</template>

<script lang="ts" setup>
import MenuLateral from '~/components/MenuLateral.vue';
// Desestruturamos as variáveis reativas vindas do composable
const { sendEmail, loading, error, data } = useMail()
const handleSendMail = async () => {
    await sendEmail({
        to: 'igorfronza19@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email from the Nuxt application.',
        html: '<h1>Test Email</h1><p>This is a test email from the Nuxt application.</p>',
    })
}
</script>
