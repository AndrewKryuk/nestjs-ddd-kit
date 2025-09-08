import * as process from 'process';
import { KafkaConfigAbstract } from '../../application/abstract/configuration/kafka-config.abstract';
import { cleanEnv, json } from 'envalid';

const {
  KAFKA_URL,
  KAFKA_USERNAME,
  KAFKA_PASSWORD,
  KAFKA_SSL,
  KAFKA_GROUP_ID,
} = process.env;

export const kafkaConfigFactory: () => KafkaConfigAbstract = () => cleanEnv({
  options: {
    client: {
      brokers: [KAFKA_URL ?? ''],
      ssl: String(KAFKA_SSL).toLowerCase() === 'true',
      sasl:
        KAFKA_USERNAME && KAFKA_PASSWORD
          ? {
              mechanism: 'scram-sha-512',
              username: KAFKA_USERNAME,
              password: KAFKA_PASSWORD,
            }
          : undefined,
    },
    consumer: {
      groupId: KAFKA_GROUP_ID ?? '',
      allowAutoTopicCreation: true,
    },
  },
}, {
  options: json()
});
