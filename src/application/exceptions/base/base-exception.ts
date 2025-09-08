import { IError } from '../interfaces/error.interface';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';
import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';

@httpStatus(EHttpStatus.INTERNAL_SERVER_ERROR)
@grpcStatus(EGrpcStatus.UNKNOWN)
export abstract class BaseException extends Error {
  constructor(
    protected readonly errors: IError[],
    protected readonly code?: number,
  ) {
    super();
    this.code = code;
    this.initMessage();
  }

  initMessage(): void {
    this.message = JSON.stringify({ errors: this.errors });
  }

  getErrors(): IError[] {
    return this.errors;
  }

  getCode(): number | undefined {
    return this.code;
  }
}
