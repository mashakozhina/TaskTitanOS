export interface Pagination {
  current_page: number;
  total_count: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
  count: number;
  per_page: number;
}

export interface CollectionResponse<T> {
  collection: T[];
  pagination: Pagination;
}
