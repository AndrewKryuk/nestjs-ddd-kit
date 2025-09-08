import { httpStatusMetadataKey } from '../../domain/tokens/status.tokens';

export const httpStatus = (status: number) => (constructor: Function) => {
  Reflect.defineMetadata(httpStatusMetadataKey, status, constructor.prototype);
};
