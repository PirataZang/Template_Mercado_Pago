interface CacheEntry<T> {
    value: T
    expiresAt: number
}

class CacheManager {
    private cache = new Map<string, CacheEntry<any>>()
    private cleanupInterval: NodeJS.Timeout | null = null

    constructor(cleanupIntervalMs: number = 60000) {
        // Limpa entradas expiradas a cada minuto
        this.cleanupInterval = setInterval(() => this.cleanup(), cleanupIntervalMs)
    }

    set<T>(key: string, value: T, ttlSeconds: number = 3600): void {
        const expiresAt = Date.now() + ttlSeconds * 1000
        this.cache.set(key, { value, expiresAt })
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Verifica se expirou
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key)
            return null
        }

        return entry.value as T
    }

    remove(key: string): void {
        this.cache.delete(key)
    }

    private cleanup(): void {
        const now = Date.now()
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key)
            }
        }
    }

    clear(): void {
        this.cache.clear()
    }

    destroy(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval)
        }
        this.clear()
    }
}

// Instância global do cache
export const cacheManager = new CacheManager()
