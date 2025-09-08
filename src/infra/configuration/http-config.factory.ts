import * as process from 'process';
import { HttpConfigAbstract } from '../../application/abstract/configuration/http-config.abstract';

export const httpConfigFactory: () => HttpConfigAbstract = () => ({
  port: Number(process.env?.HTTP_PORT || 3000),
});
