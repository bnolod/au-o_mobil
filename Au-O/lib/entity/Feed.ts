import { Post } from './Post';

export interface Feed {
  content: Post[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}
