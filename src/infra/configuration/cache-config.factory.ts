import * as process from 'process';
import { CacheConfigAbstract } from '../../application/abstract/configuration/cache-config.abstract';
import { cleanEnv, num } from 'envalid';
import { objectValidator } from './validators/object.validator';

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
      redis: objectValidator<{ url: string }>({ default: undefined }),
    },
  );
