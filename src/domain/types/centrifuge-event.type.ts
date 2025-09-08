export type TCentrifugeEvent = {
  service: string;
  id: string;
  model: string;
  event: string;
  metadata?: Record<string, any>;
};
