export type TMessageData<T> =
  | {
      key?: string;
      value: T;
    }
  | Record<string, any>;
