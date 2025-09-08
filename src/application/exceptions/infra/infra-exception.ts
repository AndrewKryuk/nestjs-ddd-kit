import { EHttpStatus } from '../../../domain/enums/http-status.enum';
import { EGrpcStatus } from '../../../domain/enums/grpc-status.enum';
import { httpStatus } from '../../decorators/http-status.decorator';
import { grpcStatus } from '../../decorators/grpc-status.decorator';
import { BaseException } from '../base/base-exception';

@httpStatus(EHttpStatus.INTERNAL_SERVER_ERROR)
@grpcStatus(EGrpcStatus.INTERNAL)
export class InfraException extends BaseException {}
