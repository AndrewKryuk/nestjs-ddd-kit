import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

/**
 * Typeorm configuration
 */
export abstract class TypeormConfigAbstract {
  options: TypeOrmModuleOptions;
}
