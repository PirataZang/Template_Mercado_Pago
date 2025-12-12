<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
        <UCard class="w-96 p-6 shadow-2xl bg-gray-800 border-gray-700 transform hover:scale-[1.01] transition duration-300">
            <template #header>
                <div class="flex flex-col items-center">
                    <UIcon name="i-heroicons-user-circle" class="text-info-400 text-5xl mb-2" />
                    <h1 class="text-3xl text-white font-extrabold tracking-tight">Acesso Restrito</h1>
                    <p class="text-sm text-gray-400 mt-1">Entre com suas credenciais para continuar.</p>
                </div>
            </template>

            <UForm :state="state" :schema="schema" @submit="login" class="flex flex-col gap-4">
                <UFormField label="Email" name="email">
                    <UInput class="w-full" variant="soft" v-model="state.email" placeholder="seu.email@exemplo.com" icon="i-heroicons-envelope" size="lg" color="info" />
                </UFormField>

                <UFormField label="Senha" required name="password">
                    <UInput v-model="state.password" variant="soft" placeholder="Sua senha secreta" :type="show ? 'text' : 'password'" class="w-full" size="lg" color="info" icon="i-heroicons-lock-closed">
                        <template #trailing>
                            <UButton color="neutral" variant="link" size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'" :aria-label="show ? 'Ocultar senha' : 'Mostrar senha'" :aria-pressed="show" @click="show = !show" />
                        </template>
                    </UInput>
                </UFormField>

                <UButton type="submit" :loading="loading" color="info" class="mt-6 w-full justify-center py-2.5 font-semibold text-lg hover:bg-info-500 transition duration-200"> Acessar Conta </UButton>
            </UForm>

            <template #footer>
                <div class="text-center text-sm text-gray-500">
                    Esqueceu a senha?
                    <ULink to="#" class="text-info-400 hover:text-info-300 font-medium"> Recuperar </ULink>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// Importa o yup para a definição do schema de validação
import * as yup from 'yup'

// Hooks e Funções Auxiliares
const toast = useToast()
const router = useRouter()

// Estado Local
const show = ref(false)
const state = reactive({
    email: '',
    password: '',
})
const loading = ref(false)

// --- Validação (O que você pediu!) ---
// Define o schema de validação usando yup
const schema = yup.object().shape({
    email: yup.string().email('E-mail inválido. Ex: nome@dominio.com').required('O campo E-mail é obrigatório.'),
    password: yup.string().required('O campo Senha é obrigatório.'),
})

// Função de Login
const login = async () => {
    // Se a validação do UForm for bem-sucedida, esta função é chamada
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
            toast.add({ title: 'Sucesso', description: 'Logado com sucesso!', color: 'green' })
            router.push('/')
        } else {
            // Se a API retornar um erro (ex: 401 Unauthorized)
            toast.add({ title: 'Erro', description: 'Credenciais inválidas. Verifique seu e-mail e senha.', color: 'red' })
        }
    } catch (error) {
        // Erro de rede ou outro erro
        toast.add({ title: 'Erro', description: 'Ocorreu um erro ao tentar conectar ao servidor.', color: 'red' })
    } finally {
        loading.value = false
    }
}
</script>
