import { Interceptor } from '@grpc/grpc-js';

export interface IGrpcInterceptor {
  intercept: Interceptor;
}
