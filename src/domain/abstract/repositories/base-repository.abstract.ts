import { ICriteria } from '../../interfaces/repository/criteria.interface';
import { IPaginatedResult } from '../../interfaces/repository/paginated-result.interface';
import { Nullable } from '../../types/nullable';

export abstract class BaseRepositoryAbstract<
  DomainModel extends { unmarshal(): { id?: string } },
> {
  abstract save(domainEntity: DomainModel): Promise<DomainModel>;

  abstract bulkSave(domainEntities: DomainModel[]): Promise<DomainModel[]>;

  abstract search(criteria: ICriteria): Promise<IPaginatedResult<DomainModel>>;

  abstract findOneById(id: string): Promise<Nullable<DomainModel>>;

  abstract exists(id: string): Promise<boolean>;

  abstract conflictExists(id: string): Promise<boolean>;

  abstract softDelete(id: string): Promise<Partial<DomainModel>>;

  abstract delete(id: string): Promise<Partial<DomainModel>>;

  abstract bulkDelete(
    domainEntities: DomainModel[],
  ): Promise<{ deletedCount: number }>;
}
