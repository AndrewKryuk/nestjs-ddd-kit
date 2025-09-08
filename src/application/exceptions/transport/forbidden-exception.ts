import { TransportException } from './transport-exception';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(HttpStatus.FORBIDDEN)
@grpcStatus(status.PERMISSION_DENIED)
export class ForbiddenException extends TransportException {}
