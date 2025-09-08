import { ESortOrder } from '../../enums/sort-order.enum';

export interface IOrder {
  /**
   * Sort order (ASC | DESC)
   */
  sortOrder?: ESortOrder;
  /**
   * Order by field
   */
  orderBy?: string;
}
