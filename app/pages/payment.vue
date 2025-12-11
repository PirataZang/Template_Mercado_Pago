<template>
    <div class="max-w-xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-3xl border border-gray-200">
        <h2 class="text-4xl font-extrabold text-blue-900 mb-2">Checkout de Pagamento</h2>
        <p class="text-gray-500 mb-8">Você será redirecionado para a plataforma segura do Mercado Pago.</p>

        <form @submit.prevent="processPayment">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label for="amount" class="block text-sm font-semibold text-gray-700 mb-2"> Valor a Pagar (R$) </label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">R$</span>
                        <input v-model.number="paymentData.amount" type="number" id="amount" step="0.01" min="0.01" required class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg font-bold text-gray-800 transition duration-200" placeholder="0.00" />
                    </div>
                </div>

                <div>
                    <label for="productTitle" class="block text-sm font-semibold text-gray-700 mb-2"> Descrição do Item </label>
                    <input v-model="paymentData.title" type="text" id="productTitle" required class="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-800 transition duration-200" placeholder="Nome do Produto ou Serviço" />
                </div>
            </div>

            <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 mb-8 flex items-center space-x-3">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V7a1 1 0 112 0v3h2a1 1 0 010 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h3z" clip-rule="evenodd"></path></svg>
                <span>Ao clicar em "Pagar Agora", você será enviado para o ambiente seguro do Mercado Pago para finalizar com Cartão, Pix ou Boleto.</span>
            </div>

            <button type="submit" :disabled="isProcessing || !paymentData.amount || paymentData.amount <= 0 || !paymentData.title" class="w-full py-4 text-xl font-bold text-white rounded-xl transition duration-300 ease-in-out shadow-lg transform hover:scale-[1.01] flex items-center justify-center space-x-2" :class="isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'">
                <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-else>Gerar Pagamento R$ {{ formattedAmount }}</span>
            </button>

            <p v-if="statusMessage" class="mt-6 p-4 rounded-xl text-center font-medium shadow-md" :class="statusClass">
                {{ statusMessage }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const paymentData = reactive({
    amount: 50.0,
    title: 'Produto de Teste', // Novo campo para dar nome ao item no MP
})

const statusMessage = ref('')
const statusType = ref('')
const isProcessing = ref(false)

const statusClass = computed(() => {
    if (statusType.value === 'success') {
        return 'bg-green-100 text-green-700 border border-green-300'
    } else if (statusType.value === 'error') {
        return 'bg-red-100 text-red-700 border border-red-300'
    } else if (statusType.value === 'info') {
        return 'bg-blue-100 text-blue-700 border border-blue-300'
    }
    return ''
})

const formattedAmount = computed(() => {
    const amount = paymentData.amount || 0
    return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

const processPayment = async () => {
    if (isProcessing.value) return

    isProcessing.value = true
    statusMessage.value = 'Gerando link de pagamento no Mercado Pago...'
    statusType.value = 'info'

    const { data: user } = await useFetch('/api/me')

    // Estrutura do body ajustada para o formato "Preference"
    const bodyReq = {
        items: [
            {
                title: paymentData.title,
                quantity: 1,
                unit_price: paymentData.amount,
                currency_id: 'BRL',
            },
        ],
        external_reference: user.value?.id,
        back_urls: {
            success: `${window.location.origin}/sucess`,
            pending: `${window.location.origin}/`,
            failure: `${window.location.origin}/`,
        },
    }

    try {
        const { data, error } = await useFetch('/api/mercadopago/mercadopago', {
            method: 'POST',
            query: { userId: user.value?.id },
            body: bodyReq,
        })

        if (error.value) throw error.value

        const paymentResponse = data.value

        if (paymentResponse && paymentResponse.init_point) {
            statusMessage.value = '✅ Sucesso! Redirecionando para o Checkout...'
            statusType.value = 'success'

            // Redireciona o usuário para o link gerado pelo backend
            window.location.href = paymentResponse.init_point
        } else {
            throw new Error('Resposta inválida do Mercado Pago.')
        }
    } catch (error) {
        console.error('Erro ao gerar Preferência:', error)
        statusMessage.value = `❌ Falha ao gerar link. Tente novamente.`
        statusType.value = 'error'
    } finally {
        isProcessing.value = false
    }
}
</script>

<style scoped>
.shadow-3xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
