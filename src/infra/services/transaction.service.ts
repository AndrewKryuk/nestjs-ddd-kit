import { Injectable } from '@nestjs/common';
import { TransactionServiceAbstract } from '../../domain/abstract/services/transaction-service.abstract';
import {
  IsolationLevel,
  Propagation,
  runInTransaction,
} from 'typeorm-transactional';

@Injectable()
export class TransactionService implements TransactionServiceAbstract {
  constructor() {}

  async withTransaction<T>(
    callback: () => Promise<T>,
    isolationLevel: IsolationLevel = IsolationLevel.READ_COMMITTED,
    propagation: Propagation = Propagation.REQUIRED,
  ): Promise<T> {
    try {
      return await runInTransaction(callback, { isolationLevel, propagation });
    } catch (error: unknown) {
      throw error;
    }
  }
}
