import { PipeTransform, Injectable } from '@nestjs/common';
import { IHttpPaginatedRequest } from '../interfaces/pipes/http-paginated-request.interface';
import { IGrpcPaginatedRequest } from '../interfaces/pipes/grpc-paginated-request.interface';

/**
 * Is used to transform http paginated request to grpc paginated request
 */
@Injectable()
export class TransformPaginatedRequestPipe implements PipeTransform {
  transform(
    httpPaginatedRequest: IHttpPaginatedRequest,
  ): IGrpcPaginatedRequest {
    const {
      offset,
      limit,
      sortOrder,
      orderBy,
      searchQuery,
      searchField,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
      ...dto
    } = httpPaginatedRequest;

    return {
      ...dto,
      pagination: { offset, limit },
      order: { sortOrder, orderBy },
      search: { query: searchQuery, fields: searchField },
      createdAt: { from: createdFrom, to: createdTo },
      updatedAt: { from: updatedFrom, to: updatedTo },
    };
  }
}
