import * as process from 'process';
import { CacheConfigAbstract } from '../../application/abstract/configuration/cache-config.abstract';
import { cleanEnv, json, num } from 'envalid';

const { CACHE_TTL, REDIS_URL } = process.env;

export const cacheConfigFactory: () => CacheConfigAbstract = () =>
  cleanEnv(
    {
      ttl: Number(CACHE_TTL || 60 * 10),
      redis: REDIS_URL
        ? {
            url: REDIS_URL,
          }
        : undefined,
    },
    {
      ttl: num(),
      redis: json<{ url: string }>({ default: undefined }),
    },
  );
