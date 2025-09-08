import * as process from 'process';
import { HttpConfigAbstract } from '../../domain/abstract/configuration/http-config.abstract';

export const httpConfigFactory: () => HttpConfigAbstract = () => ({
  port: Number(process.env?.HTTP_PORT || 3000),
});
