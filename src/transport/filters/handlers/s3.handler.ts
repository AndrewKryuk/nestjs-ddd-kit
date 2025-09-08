import { ArgumentsHost } from '@nestjs/common';
import { throwError } from 'rxjs';
import { S3Exception } from '../../../application/exceptions/infra/s3-exception';
import { HTTP_CODE_FROM_GRPC } from '../../../domain/constants/http-code-from-grpc';
import { getStatusCode } from '../../../application/utils/get-status-code';
import { GrpcException } from '../../../application/exceptions/transport/grpc-exception';

export const s3Handler = (exception: S3Exception, host: ArgumentsHost) => {
  const hostType = host.getType();
  let s3ErrorCode = exception?.getCode();

  if (s3ErrorCode && hostType === 'rpc') {
    s3ErrorCode = Number(
      Object.keys(HTTP_CODE_FROM_GRPC).find(
        (key) => HTTP_CODE_FROM_GRPC[key] === s3ErrorCode,
      ),
    );
  }

  const statusCode = s3ErrorCode || getStatusCode(hostType, exception);

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
