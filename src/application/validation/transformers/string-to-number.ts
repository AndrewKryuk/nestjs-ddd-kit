import { Transform } from 'class-transformer';

export const StringToNumber = () => Transform(({ value }) => parseInt(value));
