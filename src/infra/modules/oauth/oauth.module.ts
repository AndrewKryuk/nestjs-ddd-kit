import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwksClient } from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { oauthProviders } from './oauth.providers';
import { oauthConfigFactory } from '../../configuration/oauth-config.factory';

@Module({
  imports: [
    JwtModule.registerAsync({
      async useFactory() {
        const { audience, issuer, jwksUri } = oauthConfigFactory();

        const client = new JwksClient({
          jwksUri: jwksUri ?? '',
        });

        const keys = await client.getSigningKeys();

        return {
          secretOrKeyProvider(requestType, token) {
            const decoded = jwt.decode(String(token), { complete: true });
            const found = keys.find((key) => key.kid === decoded?.header.kid);

            return found?.getPublicKey() ?? '';
          },
          verifyOptions: {
            audience,
            issuer,
            algorithms: ['RS256'],
          },
        };
      },
    }),
  ],
  providers: [...oauthProviders],
  exports: [JwtModule, ...oauthProviders],
})
export class OauthModule {}
