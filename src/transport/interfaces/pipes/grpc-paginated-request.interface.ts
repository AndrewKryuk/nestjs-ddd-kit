import { IPagination } from '../../../domain/interfaces/repository/pagination.interface';
import { IOrder } from '../../../domain/interfaces/repository/order.interface';
import { ICriteriaSearch } from '../../../domain/interfaces/repository/criteria-search.interface';

export interface IGrpcPaginatedRequest {
  [key: string]: any;

  pagination: IPagination;
  order: IOrder;
  search: ICriteriaSearch;
  createdAt?: { from?: Date; to?: Date };
  updatedAt?: { from?: Date; to?: Date };
}
