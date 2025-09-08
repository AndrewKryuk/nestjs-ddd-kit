import * as process from 'process';
import { GrpcConfigAbstract } from '../../application/abstract/configuration/grpc-config.abstract';
import { cleanEnv, str } from 'envalid';

const { GRPC_HOST, GRPC_PORT } = process.env;

export const grpcConfigFactory: () => GrpcConfigAbstract = () => cleanEnv({
  url: !GRPC_HOST || !GRPC_PORT ? '0.0.0.0:5000' : `${GRPC_HOST}:${GRPC_PORT}`,
}, {
  url: str()
});
