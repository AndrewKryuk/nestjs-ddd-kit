import { ValidationPipe } from '@nestjs/common';
import { inputValidationFactory } from '../../application/validation/factories/input-validation.factory';

export const InputValidationPipe = new ValidationPipe({
  exceptionFactory: inputValidationFactory,
  transform: true,
  whitelist: true,
});
