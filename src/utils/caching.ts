import { createCache, memoryStore } from 'cache-manager';

export const memoryCache = createCache(memoryStore({
  max: 100,
  ttl: 10 * 1000 /*milliseconds*/,
}));