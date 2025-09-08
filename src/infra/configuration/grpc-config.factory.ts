import * as process from 'process';
import { GrpcConfigAbstract } from '../../application/abstract/configuration/grpc-config.abstract';

const { GRPC_HOST, GRPC_PORT } = process.env;

export const grpcConfigFactory: () => GrpcConfigAbstract = () => ({
  url: !GRPC_HOST || !GRPC_PORT ? '0.0.0.0:5000' : `${GRPC_HOST}:${GRPC_PORT}`,
});
