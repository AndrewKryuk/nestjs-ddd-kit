import { PaginatedRequest } from '../../../application/dto/common/paginated.request';

export interface IHttpPaginatedRequest extends PaginatedRequest {
  searchQuery?: string;
  searchField?: string[];
  createdFrom?: Date;
  createdTo?: Date;
  updatedFrom?: Date;
  updatedTo?: Date;

  [key: string]: any;
}
