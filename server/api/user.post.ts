import { prisma } from '~/lib/prisma'
import { cacheManager } from '../utils/cache'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = body.token

    // Tenta obter do cache primeiro
    const cachedUser = cacheManager.get(`user:${token}`)
    if (cachedUser) {
        return cachedUser
    }

    // Se não estiver em cache, busca no banco
    const user = await prisma.user.findUnique({
        where: {
            token,
        },
    })

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid or expired token',
        })
    }

    const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
    }

    // Salva em cache (TTL de 1 hora)
    cacheManager.set(`user:${token}`, userData, 3600)

    return userData
})
