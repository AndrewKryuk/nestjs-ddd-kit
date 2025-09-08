import { Injectable } from '@nestjs/common';
import { IOauthUser } from '../../interfaces/oauth/oauth-user.interface';

@Injectable()
export abstract class StorageServiceAbstract {
  /**
   * Is used to set request-scoped data
   */
  abstract set<T>(key: string | symbol, value: T): void;

  /**
   * Is used to get request-scoped data
   */
  abstract get<T>(key: string | symbol): T;

  /**
   * Is used to get request
   */
  abstract getRequest(): Record<string, any> & { user?: IOauthUser };
}
