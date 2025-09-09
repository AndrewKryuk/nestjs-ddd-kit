import { ClickhouseConfigAbstract } from '../../application/abstract/configuration/clickhouse-config.abstract';
import { cleanEnv, str } from 'envalid';

export const clickhouseConfigFactory: () => ClickhouseConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    CLICKHOUSE_URL: str(),
    CLICKHOUSE_USERNAME: str(),
    CLICKHOUSE_PASSWORD: str(),
    CLICKHOUSE_DATABASE: str(),
  });

  return {
    url: env.CLICKHOUSE_URL,
    username: env.CLICKHOUSE_USERNAME,
    password: env.CLICKHOUSE_PASSWORD,
    database: env.CLICKHOUSE_DATABASE,
  };
};
