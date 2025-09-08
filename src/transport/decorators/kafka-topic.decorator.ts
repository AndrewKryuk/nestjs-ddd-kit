import { KAFKA_TOPIC_METADATA } from '../../domain/tokens/kafka.tokens';

export const KafkaTopic = <T>(topic: keyof T) => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(KAFKA_TOPIC_METADATA, topic, descriptor.value);
    return descriptor;
  };
};
