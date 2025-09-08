import { isPlainObject } from '@nestjs/common/utils/shared.utils';

/**
 * Is used to convert object to object with path as key and value as value of this path
 * @example
 * input: { a: { b: { c: 1, d: 2 } } }
 * output: { 'a.b.c': 1, 'a.b.d': 2 }
 */
export const objectToQueryObject = (
  obj: Record<string, any>,
  path?: string,
): Record<string, any> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newPath = path ? `${path}.${key}` : key;

    if (Array.isArray(value)) {
      value = value[0];
    }

    if (isPlainObject(value)) {
      return {
        ...acc,
        ...objectToQueryObject(value, newPath),
      };
    }

    acc[newPath] = value;

    return acc;
  }, {});
};
