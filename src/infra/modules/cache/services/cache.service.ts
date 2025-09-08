import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { cacheConfigFactory } from '../../../configuration/cache-config.factory';
import { CacheServiceAbstract } from '../../../../domain/abstract/services/cache-service.abstract';

@Injectable()
export class CacheService implements CacheServiceAbstract {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  set<T>(
    key: number | string,
    value: T,
    ttl: number = cacheConfigFactory().ttl,
  ): Promise<void> {
    return this.cacheManager.set(String(key), value, ttl);
  }

  get<T>(key: number | string): Promise<T | undefined> {
    return this.cacheManager.get(String(key));
  }

  del(key: number | string): Promise<void> {
    return this.cacheManager.del(String(key));
  }

  reset(): Promise<void> {
    return this.cacheManager.reset();
  }
}
