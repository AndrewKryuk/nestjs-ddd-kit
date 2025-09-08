import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Checks if string ends with seed
 */
@ValidatorConstraint()
export class EndsWithConstraint implements ValidatorConstraintInterface {
  constructor(private readonly endString: string) {}

  validate(value: string): boolean {
    if (!value) {
      return false;
    }

    return value.endsWith(this.endString);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should ends with "${this.endString}".`;
  }
}
