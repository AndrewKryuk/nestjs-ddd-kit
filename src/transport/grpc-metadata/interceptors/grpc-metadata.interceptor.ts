import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  Requester,
  InterceptingCall,
  InterceptorOptions,
  NextCall,
} from '@grpc/grpc-js';
import { IGrpcInterceptor } from '../interfaces/grpc-interceptor.interface';
import { StorageServiceAbstract } from '../../../infra/modules/storage/abstract/storage-service.abstract';
import {
  CLS_GRPC_CONTEXT,
  CLS_USER,
  CLS_USER_INTERNAL_PERMISSIONS,
} from '../../../infra/modules/storage/tokens';

@Injectable()
export class GrpcMetadataInterceptor implements IGrpcInterceptor {
  constructor(private readonly storageService: StorageServiceAbstract) {}

  intercept(options: InterceptorOptions, nextCall: NextCall): InterceptingCall {
    const requester: Requester = {
      start: (metadata, listener, next): void => {
        const request = this.storageService.getRequest();

        if (request?.headers && request?.headers?.authorization) {
          metadata.set('authorization', request.headers.authorization);
        }

        const user = this.storageService.get<{
          id: string;
        }>(CLS_USER);

        if (user && user?.id) {
          metadata.set('user-id', user.id);
        }

        const internalPermissions = this.storageService.get<
          Record<string, any>[]
        >(CLS_USER_INTERNAL_PERMISSIONS);
        metadata.set(
          'internal-permissions',
          JSON.stringify(
            internalPermissions?.length ? internalPermissions : [],
          ),
        );

        const grpcContext =
          this.storageService.get<ExecutionContext>(CLS_GRPC_CONTEXT);

        if (grpcContext) {
          metadata.set(
            'authorization',
            grpcContext.getArgByIndex(1).get('authorization')[0],
          );
          metadata.set(
            'user-id',
            grpcContext.getArgByIndex(1).get('user-id')[0],
          );
          metadata.set(
            'internal-permissions',
            grpcContext.getArgByIndex(1).get('internal-permissions')[0] ||
              JSON.stringify([]),
          );
        }

        next(metadata, listener);
      },
    };

    return new InterceptingCall(nextCall(options), requester);
  }
}
