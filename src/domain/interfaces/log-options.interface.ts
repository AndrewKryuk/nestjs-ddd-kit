export interface ILogOptions {
  level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  data?: Record<string, any>;
}
