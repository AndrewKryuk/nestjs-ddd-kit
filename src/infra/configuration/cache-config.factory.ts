import * as process from 'process';
import { CacheConfigAbstract } from '../../application/abstract/configuration/cache-config.abstract';

const { CACHE_TTL, REDIS_URL } = process.env;

export const cacheConfigFactory: () => CacheConfigAbstract = () => ({
  ttl: Number(CACHE_TTL || 60 * 10),
  redis: REDIS_URL
    ? {
        url: REDIS_URL,
      }
    : undefined,
});
