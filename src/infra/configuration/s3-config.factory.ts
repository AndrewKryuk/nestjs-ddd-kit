import * as process from 'process';
import { S3ConfigAbstract } from '../../application/abstract/configuration/s3-config.abstract';
import { cleanEnv, json, str } from 'envalid';

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET = '',
  S3_ENDPOINT,
} = process.env;

export const s3ConfigFactory: () => S3ConfigAbstract = () =>
  cleanEnv(
    {
      options:
        AWS_REGION && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && S3_BUCKET
          ? {
              region: AWS_REGION,
              endpoint: S3_ENDPOINT,
              credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
              },
              forcePathStyle: true,
            }
          : undefined,
      bucket: S3_BUCKET,
    },
    {
      options: json({ default: undefined }),
      bucket: str(),
    },
  );
