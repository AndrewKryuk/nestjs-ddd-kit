import { LoggerService } from '@nestjs/common/services/logger.service';
import { ILogOptions } from '../../domain/interfaces/log-options.interface';

/**
 * Is used to convert log level to logger method
 */
export const logLevelToMethod = (
  level: Exclude<ILogOptions['level'], undefined>,
): keyof LoggerService => {
  const levelToMethod: {
    [Level in Exclude<ILogOptions['level'], undefined>]: keyof LoggerService;
  } = {
    fatal: 'fatal',
    error: 'error',
    warn: 'warn',
    info: 'log',
    debug: 'debug',
    trace: 'verbose',
  };

  return levelToMethod[level];
};
