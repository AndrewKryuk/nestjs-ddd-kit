export interface IGrpcServerOptions {
  /**
   * Package names
   */
  packageNames: string[];

  /**
   * Path to proto files
   */
  protoPath: string;

  /**
   * Additional directories for loader with .proto files
   */
  additionalDirs?: string[];

  /**
   * Keep case
   */
  keepCase?: boolean;
}
