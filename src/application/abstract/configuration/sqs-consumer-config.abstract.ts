import { SqsConsumerOptions } from '@ssut/nestjs-sqs/dist/sqs.types';

/**
 * AWS SQS Consumer configuration
 */
export abstract class SqsConsumerConfigAbstract {
  options?: SqsConsumerOptions;
}
