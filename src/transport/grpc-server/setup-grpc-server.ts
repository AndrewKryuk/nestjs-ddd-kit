import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IGrpcServerOptions } from './interfaces/grpc-server-options.interface';
import { join } from 'path';
import { grpcConfigFactory } from '../../infra/configuration/grpc-config.factory';

export const setupGrpcServer = (
  app: INestApplication,
  options: IGrpcServerOptions,
) => {
  const { url } = grpcConfigFactory();
  const {
    additionalDirs = [],
    keepCase = false,
    protoPath,
    packageNames,
  } = options;

  const makePath = (packageName: string) =>
    join(protoPath, `${packageName}.proto`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: [...packageNames],
      protoPath: [...packageNames.map((packageName) => makePath(packageName))],
      url,
      loader: {
        includeDirs: [protoPath, ...additionalDirs],
        keepCase,
      },
    },
  });
};
