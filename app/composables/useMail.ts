// app/composables/useMail.ts

// Define the structure of the email data
interface MailPayload {
    to: string
    subject: string
    text?: string
    html?: string
}

export const useMail = () => {
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const data = ref<any | null>(null)

    /**
     * Sends an email by calling the server-side API endpoint.
     * @param payload - An object containing the email details (to, subject, text, html).
     */
    const sendMail = async (payload: MailPayload) => {
        loading.value = true
        error.value = null
        data.value = null

        try {
            const response = await useFetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (response.error.value) {
                throw response.error.value
            }

            data.value = response.data.value
        } catch (e: any) {
            error.value = e
            console.error('Failed to send email:', e)
        } finally {
            loading.value = false
        }
    }

    return {
        sendMail,
        loading,
        error,
        data,
    }
}
