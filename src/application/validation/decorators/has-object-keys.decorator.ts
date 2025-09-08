import { registerDecorator, ValidationArguments } from 'class-validator';
import { HasObjectKeysConstraint } from '../constraints/has-object-keys.constraint';

/**
 * Checks object keys to exist by array of strings
 *
 * @example
 * class ClassDTO {
 *    @HasObjectKeys((args: ValidationArguments): string[] => {
 *      return ['firstKey', 'secondKey'];
 *    })
 *    property: { [key: string]: SubClassDTO }
 * }
 */
export const HasObjectKeys =
  (
    keysProvider: (
      args: ValidationArguments & { object: Record<string, any> },
    ) => string[],
  ) =>
  (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: new HasObjectKeysConstraint(keysProvider),
    });
  };
