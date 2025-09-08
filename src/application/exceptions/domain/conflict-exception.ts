import { DomainException } from './domain-exception';
import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';

@httpStatus(EHttpStatus.CONFLICT)
@grpcStatus(EGrpcStatus.ALREADY_EXISTS)
export class ConflictException extends DomainException {}
