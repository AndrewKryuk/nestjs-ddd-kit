import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { ITypeOrmEntity } from '../../domain/interfaces/entity/type-orm-entity.interface';

export abstract class BaseTypeOrmEntity
  extends BaseEntity
  implements ITypeOrmEntity
{
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt!: Date;

  toJSON(): Record<string, any> {
    return instanceToPlain(this, { exposeUnsetFields: false });
  }

  abstract toDomain(): any;
}
