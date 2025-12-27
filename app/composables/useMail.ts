// composables/useMail.ts
export const useMail = () => {
    const loading = ref(false)
    const error = ref<{ message: string } | null>(null)
    const data = ref<{ messageId: string } | null>(null)

    const sendEmail = async (options: { to: string; subject: string; text?: string; html?: string }) => {
        loading.value = true
        error.value = null
        data.value = null

        try {
            const response = await $fetch('/api/send-email', {
                method: 'POST',
                body: options,
            })

            // Armazena a resposta de sucesso
            data.value = response as { messageId: string }
            return { success: true, data: response }
        } catch (err: any) {
            // Define o erro no formato que seu template espera (.message)
            error.value = {
                message: err.data?.statusMessage || err.message || 'Failed to send email',
            }
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    return {
        sendEmail,
        loading,
        error,
        data,
    }
}
