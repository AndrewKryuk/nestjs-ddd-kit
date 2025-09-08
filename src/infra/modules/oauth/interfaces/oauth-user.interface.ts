export interface IOauthUser {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  preferred_username: string;
  nickname: string;
  groups: string[];
}
