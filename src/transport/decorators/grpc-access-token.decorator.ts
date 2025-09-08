import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GrpcAccessToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const header = context.getArgByIndex(1).get('authorization')[0];
    return header.slice(header.indexOf(' ') + 1);
  },
);
