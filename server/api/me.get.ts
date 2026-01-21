import { cacheManager } from '../utils/cache'

export default defineEventHandler((event) => {
    // Tenta obter do cache primeiro usando o token
    const token = getCookie(event, 'auth-token')

    if (token) {
        const cachedUser = cacheManager.get(`user:${token}`)
        if (cachedUser) {
            return cachedUser
        }
    }

    // Fallback para context (se estiver vindo de middleware de autenticação)
    return event.context.user || null
})
