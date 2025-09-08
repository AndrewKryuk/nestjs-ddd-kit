import * as process from 'process';
import { HttpConfigAbstract } from '../../application/abstract/configuration/http-config.abstract';
import { cleanEnv, num } from 'envalid';

export const httpConfigFactory: () => HttpConfigAbstract = () =>
  cleanEnv(
    {
      port: Number(process.env?.HTTP_PORT || 3000),
    },
    { port: num() },
  );
