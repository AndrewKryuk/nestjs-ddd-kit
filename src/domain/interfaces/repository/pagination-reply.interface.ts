export interface IPaginationReply {
  /**
   * Total number of rows
   */
  total?: number;
  /**
   * Offset of the first item returned from a query
   */
  offset?: number;
  /**
   * Number of rows returned from a query
   */
  limit?: number;
}
