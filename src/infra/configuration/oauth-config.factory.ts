import * as process from 'process';
import { OauthConfigAbstract } from '../../domain/abstract/configuration/oauth-config.abstract';

const {
  OAUTH_CLIENT_ID: audience,
  OAUTH_ISSUER,
  OAUTH_SECRET: secret,
} = process.env;

const issuer = (OAUTH_ISSUER || '').replace(/\/?$/, '/');

export const oauthConfigFactory: () => OauthConfigAbstract = () => ({
  audience,
  issuer,
  secret,
  jwksUri: issuer + 'jwks/',
});
