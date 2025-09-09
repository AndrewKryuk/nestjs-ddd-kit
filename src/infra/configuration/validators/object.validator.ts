import { makeStructuredValidator } from 'envalid/src/makers';
import { EnvError } from 'envalid/src/errors';

export const objectValidator = makeStructuredValidator((value: any) => {
  const isObject =
    typeof value === 'object' && value !== null && !Array.isArray(value);

  if (isObject) {
    return value;
  } else {
    throw new EnvError(`Invalid object: "${value}"`);
  }
});
