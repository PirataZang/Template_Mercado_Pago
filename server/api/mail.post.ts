// server/api/mail.post.ts
import { defineEventHandler, readBody } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
    const { to, subject, text, html } = await readBody(event)
    const config = useRuntimeConfig()

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.GMAIL_USER,
            pass: config.GMAIL_APP_PASSWORD,
        },
    })

    const mailOptions = {
        from: config.GMAIL_USER,
        to,
        subject,
        text,
        html,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        return { success: true, messageId: info.messageId }
    } catch (error: any) {
        console.error('Error sending email:', error)
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
})
