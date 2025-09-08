import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { mixin } from '@nestjs/common';
import { Type } from 'class-transformer';

export const ResultReply = <TResult extends new (...args: any[]) => any>(
  Base: TResult,
  options?: ApiPropertyOptions,
) => {
  class ResultReply {
    @ApiProperty({
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested()
    result?: InstanceType<TResult>;
  }

  return mixin(ResultReply);
};
