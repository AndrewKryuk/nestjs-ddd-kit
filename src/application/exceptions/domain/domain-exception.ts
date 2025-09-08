import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';
import { BaseException } from '../base/base-exception';

@httpStatus(HttpStatus.BAD_REQUEST)
@grpcStatus(status.INVALID_ARGUMENT)
export class DomainException extends BaseException {}
