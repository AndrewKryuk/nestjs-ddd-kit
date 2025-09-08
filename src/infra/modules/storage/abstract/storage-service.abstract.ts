import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export abstract class StorageServiceAbstract {
  /**
   * Is used to set request-scoped data
   */
  set: <T>(key: string | symbol, value: T) => void;

  /**
   * Is used to get request-scoped data
   */
  get: <T>(key: string | symbol) => T;

  /**
   * Is used to get request
   */
  getRequest: () => Request;
}
