import { MercadoPagoConfig, Preference } from 'mercadopago'
import { prisma } from '~/lib/prisma'

const runtimeConfig = useRuntimeConfig()

const client = new MercadoPagoConfig({
    accessToken: runtimeConfig.MERCADO_PAGO_ACCESS_TOKEN,
})

export default defineEventHandler(async (event) => {
    const preference = new Preference(client)
    const body = await readBody(event)
    const query = getQuery(event)

    const order = await prisma.order.create({
        data: {
            status: 'pending',
            reference: body.external_reference,
        },
    })

    try {
        const preferenceResult = await preference.create({
            body: body as any, // Recebe a estrutura de Item/Back URLs do frontend
        })

        const test = 1

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
