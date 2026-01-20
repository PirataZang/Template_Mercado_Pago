export const useUser = () => {
    const token = useCookie('auth-token')
    const user = useState('user', () => null)

    const fetchUser = async () => {
        // Se já tem usuário em cache, não faz requisição
        if (user.value) {
            return user.value
        }

        const { data } = await useFetch('/api/user', {
            method: 'POST',
            body: { token: token.value },
        })
        return data.value
    }

    const clearUser = () => {
        user.value = null
        const userCookie = useCookie('user-session')
        userCookie.value = null
    }

    return {
        user,
        fetchUser,
        clearUser,
    }
}
