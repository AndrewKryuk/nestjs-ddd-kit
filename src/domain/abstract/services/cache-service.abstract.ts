export abstract class CacheServiceAbstract {
  /**
   * Is used to save cached value by key with optional ttl (Time To Live)
   * If ttl is not specified,
   * ttl will be equal to process.env.CACHE_TTL value or 10 minutes
   */
  abstract set<T>(key: number | string, value: T, ttl?: number): Promise<void>;

  /**
   * Is used to get cached value by key or get undefined
   */
  abstract get<T>(key: number | string): Promise<T | undefined>;

  /**
   * Is used to delete cached value by key
   */
  abstract del(key: number | string): Promise<void>;

  /**
   * Is used to flush all cached values
   */
  abstract reset(): Promise<void>;
}
