import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionServiceAbstract } from '../../domain/abstract/services/transaction-service.abstract';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TransactionService implements TransactionServiceAbstract {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async withTransaction<T>(
    callback: () => Promise<T>,
    isolationLevel:
      | 'READ UNCOMMITTED'
      | 'READ COMMITTED'
      | 'REPEATABLE READ'
      | 'SERIALIZABLE' = 'READ COMMITTED',
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(isolationLevel);

    try {
      const result = await callback();
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
