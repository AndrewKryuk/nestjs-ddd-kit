/**
 * Oauth configuration
 */
export abstract class OauthConfigAbstract {
  audience?: string;
  issuer?: string;
  secret?: string;
  jwksUri?: string;
}
