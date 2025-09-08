import {
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  type CallHandler,
} from '@nestjs/common';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { snakeToCamel } from '../../application/utils/snake-to-camel';
import { camelToSnake } from '../../application/utils/camel-to-snake';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = snakeToCamel(request.body);
    request.query = snakeToCamel(request.query);

    return next.handle().pipe(map(camelToSnake));
  }
}
