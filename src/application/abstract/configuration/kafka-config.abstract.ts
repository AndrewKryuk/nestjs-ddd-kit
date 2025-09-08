import { KafkaOptions } from '@nestjs/microservices';

/**
 * Kafka configuration
 */
export abstract class KafkaConfigAbstract {
  options: KafkaOptions['options'];
}
