import { FilterQuery, HydratedDocument, Model } from 'mongoose';
import { Type } from '@nestjs/common';
import { CriteriaMongooseBuilder } from '../builders/criteria-mongoose.builder';
import { Log } from '../../application/decorators/log.decorator';
import { ICriteria } from '../../domain/interfaces/repository/criteria.interface';
import { IPaginatedResult } from '../../domain/interfaces/repository/paginated-result.interface';
import { IPaginationReply } from '../../domain/interfaces/repository/pagination-reply.interface';
import { Nullable } from '../../domain/types/nullable';
import { BaseRepositoryAbstract } from '../../domain/abstract/repositories/base-repository.abstract';

export class BaseMongooseRepository<
  MongooseModel extends { _id?: string },
  DomainModel extends { unmarshal(): { id?: string }; id?: string },
> implements Partial<BaseRepositoryAbstract<DomainModel>>
{
  constructor(
    private model: Model<HydratedDocument<MongooseModel>>,
    private entityClass: Type<MongooseModel> & {
      fromDomain: (domainModel: DomainModel) => MongooseModel;
      toDomain: (
        mongooseEntity: Partial<HydratedDocument<MongooseModel>>,
      ) => DomainModel;
    },
  ) {}

  @Log({ level: 'debug' })
  async create(domainEntity: DomainModel): Promise<DomainModel> {
    const createdMongooseEntity = (await new this.model(
      this.entityClass.fromDomain(domainEntity),
    ).save()) as HydratedDocument<MongooseModel>;

    return this.entityClass.toDomain(createdMongooseEntity);
  }

  @Log({ level: 'debug' })
  async updateOne(domainEntity: DomainModel): Promise<DomainModel> {
    const mongooseEntity = this.entityClass.fromDomain(domainEntity);

    const updatedMongooseEntity = (await this.model.findOneAndUpdate(
      { _id: mongooseEntity._id },
      mongooseEntity,
      {
        new: true,
      },
    )) as HydratedDocument<MongooseModel>;

    return this.entityClass.toDomain(updatedMongooseEntity);
  }

  @Log({ level: 'debug' })
  async search(criteria: ICriteria): Promise<IPaginatedResult<DomainModel>> {
    const criteriaMongooseBuilder = new CriteriaMongooseBuilder<
      HydratedDocument<MongooseModel>
    >(criteria);

    const queryObject = criteriaMongooseBuilder.getQueryObject();

    const result = await this.model
      .find({
        ...queryObject,
        ...(!!criteria?.withDeleted ? {} : { deletedAt: null }),
      })
      .limit(criteriaMongooseBuilder.limit ?? 0)
      .skip(criteriaMongooseBuilder.offset ?? 0)
      .sort(criteriaMongooseBuilder.getSortOrder())
      .lean()
      .exec();

    const total = await this.model
      .countDocuments({
        ...queryObject,
        ...(!!criteria?.withDeleted ? {} : { deletedAt: null }),
      })
      .exec();

    const pagination: IPaginationReply = {
      total,
      offset: criteriaMongooseBuilder.offset ?? 0,
      limit: criteriaMongooseBuilder.limit ?? 0,
    };

    return {
      result: result.map((item) =>
        this.entityClass.toDomain(
          item as Partial<HydratedDocument<MongooseModel>>,
        ),
      ),
      pagination,
    };
  }

  @Log({ level: 'debug' })
  async findMany(
    queryObject?: FilterQuery<HydratedDocument<MongooseModel>>,
    options?: { limit: number; offset: number },
  ): Promise<DomainModel[]> {
    const foundMongooseEntities = await this.model
      .find({
        ...queryObject,
      })
      .limit(options?.limit ?? 0)
      .skip(options?.offset ?? 0)
      .lean()
      .exec();

    return foundMongooseEntities.map((foundMongooseEntity) =>
      this.entityClass.toDomain(
        foundMongooseEntity as Partial<HydratedDocument<MongooseModel>>,
      ),
    );
  }

  @Log({ level: 'debug' })
  async findOneById(id: string): Promise<Nullable<DomainModel>> {
    const foundMongooseEntity = (await this.model
      .findById(id)
      .lean()) as HydratedDocument<MongooseModel>;

    return this.entityClass.toDomain(foundMongooseEntity);
  }

  @Log({ level: 'debug' })
  async exists(id: string): Promise<boolean> {
    const exists = await this.model.exists({ _id: id });

    return !!exists;
  }

  @Log({ level: 'debug' })
  async delete(id: string): Promise<Partial<DomainModel>> {
    await this.model.deleteOne({ _id: id });

    return { id } as Partial<DomainModel>;
  }

  @Log({ level: 'debug' })
  async saveMany(domainEntities: DomainModel[]): Promise<{ count: number }> {
    const result = await this.model.bulkWrite(
      domainEntities.map((domainEntity) => {
        const mongooseEntity = this.entityClass.fromDomain(domainEntity);

        return {
          updateOne: {
            filter: { _id: mongooseEntity._id },
            update: { $set: mongooseEntity },
            upsert: true,
          },
        };
      }),
    );

    return { count: result.modifiedCount + result.upsertedCount };
  }

  @Log({ level: 'debug' })
  async deleteMany(ids: string[]): Promise<{ count: number }> {
    const result = await this.model.bulkWrite(
      ids.map((_id) => ({
        deleteOne: {
          filter: { _id },
        },
      })),
    );

    return { count: result.deletedCount };
  }
}
