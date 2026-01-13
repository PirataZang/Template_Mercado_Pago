import type { User } from '~~/prisma/generated/client'

export const useUser = () => {
    const user = useState<User | null>('user', () => null)
    const pending = useState<boolean>('user_pending', () => false)

    const clearUser = () => {
        user.value = null
    }

    return {
        user,
        pending,
        clearUser,
    }
}
