import { Global, Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import type { CacheOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';
import { cacheProviders } from './cache.providers';
import { cacheConfigFactory } from '../../configuration/cache-config.factory';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: () => {
        const { ttl, redis } = cacheConfigFactory();

        const options: CacheOptions<RedisClientOptions> = {
          ttl,
        };

        if (redis) {
          options.store = redisStore;
          options.url = redis.url;
        }

        return {
          ...options,
        };
      },
    }),
  ],
  providers: [...cacheProviders],
  exports: [...cacheProviders],
})
export class CacheModule {}
