import { Transform } from 'class-transformer';

export const StringToBoolean = () =>
  Transform(({ value }) => {
    if (value.toLowerCase() === 'true') {
      return true;
    } else if (value.toLowerCase() === 'false') {
      return false;
    }

    return value;
  });
