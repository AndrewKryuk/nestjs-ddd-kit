import { TypeORMError } from 'typeorm';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { IError } from '../../../application/exceptions/interfaces/error.interface';
import { ERROR_CODES } from '../../../domain/constants/error-codes';
import { GrpcException } from '../../../application/exceptions/transport/grpc-exception';

export const typeormHandler = (
  exception: TypeORMError,
  host: ArgumentsHost,
) => {
  const error: IError = {
    message: exception.message,
    code: ERROR_CODES.DB_ERROR,
  };

  switch (host.getType()) {
    case 'rpc':
      return throwError(() => new GrpcException([error], status.INTERNAL));

    case 'http':
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: [error],
      });
  }
};
