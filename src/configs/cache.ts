export const cacheConfig = {
    ttl: 86400,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

export default cacheConfig;