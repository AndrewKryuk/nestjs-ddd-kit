import { CacheConfigAbstract } from '../../application/abstract/configuration/cache-config.abstract';
import { cleanEnv, num, str } from 'envalid';

export const cacheConfigFactory: () => CacheConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    CACHE_TTL: num({ default: 60 * 10 }),
    REDIS_URL: str({ default: undefined }),
  });

  return {
    ttl: env.CACHE_TTL,
    redis: env.REDIS_URL
      ? {
          url: env.REDIS_URL,
        }
      : undefined,
  };
};
