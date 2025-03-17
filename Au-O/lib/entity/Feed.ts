/**
 * Feed entitások
 * @category Entity
 * @module entity/Feed
 */

import { Post } from './Post';
/**
 * A feed tartalma
 * @interface
 */
export interface Feed {
  /**
   * A feed tartalma
   * @type {Post[]}
   * @see Post
   */
  content: Post[];
  /**
   * Az oldalszám
   * @type {number}
   */
  pageNumber: number;
  /**
   * Az oldal tartalom száma
   * @type {number}
   */
  pageSize: number;
  /**
   * Az összes oldalon található tartalom száma
   * @type {number}
   */
  totalElements: number;
}
