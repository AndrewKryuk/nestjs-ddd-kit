import { HttpConfigAbstract } from '../../application/abstract/configuration/http-config.abstract';
import { cleanEnv, num } from 'envalid';

export const httpConfigFactory: () => HttpConfigAbstract = () => {
  const env = cleanEnv(
    process.env,
    { HTTP_PORT: num({default: 3000}) },
  );

  return {
    port: env.HTTP_PORT
  }
}

