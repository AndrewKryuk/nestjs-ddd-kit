import { KafkaConfigAbstract } from '../../application/abstract/configuration/kafka-config.abstract';
import { cleanEnv, str } from 'envalid';

export const kafkaConfigFactory: () => KafkaConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    KAFKA_URL: str(),
    KAFKA_SSL: str({ default: undefined }),
    KAFKA_USERNAME: str({ default: undefined }),
    KAFKA_PASSWORD: str({ default: undefined }),
    KAFKA_GROUP_ID: str(),
  });

  return {
    options: {
      client: {
        brokers: [env.KAFKA_URL],
        ssl: String(env.KAFKA_SSL).toLowerCase() === 'true',
        sasl:
          env.KAFKA_USERNAME && env.KAFKA_PASSWORD
            ? {
                mechanism: 'scram-sha-512',
                username: env.KAFKA_USERNAME,
                password: env.KAFKA_PASSWORD,
              }
            : undefined,
      },
      consumer: {
        groupId: env.KAFKA_GROUP_ID,
        allowAutoTopicCreation: true,
      },
    },
  };
};
