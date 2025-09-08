import { IError } from '../interfaces/error.interface';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@grpcStatus(status.UNKNOWN)
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
