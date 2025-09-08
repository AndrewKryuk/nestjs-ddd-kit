import { IPagination } from './pagination.interface';
import { IOrder } from './order.interface';
import { ICriteriaFilters } from './criteria-filters.interface';
import { ICriteriaSearch } from './criteria-search.interface';

export interface ICriteria {
  filters?: ICriteriaFilters;
  search?: ICriteriaSearch;
  pagination?: IPagination;
  order?: IOrder;
  withDeleted?: boolean;
}
