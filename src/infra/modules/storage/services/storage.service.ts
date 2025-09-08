import { Injectable } from '@nestjs/common';
import { CLS_REQ, ClsService } from 'nestjs-cls';
import { StorageServiceAbstract } from '../abstract/storage-service.abstract';
import { Request } from 'express';

@Injectable()
export class StorageService implements StorageServiceAbstract {
  constructor(private readonly cls: ClsService) {}

  set<T>(key: string | symbol, value: T): void {
    this.cls.set(key, value);
  }

  get<T>(key: string | symbol): T {
    return this.cls.get(key);
  }

  getRequest(): Request {
    return this.cls.get(CLS_REQ);
  }
}
