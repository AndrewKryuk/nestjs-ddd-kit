import { S3ConfigAbstract } from '../../application/abstract/configuration/s3-config.abstract';
import { cleanEnv, str } from 'envalid';

export const s3ConfigFactory: () => S3ConfigAbstract = () => {
  const env = cleanEnv(process.env, {
    AWS_REGION: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    S3_BUCKET: str(),
    S3_ENDPOINT: str(),
  });

  return {
    options:
      env.AWS_REGION &&
      env.AWS_ACCESS_KEY_ID &&
      env.AWS_SECRET_ACCESS_KEY &&
      env.S3_BUCKET
        ? {
            region: env.AWS_REGION,
            endpoint: env.S3_ENDPOINT,
            credentials: {
              accessKeyId: env.AWS_ACCESS_KEY_ID,
              secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            },
            forcePathStyle: true,
          }
        : undefined,
    bucket: env.S3_BUCKET,
  };
};
