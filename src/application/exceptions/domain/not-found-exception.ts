import { DomainException } from './domain-exception';
import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(EHttpStatus.NOT_FOUND)
@grpcStatus(EGrpcStatus.NOT_FOUND)
export class NotFoundException extends DomainException {}
