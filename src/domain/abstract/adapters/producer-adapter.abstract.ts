import { TMessageData } from '../../types/message-data.type';

export abstract class ProducerAdapterAbstract {
  /**
   * Is used to produce message to message broker
   */
  produce: (
    data: TMessageData<Record<string, any>>,
    topic: string,
  ) => Promise<void>;
}
