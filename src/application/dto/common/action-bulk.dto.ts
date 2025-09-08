import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class ActionBulkDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  ids: string[];
}
