import { ValidationError } from 'class-validator';

/**
 * Is used to get all error constraints from array of validation errors
 */
export const getAllConstraints = (
  errors: ValidationError[],
  messageHandler?: (error: ValidationError, constraint: string) => string,
): string[] => {
  const constraints: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      let constraintValues = Object.values(error.constraints);

      if (messageHandler) {
        constraintValues = constraintValues.map((constraint) =>
          messageHandler(error, constraint),
        );
      }

      constraints.push(...constraintValues);
    }

    if (error.children) {
      const childConstraints = getAllConstraints(error.children);
      constraints.push(...childConstraints);
    }
  }

  return constraints;
};
