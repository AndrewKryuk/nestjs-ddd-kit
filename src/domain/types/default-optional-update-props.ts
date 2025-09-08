import { DefaultOptionalCreateProps } from './default-optional-create-props';

export type DefaultOptionalUpdateProps<T> = Partial<
  DefaultOptionalCreateProps<T>
>;
