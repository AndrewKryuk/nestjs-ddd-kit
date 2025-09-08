export interface ITypeOrmEntity<DomainModel = {}> {
  id?: string;
  toJSON: () => Record<string, any>;
  toDomain: () => DomainModel;
}
