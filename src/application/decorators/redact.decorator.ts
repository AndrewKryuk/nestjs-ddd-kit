import { redactMetadataKey } from '../../domain/tokens/logging.tokens';

export const Redact =
  (redactArray: string[] = []) =>
  (target: any, propertyName: string) => {
    Reflect.defineMetadata(
      redactMetadataKey,
      redactArray,
      target,
      propertyName,
    );
  };
