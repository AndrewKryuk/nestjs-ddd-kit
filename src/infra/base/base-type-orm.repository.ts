import { FindOptionsWhere, Repository } from 'typeorm';
import { CriteriaTypeOrmBuilder } from '../builders/criteria-type-orm.builder';
import { ITypeOrmEntity } from '../../domain/interfaces/entity/type-orm-entity.interface';
import { Log } from '../../application/decorators/log.decorator';
import { ICriteria } from '../../domain/interfaces/repository/criteria.interface';
import { IPaginatedResult } from '../../domain/interfaces/repository/paginated-result.interface';
import { IPaginationReply } from '../../domain/interfaces/repository/pagination-reply.interface';
import { IFindOneOptions } from '../../domain/interfaces/find-one-options.interface';
import { Nullable } from '../../domain/types/nullable';
import { BaseRepositoryAbstract } from '../../domain/abstract/repositories/base-repository.abstract';

export class BaseTypeOrmRepository<
  TypeOrmModel extends ITypeOrmEntity<DomainModel>,
  DomainModel extends { unmarshal(): { id?: string } },
> implements BaseRepositoryAbstract<DomainModel>
{
  private repository: Repository<TypeOrmModel>;

  protected constructor(repository: Repository<TypeOrmModel>) {
    this.repository = repository;
  }

  protected get entityClass(): TypeOrmModel & {
    fromDomain: (domainModel: DomainModel) => TypeOrmModel;
  } {
    return this.repository.metadata.target as any;
  }

  @Log({ level: 'debug' })
  async save(domainEntity: DomainModel): Promise<DomainModel> {
    const typeOrmEntity = await this.repository.save(
      this.entityClass.fromDomain(domainEntity),
    );
    const typeOrmEntityWithAllFields = (await this.repository.findOne({
      where: { id: typeOrmEntity.id } as FindOptionsWhere<TypeOrmModel>,
      withDeleted: true,
    })) as TypeOrmModel;
    return typeOrmEntityWithAllFields.toDomain();
  }

  @Log({ level: 'debug' })
  async bulkSave(domainEntities: DomainModel[]): Promise<DomainModel[]> {
    let createdEntities: TypeOrmModel[] = [];

    if (domainEntities.length) {
      createdEntities = await this.repository.save(
        domainEntities.map((domainEntity) =>
          this.entityClass.fromDomain(domainEntity),
        ),
      );
    }
    return createdEntities.map((createdEntity) => createdEntity.toDomain());
  }

  public async search(
    criteria: ICriteria,
  ): Promise<IPaginatedResult<DomainModel>> {
    const criteriaTypeOrmBuilder = new CriteriaTypeOrmBuilder<TypeOrmModel>(
      criteria,
    );

    const where = criteriaTypeOrmBuilder.getWhere();

    const order = criteriaTypeOrmBuilder.getSortOrder();
    const { skip, take } = criteriaTypeOrmBuilder.getPaginationProps();

    const [result, total] = await this.repository.findAndCount({
      where,
      order,
      skip,
      take,
      withDeleted: !!criteria?.withDeleted,
    });

    const pagination: IPaginationReply = {
      total,
      offset: skip,
      limit: take,
    };

    return {
      result: result.map((item) => item.toDomain()),
      pagination,
    };
  }

  @Log({ level: 'debug' })
  async findOneById(
    id: string,
    options: IFindOneOptions = {},
  ): Promise<Nullable<DomainModel>> {
    const { withDeleted = false } = options;

    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<TypeOrmModel>,
      withDeleted,
    });

    return entity?.toDomain() ?? null;
  }

  @Log({ level: 'debug' })
  exists(id: string): Promise<boolean> {
    return this.repository.exists({
      where: { id } as FindOptionsWhere<TypeOrmModel>,
    });
  }

  @Log({ level: 'debug' })
  conflictExists(id: string): Promise<boolean> {
    return this.repository.exists({
      where: { id } as FindOptionsWhere<TypeOrmModel>,
      withDeleted: true,
    });
  }

  @Log({ level: 'debug' })
  async softDelete(id: string): Promise<Partial<DomainModel>> {
    const entity = await this.repository.findOneOrFail({
      where: { id } as FindOptionsWhere<TypeOrmModel>,
    });

    await this.repository.softRemove(entity);

    entity.id = id;

    return entity.toDomain();
  }

  @Log({ level: 'debug' })
  async delete(id: string): Promise<Partial<DomainModel>> {
    const entity = await this.repository.findOneOrFail({
      where: { id } as FindOptionsWhere<TypeOrmModel>,
    });

    await this.repository.remove(entity);

    entity.id = id;

    return entity.toDomain();
  }
}
