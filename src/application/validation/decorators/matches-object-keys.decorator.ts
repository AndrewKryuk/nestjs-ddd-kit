import { registerDecorator } from 'class-validator';
import { MatchesObjectKeysConstraint } from '../constraints/matches-object-keys.constraint';

/**
 * Checks if object keys match the pattern.
 *
 * @example
 * class ClassDTO {
 *    @MatchesObjectKeys(/^[A-Z0-9_]*$/)
 *    property: { [objectKey: string]: SubClassDTO }
 * }
 */
export const MatchesObjectKeys =
  (pattern: RegExp) => (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: new MatchesObjectKeysConstraint(pattern),
    });
  };
