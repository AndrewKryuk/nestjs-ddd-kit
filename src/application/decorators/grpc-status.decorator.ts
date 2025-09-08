import { grpcStatusMetadataKey } from '../../domain/tokens/status.tokens';

export const grpcStatus = (status: number) => (constructor: Function) => {
  Reflect.defineMetadata(grpcStatusMetadataKey, status, constructor.prototype);
};
