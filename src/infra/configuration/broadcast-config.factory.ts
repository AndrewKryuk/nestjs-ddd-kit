import * as process from 'process';
import { BroadcastConfigAbstract } from '../../domain/abstract/configuration/broadcast-config.abstract';

const { BROADCAST_KAFKA_TOPIC } = process.env;

export const broadcastConfigFactory: () => BroadcastConfigAbstract = () => ({
  kafkaTopic: BROADCAST_KAFKA_TOPIC || 'events.models.state',
});
