import { Transform } from 'class-transformer';

export const AnyToArray = () =>
  Transform(({ value }) => (Array.isArray(value) ? value : [value]));
