export default defineNuxtRouteMiddleware(async (to) => {
    const publicRoutes = ['/login', '/register']

    if (publicRoutes.includes(to.path)) {
        return
    }
    const { error } = await useFetch('/api/me')

    if (error.value) {
        return navigateTo('/login')
    }
})
