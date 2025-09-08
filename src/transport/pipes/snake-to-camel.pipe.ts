import { PipeTransform, Injectable } from '@nestjs/common';
import { snakeToCamel } from '../../application/utils/snake-to-camel';

/**
 * Is used to transform snake_case to camelCase
 */
@Injectable()
export class SnakeToCamelPipe implements PipeTransform {
  transform(value: Record<string, any>): Record<string, any> {
    return snakeToCamel(value);
  }
}
