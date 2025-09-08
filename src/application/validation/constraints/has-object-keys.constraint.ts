import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Checks object keys to exist by array of strings
 */
@ValidatorConstraint()
export class HasObjectKeysConstraint implements ValidatorConstraintInterface {
  private errors: string[] = [];

  constructor(private keysProvider: (args: ValidationArguments) => string[]) {}

  validate(value: Record<string, any>, args: ValidationArguments) {
    this.errors = [];

    const keys = this.keysProvider(args);

    keys.forEach((key) => {
      if (!value?.[key]) {
        this.errors.push(`${args.property}.${key} is missing`);
      }
    });

    return !this.errors.length;
  }

  defaultMessage(): string {
    return `${this.errors.join(', ')}.`;
  }
}
