import { Provider } from '@nestjs/common';
import { OauthService } from './services/oauth.service';
import { OauthServiceAbstract } from '../../../domain/abstract/services/oauth-service.abstract';

export const oauthProviders: Provider[] = [
  {
    provide: OauthServiceAbstract,
    useClass: OauthService,
  },
];
