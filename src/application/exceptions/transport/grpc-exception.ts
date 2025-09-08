import { TransportException } from './transport-exception';
import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';

@httpStatus(EHttpStatus.BAD_REQUEST)
@grpcStatus(EGrpcStatus.INVALID_ARGUMENT)
export class GrpcException extends TransportException {}
