import { DomainException } from './domain-exception';
import { HttpStatus } from '@nestjs/common';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

import { status } from '@grpc/grpc-js';

@httpStatus(HttpStatus.CONFLICT)
@grpcStatus(status.ALREADY_EXISTS)
export class ConflictException extends DomainException {}
