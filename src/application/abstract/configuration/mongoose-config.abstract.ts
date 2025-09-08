import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

/**
 * Mongoose configuration
 */
export abstract class MongooseConfigAbstract {
  options: MongooseModuleFactoryOptions;
}
