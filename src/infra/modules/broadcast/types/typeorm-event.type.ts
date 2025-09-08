import { InsertEvent, RemoveEvent, SoftRemoveEvent } from 'typeorm';
import { UpdateEvent } from 'typeorm/subscriber/event/UpdateEvent';
import { BaseTypeOrmEntity } from '../../../base/base-type-orm.entity';

export type TTypeormEvent =
  | InsertEvent<BaseTypeOrmEntity>
  | RemoveEvent<BaseTypeOrmEntity>
  | SoftRemoveEvent<BaseTypeOrmEntity>
  | UpdateEvent<BaseTypeOrmEntity>;
