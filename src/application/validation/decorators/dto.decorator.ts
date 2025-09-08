import { dtoMetadataKey } from '../tokens';

export const DTO =
  () =>
  (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    const existingDTOParameters: number[] =
      Reflect.getOwnMetadata(dtoMetadataKey, target, propertyKey) || [];
    existingDTOParameters.push(parameterIndex);
    Reflect.defineMetadata(
      dtoMetadataKey,
      existingDTOParameters,
      target,
      propertyKey,
    );
  };
