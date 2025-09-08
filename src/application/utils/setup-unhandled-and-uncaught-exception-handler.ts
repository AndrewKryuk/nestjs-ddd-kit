import { Logger } from '@nestjs/common';

/**
 * Is used to setup unhandled and uncaught exception handler
 */
export const setupUnhandledAndUncaughtExceptionHandler = () => {
  process.on('uncaughtException', (error) => {
    const logger = new Logger('uncaughtException', {
      timestamp: true,
    });

    logger.error(error);
  });

  process.on('unhandledRejection', (reason, promise) => {
    const logger = new Logger('unhandledRejection', {
      timestamp: true,
    });

    logger.error('Unhandled Rejection:', promise, 'reason:', reason);
  });
};
