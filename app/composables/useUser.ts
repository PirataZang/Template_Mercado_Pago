export const useUser = () => {
    const user = useState('user', () => null)

    const fetchUser = async () => {
        // Se já tem usuário em cache local, não faz requisição
        if (user.value) {
            return user.value
        }

        // Busca do cache do servidor via GET /api/me
        const { data } = await useFetch('/api/me', {
            method: 'GET',
        })

        if (data.value) {
            user.value = data.value
        }

        return data.value
    }

    const clearUser = () => {
        user.value = null
    }

    return {
        user,
        fetchUser,
        clearUser,
    }
}
