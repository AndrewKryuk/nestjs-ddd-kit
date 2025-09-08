import { Provider } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { CacheServiceAbstract } from '../../../domain/abstract/services/cache-service.abstract';

export const cacheProviders: Provider[] = [
  {
    provide: CacheServiceAbstract,
    useClass: CacheService,
  },
];
