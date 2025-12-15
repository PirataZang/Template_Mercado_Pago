import { ref } from 'vue'
import type { User } from '~~/prisma/generated/client'

export const useUser = () => {
    const user = ref<User | null>(null)

    const setUser = (newUser: User | null) => {
        user.value = newUser
    }

    return {
        user,
        setUser,
    }
}
