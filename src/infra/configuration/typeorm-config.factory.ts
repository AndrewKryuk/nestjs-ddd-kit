import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfigAbstract } from '../../application/abstract/configuration/typeorm-config.abstract';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeormConfigFactory: () => TypeormConfigAbstract = () => ({
  options: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    namingStrategy: new SnakeNamingStrategy(),
  },
});

export const connectionSource = new DataSource(
  typeormConfigFactory().options as DataSourceOptions,
);
