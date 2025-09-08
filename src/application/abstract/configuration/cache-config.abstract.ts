/**
 * Cache configuration
 */
export abstract class CacheConfigAbstract {
  ttl: number;
  redis?: { url: string };
}
