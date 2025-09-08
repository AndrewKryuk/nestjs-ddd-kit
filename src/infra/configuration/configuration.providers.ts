import { Provider } from '@nestjs/common';
import { CacheConfigAbstract } from '../../domain/abstract/configuration/cache-config.abstract';
import { GrpcConfigAbstract } from '../../domain/abstract/configuration/grpc-config.abstract';
import { HttpConfigAbstract } from '../../domain/abstract/configuration/http-config.abstract';
import { KafkaConfigAbstract } from '../../domain/abstract/configuration/kafka-config.abstract';
import { OauthConfigAbstract } from '../../domain/abstract/configuration/oauth-config.abstract';
import { TypeormConfigAbstract } from '../../domain/abstract/configuration/typeorm-config.abstract';
import { BroadcastConfigAbstract } from '../../domain/abstract/configuration/broadcast-config.abstract';
import { MongooseConfigAbstract } from '../../domain/abstract/configuration/mongoose-config.abstract';
import { SqsConsumerConfigAbstract } from '../../domain/abstract/configuration/sqs-consumer-config.abstract';
import { S3ConfigAbstract } from '../../domain/abstract/configuration/s3-config.abstract';
import { ClickhouseConfigAbstract } from '../../domain/abstract/configuration/clickhouse-config.abstract';
import { cacheConfigFactory } from './cache-config.factory';
import { grpcConfigFactory } from './grpc-config.factory';
import { httpConfigFactory } from './http-config.factory';
import { kafkaConfigFactory } from './kafka-config.factory';
import { oauthConfigFactory } from './oauth-config.factory';
import { typeormConfigFactory } from './typeorm-config.factory';
import { broadcastConfigFactory } from './broadcast-config.factory';
import { mongooseConfigFactory } from './mongoose-config.factory';
import { sqsConsumerConfigFactory } from './sqs-consumer-config.factory';
import { s3ConfigFactory } from './s3-config.factory';
import { clickhouseConfigFactory } from './clickhouse-config.factory';

export const cacheConfigProvider: Provider = {
  provide: CacheConfigAbstract,
  useFactory: cacheConfigFactory,
};

export const grpcConfigProvider: Provider = {
  provide: GrpcConfigAbstract,
  useFactory: grpcConfigFactory,
};

export const httpConfigProvider: Provider = {
  provide: HttpConfigAbstract,
  useFactory: httpConfigFactory,
};

export const kafkaConfigProvider: Provider = {
  provide: KafkaConfigAbstract,
  useFactory: kafkaConfigFactory,
};

export const oauthConfigProvider: Provider = {
  provide: OauthConfigAbstract,
  useFactory: oauthConfigFactory,
};

export const typeormConfigProvider: Provider = {
  provide: TypeormConfigAbstract,
  useFactory: typeormConfigFactory,
};

export const broadcastConfigProvider: Provider = {
  provide: BroadcastConfigAbstract,
  useFactory: broadcastConfigFactory,
};

export const mongooseConfigProvider: Provider = {
  provide: MongooseConfigAbstract,
  useFactory: mongooseConfigFactory,
};

export const sqsConsumerConfigProvider: Provider = {
  provide: SqsConsumerConfigAbstract,
  useFactory: sqsConsumerConfigFactory,
};

export const s3ConfigProvider: Provider = {
  provide: S3ConfigAbstract,
  useFactory: s3ConfigFactory,
};

export const clickhouseConfigProvider: Provider = {
  provide: ClickhouseConfigAbstract,
  useFactory: clickhouseConfigFactory,
};

export const configurationProviders: Provider[] = [
  cacheConfigProvider,
  grpcConfigProvider,
  httpConfigProvider,
  kafkaConfigProvider,
  oauthConfigProvider,
  typeormConfigProvider,
  broadcastConfigProvider,
  mongooseConfigProvider,
  sqsConsumerConfigProvider,
];
