import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaProviders } from './kafka.providers';
import { KafkaDecoratorService } from './services/kafka-decorator.service';
import { DiscoveryModule } from '@nestjs/core';
import { kafkaConfigFactory } from '../../configuration/kafka-config.factory';

@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          ...kafkaConfigFactory().options,
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [...kafkaProviders, KafkaDecoratorService],
  exports: [...kafkaProviders],
})
export class KafkaModule {}
