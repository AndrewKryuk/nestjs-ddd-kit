import { Injectable } from '@nestjs/common';
import { StorageServiceAbstract } from '../abstract/storage-service.abstract';
import { Request } from 'express';

@Injectable()
export class StorageServiceMock implements StorageServiceAbstract {
  private storage = new Map<string | symbol, any>();

  set<T>(key: string | symbol, value: T): void {
    this.storage.set(key, value);
  }

  get<T>(key: string | symbol): T {
    return this.storage.get(key);
  }

  getRequest(): Request {
    return {} as Request;
  }
}
