import { OauthConfigAbstract } from '../../application/abstract/configuration/oauth-config.abstract';
import { cleanEnv, str } from 'envalid';

export const oauthConfigFactory: () => OauthConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    OAUTH_CLIENT_ID: str(),
    OAUTH_ISSUER: str(),
    OAUTH_SECRET: str({ default: undefined }),
  });
  const issuer = env.OAUTH_ISSUER.replace(/\/?$/, '/');

  return {
    audience: env.OAUTH_CLIENT_ID,
    issuer,
    secret: env.OAUTH_SECRET,
    jwksUri: issuer + 'jwks/',
  };
};
