import { prisma } from '~/lib/prisma'

const publicApiRoutes = ['/api/login', '/api/register', '/api/mercadopago/webhook']

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

    // Executa o middleware apenas para rotas de API
    if (!url.pathname.startsWith('/api/')) {
        return
    }

    if (publicApiRoutes.some((route) => url.pathname.startsWith(route))) {
        return
    }

    const token = getCookie(event, 'auth-token')

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Não Autorizado',
            message: 'É necessário estar logado para acessar essa página.',
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            token,
        },
    })

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid authentication token',
        })
    }

    event.context.user = user
})
