export abstract class TransactionServiceAbstract {
  abstract withTransaction<T>(
    callback: () => Promise<T>,
    isolationLevel?:
      | 'READ UNCOMMITTED'
      | 'READ COMMITTED'
      | 'REPEATABLE READ'
      | 'SERIALIZABLE',
  ): Promise<T>;
}
