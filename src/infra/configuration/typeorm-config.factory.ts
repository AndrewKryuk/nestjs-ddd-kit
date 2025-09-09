import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfigAbstract } from '../../application/abstract/configuration/typeorm-config.abstract';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { cleanEnv, num, str } from 'envalid';

export const typeormConfigFactory: () => TypeormConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    POSTGRES_HOST: str(),
    POSTGRES_PORT: num(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
  });

  return {
    options: {
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: Number(env.POSTGRES_PORT),
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.js'],
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    },
  };
};

export const connectionSource = new DataSource(
  typeormConfigFactory().options as DataSourceOptions,
);
