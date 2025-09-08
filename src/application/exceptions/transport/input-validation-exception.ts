import { TransportException } from './transport-exception';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(HttpStatus.BAD_REQUEST)
@grpcStatus(status.INVALID_ARGUMENT)
export class InputValidationException extends TransportException {}
