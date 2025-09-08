import { Provider } from '@nestjs/common';
import { StorageServiceAbstract } from './abstract/storage-service.abstract';
import { StorageService } from './services/storage.service';

export const storageProviders: Provider[] = [
  {
    provide: StorageServiceAbstract,
    useClass: StorageService,
  },
];
