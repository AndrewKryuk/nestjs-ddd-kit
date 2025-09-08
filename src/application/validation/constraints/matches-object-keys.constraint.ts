import {
  matches,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Checks if object keys match the pattern.
 */
@ValidatorConstraint()
export class MatchesObjectKeysConstraint
  implements ValidatorConstraintInterface
{
  private errorKeys: string[] = [];

  constructor(private readonly pattern: RegExp) {}

  validate(value: Record<string, any>) {
    if (!value) return true;

    this.errorKeys = [];

    const validations = Object.keys(value).map((key) => {
      const result = matches(key, this.pattern);

      if (!result) this.errorKeys.push(key);

      return result;
    });

    return validations.every((validation) => validation);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} keys must match ${this.pattern} regular expression. Wrong keys: ${this.errorKeys.join(', ')}.`;
  }
}
