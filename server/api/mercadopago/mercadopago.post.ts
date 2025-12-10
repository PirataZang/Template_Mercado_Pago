import { MercadoPagoConfig, Preference } from 'mercadopago'

const runtimeConfig = useRuntimeConfig()

const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-4065671579552751-111311-0b96cbe0b9d7bae3ee41a44d4e5c85cd-2988184892', // Usando o token secreto
})

export default defineEventHandler(async (event) => {
    const preference = new Preference(client)
    const body = await readBody(event)

    try {
        const preferenceResult = await preference.create({
            body: body as any, // Recebe a estrutura de Item/Back URLs do frontend
        })

        return preferenceResult // Retorna o objeto Preference, incluindo 'init_point'
    } catch (error) {
        // ... (Tratamento de erro) ...
        console.error('Erro ao criar Preferência:', error) // Adicionado log
        throw createError({
            statusCode: 500,
            statusMessage: 'Falha ao criar a preferência de pagamento no Mercado Pago',
        })
    }
})
