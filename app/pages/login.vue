<template>
    <div class="flex items-center justify-center h-screen">
        <UCard class="w-96">
            <template #header>
                <h1 class="text-2xl text-white font-bold text-center">Login</h1>
            </template>

            <UForm :state="state" @submit="login" class="flex flex-col gap-4">
                <UFormField label="Email" name="email">
                    <UInput class="w-full" variant="soft" v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
                </UFormField>

                <UFormField label="Password" name="password">
                    <UInput v-model="state.password" variant="soft" placeholder="Password" :type="show ? 'text' : 'password'" class="w-full">
                        <template #trailing>
                            <UButton color="neutral" variant="link" size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'" :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password" @click="show = !show" />
                        </template>
                    </UInput>
                </UFormField>

                <UButton type="submit" :loading="loading" class="mt-6 w-full" block> Login </UButton>
            </UForm>
        </UCard>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const show = ref(false)
const state = reactive({
    email: '',
    password: '',
})

const loading = ref(false)

const login = async () => {
    loading.value = true
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        })

        if (response.ok) {
            toast.add({ title: 'Success', description: 'Logged in successfully!' })
            router.push('/')
        } else {
            toast.add({ title: 'Error', description: 'Não foi encontrado usuário com essas credenciais', color: 'error' })
        }
    } catch (error) {
        toast.add({ title: 'Error', description: 'An error occurred', color: 'red' })
    } finally {
        loading.value = false
    }
}
</script>
