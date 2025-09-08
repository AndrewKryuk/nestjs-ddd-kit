import { Transform } from 'class-transformer';

/**
 * Is used to trim value
 */
export const Trim = (): PropertyDecorator => {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  );
};
