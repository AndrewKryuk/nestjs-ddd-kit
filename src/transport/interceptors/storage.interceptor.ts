import { ClsInterceptor } from 'nestjs-cls';
import { CLS_GRPC_CONTEXT } from '../../domain/tokens/cls.tokens';

export const StorageInterceptor = new ClsInterceptor({
  setup: (cls, context) => {
    cls.set(CLS_GRPC_CONTEXT, context);
  },
});
