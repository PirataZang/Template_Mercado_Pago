import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Email and password are required',
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid credentials',
        })
    }

    // NOTE: Storing passwords in plain text is not secure.
    // In a real application, you should use a library like bcrypt to hash and compare passwords.
    if (user.password !== password) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid credentials',
        })
    }

    const token = crypto.randomBytes(64).toString('hex')

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            token,
        },
    })

    setCookie(event, 'auth-token', token, {
        httpOnly: true,
        path: '/',
    })

    const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
    }

    const stringifyUser = JSON.stringify(userData)

    setCookie(event, 'user-session', stringifyUser, {
        httpOnly: true,
        path: '/',
    })

    return userData
})
