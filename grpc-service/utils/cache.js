const NodeCache = require('node-cache');

class CacheService {
    constructor() {
        if (!CacheService.instance) {
            this.cache = new NodeCache({ stdTTL: 60 }); // 60 segundos por defecto
            CacheService.instance = this;
        }
        return CacheService.instance;
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value, ttl = 60) {
        this.cache.set(key, value, ttl);
    }
}

module.exports = new CacheService();