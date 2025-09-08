import { isObject } from '@nestjs/common/utils/shared.utils';

/**
 * Is used to deep merge objects
 */
export const deepMerge = <T>(target: any, ...sources: any[]): T => {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Array.isArray(source[key])) {
        if (target[key]?.length) {
          target[key].push(...source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      } else if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }

        deepMerge(target[key], source[key]);
      }
    }
  }

  return deepMerge(target, ...sources);
};
