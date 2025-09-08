export interface IBroadcastProps {
  /**
   * Entity type
   */
  model: string;
  /**
   * Service name
   */
  service: string;
  /**
   * Entity id
   */
  entityId: string;
  /**
   * Request id (trace id)
   */
  requestId: string;
  /**
   * Authorized user id
   */
  userId?: string;
  /**
   * Kafka message key
   */
  key: string;
}
