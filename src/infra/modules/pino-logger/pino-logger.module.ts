import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

const isProd = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'local';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        timestamp: false,
        level: isProd ? 'info' : 'debug',
        autoLogging: {
          ignore: (req) => req.url === '/health' || req.url === '/api/health',
        },
        formatters: {
          log(object: Record<string, any>) {
            if (object?.request?.metadata) {
              object.request.metadata = object.request.metadata.getMap();
            }

            const date = new Date().toISOString();

            return { date, ...object };
          },
        },
        redact: [
          'req.headers.authorization',
          'request.metadata.authorization',
          'response.result.token',
        ],
        transport: isLocal
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            }
          : undefined,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class PinoLoggerModule {
  constructor() {}
}
