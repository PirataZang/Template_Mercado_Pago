// server/api/send-email.post.ts
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Configuração do Transportador (Recomendo usar variáveis de ambiente!)
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    })

    try {
        const info = await transporter.sendMail({
            from: `"Meu App Nuxt" <${process.env.MAIL_USER}>`,
            to: body.to,
            subject: body.subject,
            text: body.text,
            html: body.html,
        })

        return { message: 'E-mail enviado!', messageId: info.messageId }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Falha no envio do e-mail',
        })
    }
})
