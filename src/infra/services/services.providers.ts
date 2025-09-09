import { Provider } from '@nestjs/common';
import { TransactionServiceAbstract } from '../../domain/abstract/services/transaction-service.abstract';
import { TransactionService } from './transaction.service';

export const transactionServiceProvider: Provider = {
  provide: TransactionServiceAbstract,
  useClass: TransactionService,
};
