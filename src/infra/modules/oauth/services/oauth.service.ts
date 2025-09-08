import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseClient, Issuer } from 'openid-client';
import { OauthServiceAbstract } from '../../../../domain/abstract/services/oauth-service.abstract';
import { oauthConfigFactory } from '../../../configuration/oauth-config.factory';
import { IOauthUser } from '../../../../domain/interfaces/oauth/oauth-user.interface';

@Injectable()
export class OauthService implements OnModuleInit, OauthServiceAbstract {
  private client: BaseClient;

  async onModuleInit(): Promise<void> {
    const {
      issuer,
      audience: client_id,
      secret: client_secret,
    } = oauthConfigFactory();

    const oauthIssuer = await Issuer.discover(issuer ?? '');

    this.client = new oauthIssuer.Client({
      client_id: client_id ?? '',
      client_secret,
    });
  }

  getUserInfo(accessToken: string): Promise<IOauthUser> {
    return this.client.userinfo<IOauthUser>(accessToken);
  }
}
