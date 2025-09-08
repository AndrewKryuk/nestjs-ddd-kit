import { dtoMetadataKey } from '../tokens';
import { getMetadataStorage } from 'class-validator';

/**
 * Is used to set null values for empty dto properties
 */
export const setNullForEmptyProps =
  () =>
  (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) => {
    let method = descriptor.value!;

    const paramTypes = Reflect.getMetadata(
      'design:paramtypes',
      target,
      propertyName,
    );

    descriptor.value = function (...args: any[]) {
      const dtoParameters: number[] = Reflect.getOwnMetadata(
        dtoMetadataKey,
        target,
        propertyName,
      );

      if (dtoParameters) {
        for (const dtoParameter of dtoParameters) {
          const dtoClassType = paramTypes[dtoParameter];

          if (!arguments[dtoParameter]) {
            continue;
          }

          const dtoObject = arguments[dtoParameter];

          const allProps: Set<string> = getMetadataStorage()
            .getTargetValidationMetadatas(
              dtoClassType,
              '',
              false,
              false,
              undefined,
            )
            .reduce(
              (acc, v) => acc.add(v.propertyName),
              <Set<string>>new Set(),
            );

          for (const prop of allProps) {
            if (!dtoObject.hasOwnProperty(prop)) {
              dtoObject[prop] = null;
            }
          }
        }
      }

      return method.apply(this, args);
    };
  };
