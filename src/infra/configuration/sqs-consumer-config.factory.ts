import * as process from 'process';
import { SqsConsumerConfigAbstract } from '../../application/abstract/configuration/sqs-consumer-config.abstract';
import { SQSClient } from '@aws-sdk/client-sqs';

const {
  SQS_QUEUE_NAME,
  SQS_QUEUE_URL,
  SQS_BATCH_SIZE = 10,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

export const sqsConsumerConfigFactory: () => SqsConsumerConfigAbstract =
  () => ({
    options:
      SQS_QUEUE_NAME &&
      SQS_QUEUE_URL &&
      AWS_REGION &&
      AWS_ACCESS_KEY_ID &&
      AWS_SECRET_ACCESS_KEY
        ? {
            name: SQS_QUEUE_NAME,
            queueUrl: SQS_QUEUE_URL,
            region: AWS_REGION,
            batchSize: Number(SQS_BATCH_SIZE),
            sqs: new SQSClient({
              region: AWS_REGION,
              credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
              },
            }),
          }
        : undefined,
  });
