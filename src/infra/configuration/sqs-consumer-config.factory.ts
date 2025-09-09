import { SqsConsumerConfigAbstract } from '../../application/abstract/configuration/sqs-consumer-config.abstract';
import { SQSClient } from '@aws-sdk/client-sqs';
import { cleanEnv, num, str } from 'envalid';

export const sqsConsumerConfigFactory: () => SqsConsumerConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    SQS_QUEUE_NAME: str(),
    SQS_QUEUE_URL: str(),
    SQS_BATCH_SIZE: num({ default: 10 }),
    AWS_REGION: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
  });

  return {
    options: {
      name: env.SQS_QUEUE_NAME,
      queueUrl: env.SQS_QUEUE_URL,
      region: env.AWS_REGION,
      batchSize: env.SQS_BATCH_SIZE,
      sqs: new SQSClient({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      }),
    },
  };
};
