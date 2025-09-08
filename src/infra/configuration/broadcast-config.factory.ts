import * as process from 'process';
import { BroadcastConfigAbstract } from '../../application/abstract/configuration/broadcast-config.abstract';
import { cleanEnv, str } from 'envalid';

const { BROADCAST_KAFKA_TOPIC } = process.env;

export const broadcastConfigFactory: () => BroadcastConfigAbstract = () =>
  cleanEnv(
    {
      kafkaTopic: BROADCAST_KAFKA_TOPIC || 'events.models.state',
    },
    {
      kafkaTopic: str(),
    },
  );
