import { ArgumentsHost } from '@nestjs/common';
import { throwError } from 'rxjs';
import { BaseException } from '../../../application/exceptions/base/base-exception';
import { getStatusCode } from '../../../application/utils/get-status-code';
import { GrpcException } from '../../../application/exceptions/transport/grpc-exception';

export const defaultHandler = (
  exception: BaseException,
  host: ArgumentsHost,
) => {
  const hostType = host.getType();
  const statusCode = getStatusCode(hostType, exception);

  switch (hostType) {
    case 'rpc':
      return throwError(
        () => new GrpcException(exception.getErrors(), statusCode),
      );

    case 'http':
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response.status(statusCode).json({
        errors: exception.getErrors(),
      });
  }
};
