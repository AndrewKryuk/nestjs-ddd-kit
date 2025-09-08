import { ApiProperty } from '@nestjs/swagger';
import { IPaginationReply } from '../../../domain/interfaces/repository/pagination-reply.interface';

export class PaginationReply implements IPaginationReply {
  @ApiProperty({ description: 'Общее количество', example: 1000 })
  total?: number;

  @ApiProperty({ description: 'Смещение на количество элементов', example: 0 })
  offset?: number;

  @ApiProperty({ description: 'Ограничить выдачу по количеству', example: 20 })
  limit?: number;
}
