import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { mixin } from '@nestjs/common';
import { Type } from 'class-transformer';
import { PaginationReply } from './pagination.reply';

export const PaginatedResultReply = <
  TResult extends new (...args: any[]) => any,
>(
  Base: TResult,
  options?: ApiPropertyOptions,
) => {
  class PaginatedResultReply {
    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    result?: Array<InstanceType<TResult>>;

    @ApiProperty({ description: 'Данные пагинации', type: PaginationReply })
    pagination?: PaginationReply;
  }

  return mixin(PaginatedResultReply);
};
