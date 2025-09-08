import { InfraException } from './infra-exception';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@grpcStatus(status.INTERNAL)
export class DatabaseException extends InfraException {}
