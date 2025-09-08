import { Provider } from '@nestjs/common';
import { KafkaAdapter } from './adapters/kafka.adapter';
import { ProducerAdapterAbstract } from '../../../domain/abstract/adapters/producer-adapter.abstract';

export const kafkaProviders: Provider[] = [
  {
    provide: ProducerAdapterAbstract,
    useClass: KafkaAdapter,
  },
];
