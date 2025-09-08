import { FilterQuery, SortOrder } from 'mongoose';
import { ICriteria } from '../../domain/interfaces/repository/criteria.interface';
import { Nullable } from '../../domain/types/nullable';

export class CriteriaMongooseBuilder<T = any> {
  criteria: ICriteria;

  constructor(criteria: ICriteria) {
    this.criteria = criteria;
  }

  getQueryObject(): FilterQuery<T> {
    const { filters = {}, search = {} } = this.criteria;

    const arrayFilters = {};
    const dateFilters = {};
    const booleanFilters = {};

    Object.keys(filters).forEach((field) => {
      const filterByField = filters[field];

      if (Array.isArray(filterByField)) {
        arrayFilters[field] =
          filterByField.length > 1 ? { $in: filterByField } : filterByField[0];
      } else if (
        filterByField?.from instanceof Date ||
        filterByField?.to instanceof Date
      ) {
        const { from, to } = filterByField;

        dateFilters[field] = {
          $gte: from,
          $lte: to,
        };
      } else if (typeof filterByField === 'boolean') {
        booleanFilters[field] = { $eq: filterByField };
      }
    });

    const allFilters = {
      ...arrayFilters,
      ...dateFilters,
      ...booleanFilters,
    };

    if (search?.fields?.length && search?.query) {
      search.fields.forEach((field) => {
        field = field.replace(/([-_]\w)/g, (group) => group[1].toUpperCase());

        if (allFilters?.[field]) {
          const fieldFilters = allFilters[field]?.$in
            ? allFilters[field].$in
            : [allFilters[field]];
          allFilters[field] = {
            $in: [...fieldFilters, new RegExp(search.query ?? '')],
          };
        } else {
          allFilters[field] = new RegExp(search.query ?? '');
        }
      });
    }

    return allFilters;
  }

  getSortOrder(): { [key: string]: SortOrder } {
    const orderCriteria = this.criteria.order;

    const order: Record<string, SortOrder> = {};

    const sortOrder = orderCriteria?.sortOrder === 'ASC' ? 'asc' : 'desc';

    if (orderCriteria?.orderBy) {
      order[
        orderCriteria.orderBy.replace(/([-_]\w)/g, (group) =>
          group[1].toUpperCase(),
        )
      ] = sortOrder;
      return order;
    }

    order.createdAt = sortOrder;
    return order;
  }

  get limit(): Nullable<number> {
    return this.criteria.pagination?.limit ?? null;
  }

  get offset(): Nullable<number> {
    return this.criteria.pagination?.offset ?? null;
  }
}
