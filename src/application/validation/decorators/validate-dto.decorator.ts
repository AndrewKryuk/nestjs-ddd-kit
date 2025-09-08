import { dtoMetadataKey } from '../tokens';
import { validateSync } from 'class-validator';
import { inputValidationFactory } from '../factories/input-validation.factory';
import { plainToInstance } from 'class-transformer';

export const validateDTO =
  (options?: { async?: boolean }) =>
  (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) => {
    let originalMethod = descriptor.value!;

    const paramTypes = Reflect.getMetadata(
      'design:paramtypes',
      target,
      propertyName,
    );

    const isAsync =
      options?.async ?? originalMethod.constructor.name === 'AsyncFunction';

    descriptor.value = function (...args: any[]) {
      const dtoParameters: number[] = Reflect.getOwnMetadata(
        dtoMetadataKey,
        target,
        propertyName,
      );

      if (dtoParameters) {
        for (const dtoParameter of dtoParameters) {
          const dto = plainToInstance(
            paramTypes[dtoParameter],
            arguments[dtoParameter] || {},
          );

          const errors = validateSync(dto);

          if (errors?.length) {
            if (isAsync) {
              return Promise.reject(inputValidationFactory(errors));
            } else {
              throw inputValidationFactory(errors);
            }
          }
        }
      }

      return originalMethod.apply(this, args);
    };
  };
