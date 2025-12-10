<template>
    <div>
        <NuxtLayout>
            <UApp>
                <NuxtPage />
            </UApp>
        </NuxtLayout>
    </div>
</template>

<script setup>
import { useUser } from '~/composables/useUser'
import { useCookie } from '#app'

const { user, setUser } = useUser()
const authToken = useCookie('auth-token')

const logout = () => {
    authToken.value = null
    setUser(null)
}

// Fetch user on initial load
const { data } = await useFetch('/api/me', {
    headers: {
        cookie: `auth-token=${authToken.value}`,
    },
})

if (data.value) {
    setUser(data.value)
}
</script>
