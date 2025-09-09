import { GrpcConfigAbstract } from '../../application/abstract/configuration/grpc-config.abstract';
import { cleanEnv, num, str } from 'envalid';

export const grpcConfigFactory: () => GrpcConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    GRPC_HOST: str({ default: '0.0.0.0' }),
    GRPC_PORT: num({ default: 5000 }),
  });

  return {
    url: `${env.GRPC_HOST}:${env.GRPC_PORT}`,
  };
};
