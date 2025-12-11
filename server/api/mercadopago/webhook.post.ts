import { H3Event } from 'h3'
import { prisma } from '@/lib/prisma'

export default defineEventHandler(async (event: H3Event) => {
    const bodyRaw = await readRawBody(event)
    const body = JSON.parse(bodyRaw || '{}')

    const query = getQuery(event)

    console.log('🔔 Webhook recebido:', { body, query })

    // -------------------------------------
    // PEGAR PAYMENT ID (todos os jeitos possíveis)
    // -------------------------------------
    const paymentId = body?.data?.id || body?.id || query['data.id'] || query.id

    if (!paymentId) {
        console.log('⚠️ Webhook sem paymentId')
        return { ok: true }
    }

    // -------------------------------------
    // CONSULTAR O PAGAMENTO NO MERCADO PAGO
    // -------------------------------------
    const runtimeConfig = useRuntimeConfig()
    const accessToken = runtimeConfig.MERCADO_PAGO_ACCESS_TOKEN

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })

    if (!mpRes.ok) {
        console.error('❌ Falha ao buscar pagamento:', await mpRes.text())
        return { error: true }
    }

    const payment = await mpRes.json()

    console.log('📄 Dados do pagamento:', payment)

    // -------------------------------------
    // SALVAR / ATUALIZAR PAYMENT NO BANCO
    // -------------------------------------
    await prisma.payment.upsert({
        where: { mpPaymentId: BigInt(payment.id) },
        update: {
            status: payment.status,
            statusDetail: payment.status_detail,
            amount: payment.transaction_amount,
            externalReference: payment.external_reference,
            paymentType: payment.payment_method_id,
            rawPayload: payment,
            attempts: { increment: 1 },
            userId: Number(payment.external_reference),
        },
        create: {
            mpPaymentId: BigInt(payment.id),
            status: payment.status,
            statusDetail: payment.status_detail,
            amount: payment.transaction_amount,
            externalReference: payment.external_reference,
            paymentType: payment.payment_method_id,
            rawPayload: payment,
            userId: Number(payment.external_reference),
        },
    })

    // -------------------------------------
    // WORKFLOW QUANDO APROVA
    // -------------------------------------
    if (payment.status === 'approved') {
        console.log('🔥 PAGAMENTO APROVADO para userId:', payment.external_reference)
        await prisma.order.updateMany({
            where: { paymentId: payment.id },
            data: { status: 'paid' },
        })
    }

    return { ok: true }
})
