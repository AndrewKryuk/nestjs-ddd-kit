import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';
import { BaseException } from '../base/base-exception';

@httpStatus(EHttpStatus.BAD_REQUEST)
@grpcStatus(EGrpcStatus.INVALID_ARGUMENT)
export class TransportException extends BaseException {}
