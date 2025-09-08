export interface IBroadcastMessage {
  id: string;
  service: string;
  requestId: string;
  userId?: string;
  model: string;
  operation: 'create' | 'update' | 'delete';
  prevState: Record<string, any>;
  newState: Record<string, any>;
}
