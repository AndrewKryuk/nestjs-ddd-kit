import { TransportException } from './transport-exception';
import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(EHttpStatus.FORBIDDEN)
@grpcStatus(EGrpcStatus.PERMISSION_DENIED)
export class ForbiddenException extends TransportException {}
