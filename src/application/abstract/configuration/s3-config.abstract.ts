import { S3ClientConfig } from '@aws-sdk/client-s3';

/**
 * AWS S3 configuration
 */
export abstract class S3ConfigAbstract {
  options?: S3ClientConfig;
  bucket: string;
}
