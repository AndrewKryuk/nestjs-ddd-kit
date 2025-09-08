import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { typeormHandler } from './handlers/typeorm.handler';
import { badRequestHandler } from './handlers/bad-request.handler';
import { defaultHandler } from './handlers/default.handler';
import { IException } from './interfaces/exception.interface';
import { s3Handler } from './handlers/s3.handler';
import { unknownHandler } from './handlers/unknown.handler';
import { BaseException } from '../../application/exceptions/base/base-exception';
import { S3Exception } from '../../application/exceptions/infra/s3-exception';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: IException, host: ArgumentsHost) {
    if (exception instanceof TypeORMError) {
      return typeormHandler(exception, host);
    } else if (exception instanceof BadRequestException) {
      return badRequestHandler(exception, host);
    } else if (exception instanceof S3Exception) {
      return s3Handler(exception, host);
    } else if (exception instanceof BaseException) {
      return defaultHandler(exception, host);
    } else {
      return unknownHandler(exception, host);
    }
  }
}
