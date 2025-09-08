import { IOauthUser } from '../../interfaces/oauth/oauth-user.interface';

export abstract class OauthServiceAbstract {
  /**
   * Is used to get user info from identity provider
   */
  abstract getUserInfo(accessToken: string): Promise<IOauthUser>;
}
