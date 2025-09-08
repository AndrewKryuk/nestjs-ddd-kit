import { registerDecorator } from 'class-validator';
import { EndsWithConstraint } from '../constraints/ends-with.constraint';

/**
 * Checks if string ends with seed
 */
export const EndsWith =
  (endString: string) => (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: new EndsWithConstraint(endString),
    });
  };
