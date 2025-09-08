import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';
import { BaseException } from '../base/base-exception';

@httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@grpcStatus(status.INTERNAL)
export class InfraException extends BaseException {}
