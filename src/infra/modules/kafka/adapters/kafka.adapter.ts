import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ProducerAdapterAbstract } from '../../../../domain/abstract/adapters/producer-adapter.abstract';
import { TMessageData } from '../../../../domain/types/message-data.type';
import { Log } from '../../../../application/decorators/log.decorator';
import { camelToSnake } from '../../../../application/utils/camel-to-snake';
import { KafkaException } from '../../../../application/exceptions/transport/kafka-exception';
import { ERROR_CODES } from '../../../../domain/constants/error-codes';

@Injectable()
export class KafkaAdapter implements ProducerAdapterAbstract {
  constructor(@Inject('KAFKA_CLIENT') private readonly client: ClientKafka) {}

  @Log()
  async produce(
    data: TMessageData<Record<string, any>>,
    topic: string,
  ): Promise<void> {
    try {
      return await lastValueFrom(this.client.emit(topic, camelToSnake(data)));
    } catch (error: any) {
      throw new KafkaException([
        {
          message: error?.message || error?.details || 'Kafka error',
          code: ERROR_CODES.KAFKA_ERROR,
        },
      ]);
    }
  }
}
