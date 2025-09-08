export type KafkaData<T> =
  | {
      key?: string;
      value: T;
    }
  | Record<string, any>;
