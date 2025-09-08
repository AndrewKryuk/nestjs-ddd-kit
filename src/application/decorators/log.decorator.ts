import { Logger } from '@nestjs/common';
import fastRedact from 'fast-redact';
import { logLevelToMethod } from '../utils/log-level-to-method';
import { ILogOptions } from '../../domain/interfaces/log-options.interface';
import { redactMetadataKey } from '../../domain/tokens/logging.tokens';
import { isPromiseLike } from '../utils/is-promise-like';

const DEFAULT_OPTIONS: ILogOptions = {
  level: 'info',
};

export const Log = (options = DEFAULT_OPTIONS) => {
  return (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ): void => {
    const {
      data,
      level = DEFAULT_OPTIONS.level as Exclude<ILogOptions['level'], undefined>,
    } = options;

    const logger = new Logger(`${target.constructor.name}.${propertyName}`);
    const originalMethod = descriptor?.value;

    const makeLog = logger[logLevelToMethod(level)].bind(logger);

    const redactArray =
      Reflect.getOwnMetadata(redactMetadataKey, target, propertyName) || [];

    const redact = <(object: Record<string, any>) => string>(
      fastRedact({ paths: redactArray })
    );

    descriptor.value = function <T>(...args: unknown[]): T | PromiseLike<T> {
      const currentTime = Date.now();

      makeLog(
        JSON.parse(
          redact({
            ...data,
            args,
          }),
        ),
      );

      const result$P = originalMethod.apply(this, args) as T | PromiseLike<T>;

      const handleResult = (result: T): T => {
        const executeTime = `${Date.now() - currentTime}ms`;
        makeLog(
          JSON.parse(
            redact({
              ...data,
              result,
              executeTime,
            }),
          ),
        );
        return result;
      };

      if (isPromiseLike(result$P))
        return result$P.then((result) => handleResult(result));
      else return handleResult(result$P);
    };
  };
};
