import { IsNestedElementsConstraint } from '../constraints/is-nested-elements.constraint';
import { registerDecorator } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

/**
 * Checks nested elements by type and unknown object keys
 *
 * @example
 * class ClassDTO {
 *    @IsNestedElements(SubClassDTO)
 *    property: { [key: string]: SubClassDTO }
 * }
 */
export const IsNestedElements =
  (type: ClassConstructor<object>) =>
  (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: new IsNestedElementsConstraint(type),
    });
  };
