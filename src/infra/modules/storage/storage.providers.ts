import { Provider } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { StorageServiceAbstract } from '../../../domain/abstract/services/storage-service.abstract';

export const storageProviders: Provider[] = [
  {
    provide: StorageServiceAbstract,
    useClass: StorageService,
  },
];
