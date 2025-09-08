import {
  validateSync,
  ValidationArguments,
  ValidationError,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { getAllConstraints } from '../utils/get-all-constraints';

/**
 * Checks nested elements by type and unknown object keys
 */
@ValidatorConstraint()
export class IsNestedElementsConstraint
  implements ValidatorConstraintInterface
{
  private errors: string[] = [];

  constructor(private type: ClassConstructor<object>) {}

  validate(value: Record<string, any>, args: ValidationArguments) {
    this.errors = [];

    if (!value) return true;

    const validations: ValidationError[] = [];

    Object.entries(value).forEach(([key, value]) => {
      const validationErrors = validateSync(
        plainToInstance(this.type, value),
      ).map((validationError) => {
        validationError.contexts = { key, args };

        return validationError;
      });

      validations.push(...validationErrors);
    });

    this.errors = getAllConstraints(validations, (error, constraint) => {
      constraint = `${error?.contexts?.args?.property}.${error?.contexts?.key}: ${constraint}`;

      return constraint;
    });

    return !this.errors?.length;
  }

  defaultMessage(): string {
    return this.errors.join(', ');
  }
}
