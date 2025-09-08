import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DiscoveryService } from '@nestjs/core';
import { KAFKA_TOPIC_METADATA } from '../../../../domain/tokens/kafka.tokens';

@Injectable()
export class KafkaDecoratorService {
  constructor(private readonly discoveryService: DiscoveryService) {}

  processKafkaDecorators<T>(kafkaTopics: T) {
    const controllers = this.discoveryService.getControllers();

    for (const { metatype: type } of controllers) {
      const propNames = Object.getOwnPropertyNames(type.prototype);
      for (const prop of propNames) {
        const propValue = Reflect.getMetadata(
          KAFKA_TOPIC_METADATA,
          Reflect.get(type.prototype, prop),
        );

        if (propValue) {
          const topic = kafkaTopics[propValue];
          Reflect.decorate(
            [MessagePattern(topic)],
            type.prototype,
            prop,
            Reflect.getOwnPropertyDescriptor(type.prototype, prop),
          );
        }
      }
    }
  }
}
