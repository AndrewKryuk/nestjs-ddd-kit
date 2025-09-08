import { ValidationError } from 'class-validator';
import { getAllConstraints } from '../utils/get-all-constraints';
import { ERROR_CODES } from '../../../domain/constants/error-codes';
import { InputValidationException } from '../../../application/exceptions/transport/input-validation-exception';

export const inputValidationFactory = (
  errors: ValidationError[],
): InputValidationException => {
  const constraints = getAllConstraints(errors);

  return new InputValidationException(
    constraints.map((constraint) => ({
      message: constraint,
      code: ERROR_CODES.INVALID_INPUT,
    })),
  );
};
