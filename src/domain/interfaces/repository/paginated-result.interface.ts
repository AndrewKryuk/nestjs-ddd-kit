import { IPaginationReply } from './pagination-reply.interface';

export interface IPaginatedResult<T> {
  result: T[];
  pagination: IPaginationReply;
}
