import { ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { GrpcException } from '../../../application/exceptions/transport/grpc-exception';
import { ERROR_CODES } from '../../../domain/constants/error-codes';
import { IError } from '../../../application/exceptions/interfaces/error.interface';

export const badRequestHandler = (
  exception: BadRequestException,
  host: ArgumentsHost,
) => {
  const error: IError = {
    message: exception.message,
    code: ERROR_CODES.INVALID_INPUT,
  };

  switch (host.getType()) {
    case 'rpc':
      return throwError(
        () => new GrpcException([error], status.INVALID_ARGUMENT),
      );

    case 'http':
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response.status(HttpStatus.BAD_REQUEST).json({
        errors: [error],
      });
  }
};
