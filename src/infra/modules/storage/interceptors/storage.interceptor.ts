import { ClsInterceptor } from 'nestjs-cls';
import { CLS_GRPC_CONTEXT } from '../tokens';

export const StorageInterceptor = new ClsInterceptor({
  setup: (cls, context) => {
    cls.set(CLS_GRPC_CONTEXT, context);
  },
});
