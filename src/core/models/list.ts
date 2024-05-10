export type List<T> = {
  current_page: number;
  total: number; 
  per_page: number; 
  data: T
}
