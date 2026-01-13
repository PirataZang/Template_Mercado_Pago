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
import { useCookie } from '#app'

const authToken = useCookie('auth-token')

const logout = () => {
    authToken.value = null
}
</script>
