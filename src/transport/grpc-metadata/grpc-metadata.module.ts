import { Module } from '@nestjs/common';
import { GrpcMetadataInterceptor } from './interceptors/grpc-metadata.interceptor';

@Module({
  imports: [],
  providers: [GrpcMetadataInterceptor],
  exports: [GrpcMetadataInterceptor],
})
export class GrpcMetadataModule {}
