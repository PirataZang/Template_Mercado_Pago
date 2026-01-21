// Representa um item salvo no cache com valor e tempo de expiração
interface CacheEntry<T> {
    value: T // Dado armazenado
    expiresAt: number // Timestamp (em ms) indicando quando expira
}

class CacheManager {
    // Estrutura principal do cache:
    // chave (string) -> { value, expiresAt }
    private cache = new Map<string, CacheEntry<unknown>>()

    // Referência do timer que faz limpeza automática
    private cleanupInterval: NodeJS.Timeout | null = null

    /**
     * Cria o gerenciador de cache
     * @param cleanupIntervalMs Tempo (ms) entre cada limpeza automática dos itens expirados
     *                          Padrão: 60 segundos
     */
    constructor(cleanupIntervalMs: number = 60_000) {
        // Agenda a função cleanup para rodar periodicamente
        this.cleanupInterval = setInterval(() => this.cleanup(), cleanupIntervalMs)
    }

    /**
     * Salva um valor no cache com tempo de vida (TTL)
     * @param key Identificador único do valor
     * @param value Valor a ser armazenado
     * @param ttlSeconds Tempo de vida em segundos (padrão: 1 hora)
     */
    set<T>(key: string, value: T, ttlSeconds: number = 3600): void {
        const expiresAt = Date.now() + ttlSeconds * 1000
        this.cache.set(key, { value, expiresAt })
    }

    /**
     * Recupera um valor do cache
     * @param key Identificador do valor
     * @returns O valor armazenado ou null se não existir ou estiver expirado
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key)

        // Se não existir no cache
        if (!entry) return null

        // Se existir mas já estiver expirado
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key) // remove lixo
            return null
        }

        // Valor válido
        return entry.value as T
    }

    /**
     * Remove manualmente uma chave do cache
     */
    remove(key: string): void {
        this.cache.delete(key)
    }

    /**
     * Remove todos os itens expirados do cache
     * (Chamado automaticamente pelo setInterval)
     */
    private cleanup(): void {
        const now = Date.now()

        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key)
            }
        }
    }

    /**
     * Limpa completamente o cache
     */
    clear(): void {
        this.cache.clear()
    }

    /**
     * Encerra o cache:
     * - Para o timer de limpeza
     * - Limpa todos os dados
     * Usar no shutdown da aplicação
     */
    destroy(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval)
            this.cleanupInterval = null
        }

        this.clear()
    }
}

// Instância única global do cache (Singleton simples)
export const cacheManager = new CacheManager()
