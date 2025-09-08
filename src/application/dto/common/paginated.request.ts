import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ESortOrder } from '../../../domain/enums/sort-order.enum';
import { StringToNumber } from '../../validation/transformers/string-to-number';

export class PaginatedRequest {
  @IsOptional()
  @IsNumber()
  @StringToNumber()
  @Min(0)
  @ApiProperty({
    description: 'Смещение на количество элементов',
    required: false,
  })
  offset?: number;

  @IsOptional()
  @IsNumber()
  @StringToNumber()
  @Min(1)
  @ApiProperty({
    description: 'Ограничить выдачу по количеству',
    required: false,
  })
  limit?: number;

  @IsOptional()
  @IsEnum(ESortOrder)
  @ApiProperty({ enum: ESortOrder, description: 'Сортировка', required: false })
  sortOrder?: ESortOrder;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Сортировать по полю', required: false })
  orderBy?: string;
}
