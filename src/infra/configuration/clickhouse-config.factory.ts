import { ClickhouseConfigAbstract } from '../../domain/abstract/configuration/clickhouse-config.abstract';

export const clickhouseConfigFactory: () => ClickhouseConfigAbstract = () => ({
  url: process.env.CLICKHOUSE_URL!,
  username: process.env.CLICKHOUSE_USERNAME!,
  password: process.env.CLICKHOUSE_PASSWORD!,
  database: process.env.CLICKHOUSE_DATABASE!,
});
