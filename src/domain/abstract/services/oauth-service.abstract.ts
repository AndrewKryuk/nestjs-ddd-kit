import { Injectable } from '@nestjs/common';
import { IOauthUser } from '../../../infra/modules/oauth/interfaces/oauth-user.interface';

@Injectable()
export class OauthServiceAbstract {
  /**
   * Is used to get user info from identity provider
   */
  getUserInfo: (accessToken: string) => Promise<IOauthUser>;
}
