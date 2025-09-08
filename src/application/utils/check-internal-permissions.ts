import { Metadata } from '@grpc/grpc-js';

export const checkInternalPermissions = (
  key: string,
  metadata: Metadata,
): boolean => {
  const internalPermissions = JSON.parse(
    (metadata.get('internal-permissions')[0] as string) ?? '[]',
  );

  return !!internalPermissions.find((v) => v === key);
};
