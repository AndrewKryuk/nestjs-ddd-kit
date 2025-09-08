import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { IException } from '../interfaces/exception.interface';
import { status } from '@grpc/grpc-js';
import { isJSON } from 'class-validator';
import { IError } from '../../../application/exceptions/interfaces/error.interface';
import { GrpcException } from '../../../application/exceptions/transport/grpc-exception';
import { HTTP_CODE_FROM_GRPC } from '../../../domain/constants/http-code-from-grpc';

export const unknownHandler = (exception: IException, host: ArgumentsHost) => {
  const error: IError = {
    message: exception?.message || exception?.details || 'Unknown error',
    code: 'UNKNW-001',
  };

  switch (host.getType()) {
    case 'rpc':
      return throwError(
        () => new GrpcException([error], exception?.code ?? status.UNKNOWN),
      );

    case 'http':
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      let errors: IError[] = [error];
      let statusCode = exception?.status || HttpStatus.BAD_REQUEST;

      if (
        exception?.code &&
        HTTP_CODE_FROM_GRPC.hasOwnProperty(exception.code) &&
        isJSON(exception.details)
      ) {
        errors = JSON.parse(exception.details ?? '{}')?.errors;
        statusCode = HTTP_CODE_FROM_GRPC[exception.code];
      }

      response.status(statusCode).json({
        errors,
      });
  }
};
