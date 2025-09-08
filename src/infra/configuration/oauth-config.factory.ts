import * as process from 'process';
import { OauthConfigAbstract } from '../../application/abstract/configuration/oauth-config.abstract';
import { cleanEnv, str } from 'envalid';

const {
  OAUTH_CLIENT_ID: audience,
  OAUTH_ISSUER,
  OAUTH_SECRET: secret,
} = process.env;

const issuer = (OAUTH_ISSUER || '').replace(/\/?$/, '/');

export const oauthConfigFactory: () => OauthConfigAbstract = () =>
  cleanEnv(
    {
      audience,
      issuer,
      secret,
      jwksUri: issuer + 'jwks/',
    },
    {
      audience: str(),
      issuer: str(),
      secret: str({ default: undefined }),
      jwksUri: str(),
    },
  );
