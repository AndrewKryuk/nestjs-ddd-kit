import { ClickhouseConfigAbstract } from '../../application/abstract/configuration/clickhouse-config.abstract';
import { cleanEnv, str } from 'envalid';

export const clickhouseConfigFactory: () => ClickhouseConfigAbstract = () =>
  cleanEnv(
    {
      url: process.env.CLICKHOUSE_URL,
      username: process.env.CLICKHOUSE_USERNAME,
      password: process.env.CLICKHOUSE_PASSWORD,
      database: process.env.CLICKHOUSE_DATABASE,
    },
    {
      url: str(),
      username: str(),
      password: str(),
      database: str(),
    },
  );
