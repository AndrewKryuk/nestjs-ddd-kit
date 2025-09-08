import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaDecoratorService } from '../../infra/modules/kafka/services/kafka-decorator.service';
import { kafkaConfigFactory } from '../../infra/configuration/kafka-config.factory';

export const setupKafkaConsumer = (
  app: INestApplication,
  options: {
    /**
     * Kafka topics token
     * @example KafkaTopicsAbstract
     */
    topicsToken: Function;
  },
) => {
  const { topicsToken } = options;

  app
    .get(KafkaDecoratorService)
    .processKafkaDecorators<typeof topicsToken>(app.get(topicsToken));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: kafkaConfigFactory().options,
  });
};
