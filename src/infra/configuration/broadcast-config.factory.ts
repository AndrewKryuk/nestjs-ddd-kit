import { BroadcastConfigAbstract } from '../../application/abstract/configuration/broadcast-config.abstract';
import { cleanEnv, str } from 'envalid';

export const broadcastConfigFactory: () => BroadcastConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    BROADCAST_KAFKA_TOPIC: str({ default: 'events.models.state' }),
  });

  return {
    kafkaTopic: env.BROADCAST_KAFKA_TOPIC,
  };
};
