import { InfraException } from './infra-exception';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(HttpStatus.UNAUTHORIZED)
@grpcStatus(status.UNAUTHENTICATED)
export class UnauthorizedException extends InfraException {}
