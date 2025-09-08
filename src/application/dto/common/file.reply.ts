import { ApiProperty } from '@nestjs/swagger';

export class FileReply {
  @ApiProperty({ description: 'Id файла (UUID)' })
  id?: string;

  @ApiProperty({ description: 'Ссылка на файл' })
  url?: string;
}
