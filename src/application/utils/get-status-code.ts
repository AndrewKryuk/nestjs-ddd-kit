import { ContextType } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { HTTP_CODE_FROM_GRPC } from '../../domain/constants/http-code-from-grpc';
import { getPrototypeChain } from './get-prototype-chain';
import {
  grpcStatusMetadataKey,
  httpStatusMetadataKey,
} from '../../domain/tokens/status.tokens';
import { BaseException } from '../exceptions/base/base-exception';

export const getStatusCode = (
  type: Omit<ContextType, 'ws'>,
  exception: BaseException,
): number => {
  const code = exception.getCode();

  if (code) {
    const isGrpcCode = HTTP_CODE_FROM_GRPC.hasOwnProperty(code);

    switch (type) {
      case 'http':
        if (isGrpcCode) {
          return HTTP_CODE_FROM_GRPC[code];
        } else {
          const hasHttpCode = Object.values(HTTP_CODE_FROM_GRPC).includes(code);

          if (hasHttpCode) {
            return code;
          }
        }
        break;

      case 'rpc':
        if (isGrpcCode) {
          return code;
        } else {
          const grpcCode = Object.keys(HTTP_CODE_FROM_GRPC).find(
            (key) => HTTP_CODE_FROM_GRPC[key] === code,
          );

          if (grpcCode) {
            return Number(grpcCode);
          }
        }
        break;
    }
  }

  const metadataKey =
    type === 'http' ? httpStatusMetadataKey : grpcStatusMetadataKey;

  const defaultStatusCode =
    type === 'http' ? HttpStatus.BAD_REQUEST : status.UNKNOWN;

  let statusCode = Reflect.getOwnMetadata(
    metadataKey,
    Object.getPrototypeOf(exception),
  );

  if (!statusCode) {
    const prototypeChain = getPrototypeChain(exception);

    for (const prototype of prototypeChain) {
      statusCode = Reflect.getOwnMetadata(metadataKey, prototype);

      if (statusCode) {
        break;
      }
    }
  }

  return statusCode || defaultStatusCode;
};
