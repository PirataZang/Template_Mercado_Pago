<template>
    <div>
        <span>teste</span>
        <NuxtLink to="/payment">Pagamento Teste</NuxtLink>
    </div>

    <UButton @click="login">Logar</UButton>
</template>

<script lang="ts" setup>
import { authClient, signIn } from '~/lib/auth-client'

const login = () => {
    authClient.signIn.social({
        provider: 'google',
    })
}
</script>
