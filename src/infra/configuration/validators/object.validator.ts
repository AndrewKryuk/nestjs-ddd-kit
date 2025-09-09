import { makeValidator, EnvError } from 'envalid';

export const objectValidator = makeValidator((value: unknown) => {
  const isObject =
    typeof value === 'object' && value !== null && !Array.isArray(value);

  if (isObject) {
    return value as Record<string, unknown>;
  } else {
    throw new EnvError(`Invalid object: "${value}"`);
  }
});
