import { Post } from './Post';
/**
 * @param content Posztok
 * @param pageNumber Oldalszám
 * @param pageSize Oldal tartalom száma
 * @param totalElements Összes oldalon található tartalom száma
 */
export interface Feed {
  content: Post[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}
