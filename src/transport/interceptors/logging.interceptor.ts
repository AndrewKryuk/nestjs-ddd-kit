import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'rpc') {
      const now = Date.now();
      const body = context.getArgByIndex(0);
      const metadata = context.getArgByIndex(1);
      const { path } = context.getArgByIndex(2);

      const request = {
        path,
        body,
        metadata,
      };

      return next.handle().pipe(
        tap({
          next: (response) =>
            this.logger.log({
              responseTime: Date.now() - now,
              request,
              response,
            }),
          error: (error) =>
            this.logger.error({
              responseTime: Date.now() - now,
              request,
              error,
            }),
        }),
      );
    }

    return next.handle();
  }
}
