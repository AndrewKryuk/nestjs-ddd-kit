import { status as Status } from '@grpc/grpc-js';
import { EHttpStatus } from '../enums/http-status.enum';

export const HTTP_CODE_FROM_GRPC: Record<number, number> = {
  [Status.OK]: EHttpStatus.OK,
  [Status.CANCELLED]: EHttpStatus.METHOD_NOT_ALLOWED,
  [Status.UNKNOWN]: EHttpStatus.BAD_GATEWAY,
  [Status.INVALID_ARGUMENT]: EHttpStatus.UNPROCESSABLE_ENTITY,
  [Status.DEADLINE_EXCEEDED]: EHttpStatus.REQUEST_TIMEOUT,
  [Status.NOT_FOUND]: EHttpStatus.NOT_FOUND,
  [Status.ALREADY_EXISTS]: EHttpStatus.CONFLICT,
  [Status.PERMISSION_DENIED]: EHttpStatus.FORBIDDEN,
  [Status.RESOURCE_EXHAUSTED]: EHttpStatus.TOO_MANY_REQUESTS,
  [Status.FAILED_PRECONDITION]: EHttpStatus.PRECONDITION_REQUIRED,
  [Status.ABORTED]: EHttpStatus.METHOD_NOT_ALLOWED,
  [Status.OUT_OF_RANGE]: EHttpStatus.PAYLOAD_TOO_LARGE,
  [Status.UNIMPLEMENTED]: EHttpStatus.NOT_IMPLEMENTED,
  [Status.INTERNAL]: EHttpStatus.INTERNAL_SERVER_ERROR,
  [Status.UNAVAILABLE]: EHttpStatus.NOT_FOUND,
  [Status.DATA_LOSS]: EHttpStatus.INTERNAL_SERVER_ERROR,
  [Status.UNAUTHENTICATED]: EHttpStatus.UNAUTHORIZED,
};
