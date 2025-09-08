import { DomainException } from './domain-exception';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(HttpStatus.NOT_FOUND)
@grpcStatus(status.NOT_FOUND)
export class NotFoundException extends DomainException {}
