export type DefaultOptionalCreateProps<T> = Omit<T, 'id'> & { id?: string };
