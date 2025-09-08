import { defer, lastValueFrom, retry, RetryConfig, timer } from 'rxjs';

export const RETRY_COUNT = 3;
export const RETRY_DELAY = 7000;

export const BASE_RETRY_CONFIG: RetryConfig = {
  count: RETRY_COUNT,
  delay: (error, retryCount) => timer(retryCount * RETRY_DELAY),
};

export function promiseRetry<T>(
  promiseFactory: () => Promise<T>,
  config: RetryConfig = BASE_RETRY_CONFIG,
): Promise<T> {
  const pipe = defer(promiseFactory).pipe(retry(config));
  return lastValueFrom(pipe);
}
