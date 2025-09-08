import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import {
  Between,
  Equal,
  FindOperator,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Or,
} from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Nullable } from '../../domain/types/nullable';
import { ICriteria } from '../../domain/interfaces/repository/criteria.interface';
import { ESortOrder } from '../../domain/enums/sort-order.enum';

export class CriteriaTypeOrmBuilder<TypeOrmModel = any> {
  criteria: ICriteria;

  constructor(criteria: ICriteria) {
    this.criteria = criteria;
  }

  getWhere(): FindOptionsWhere<TypeOrmModel>[] {
    const { filters = {}, search = {} } = this.criteria;

    const arrayFilters: FindOptionsWhere<TypeOrmModel> = {};
    const dateFilters: FindOptionsWhere<TypeOrmModel> = {};
    const booleanFilters: FindOptionsWhere<TypeOrmModel> = {};
    const minMaxFilters: FindOptionsWhere<TypeOrmModel> = {};

    const minSuffix = 'Min';
    const maxSuffix = 'Max';
    const minMaxStructure: Record<
      string,
      { min: Nullable<number>; max: Nullable<number> }
    > = {};

    Object.keys(filters)
      .filter((field) => field.endsWith(minSuffix) || field.endsWith(maxSuffix))
      .forEach((field) => {
        const filter = filters[field];
        const fieldWithoutSuffix = field
          .replace(minSuffix, '')
          .replace(maxSuffix, '');

        if (!minMaxStructure[fieldWithoutSuffix]) {
          minMaxStructure[fieldWithoutSuffix] = { min: null, max: null };
        }

        if (field.endsWith(minSuffix)) {
          minMaxStructure[fieldWithoutSuffix].min = filter;
        } else if (field.endsWith(maxSuffix)) {
          minMaxStructure[fieldWithoutSuffix].max = filter;
        }
      });

    Object.entries(minMaxStructure).map(([field, { min, max }]) => {
      if ((min || min === 0) && (max || max === 0)) {
        minMaxFilters[field] = Between(min, max);
      } else {
        (min || min === 0) && (minMaxFilters[field] = MoreThanOrEqual(min));
        (max || max === 0) && (minMaxFilters[field] = LessThanOrEqual(max));
      }
    });

    Object.keys(filters).forEach((field) => {
      const filterByField = filters[field];

      if (Array.isArray(filterByField)) {
        arrayFilters[field] =
          filterByField.length > 1
            ? In(filterByField)
            : filterByField[0] instanceof FindOperator
              ? filterByField[0]
              : Equal(filterByField[0]);
      } else if (
        filterByField?.from instanceof Date ||
        filterByField?.to instanceof Date
      ) {
        const { from, to } = filterByField;

        if (from && to) {
          dateFilters[field] = Between(from, to);
        } else {
          from && (dateFilters[field] = MoreThanOrEqual(from));
          to && (dateFilters[field] = LessThanOrEqual(to));
        }
      } else if (typeof filterByField === 'boolean') {
        booleanFilters[field] = Equal(filterByField);
      }
    });

    const filtersWithoutSearch = {
      ...arrayFilters,
      ...dateFilters,
      ...booleanFilters,
      ...minMaxFilters,
    };

    const allFilters: FindOptionsWhere<TypeOrmModel>[] = [];

    if (search?.fields?.length && search?.query) {
      search.fields.forEach((field) => {
        const searchFilter = { ...filtersWithoutSearch };

        field = field.replace(/([-_]\w)/g, (group) => group[1].toUpperCase());

        if (searchFilter?.[field]) {
          searchFilter[field] = Or(
            searchFilter[field],
            ILike(`%${search.query}%`),
          );
        } else {
          searchFilter[field] = ILike(`%${search.query}%`);
        }

        allFilters.push(searchFilter);
      });
    } else {
      allFilters.push(filtersWithoutSearch);
    }

    return allFilters;
  }

  getSortOrder(): FindOptionsOrder<TypeOrmModel> {
    const orderCriteria = this.criteria.order;

    const order: FindOptionsOrder<TypeOrmModel> & { createdAt?: string } = {};

    const sortOrder = orderCriteria?.sortOrder || ESortOrder.DESC;

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

  getPaginationProps(): { skip?: number; take?: number } {
    const { offset: skip, limit: take } = this.criteria.pagination ?? {};

    return { skip, take };
  }
}
