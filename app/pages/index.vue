<template>
    <div>
        <div class="mt-8">
            <UButton @click="handleSendMail" :loading="loading"> Send Test Email </UButton>
            <Button label="Teste" href="www.google.com"/>
            <p v-if="error" class="text-red-500 mt-2">Error: {{ error.message }}</p>

            <p v-if="data" class="text-green-500 mt-2">Email sent successfully! Message ID: {{ data.messageId }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Button from '~/components/Utils/Button.vue'

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
